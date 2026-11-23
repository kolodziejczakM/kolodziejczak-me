#!/usr/bin/env bash
set -euo pipefail

cd "$(git rev-parse --show-toplevel)"
scan_directory=$(mktemp -d)
trap 'rm -rf "$scan_directory"' EXIT

scanner=${GITLEAKS_BIN:-}
if [[ -z "$scanner" ]]; then
  case "$(uname -sm)" in
    'Linux x86_64')
      scanner_archive=gitleaks_8.30.1_linux_x64.tar.gz
      scanner_checksum=551f6fc83ea457d62a0d98237cbad105af8d557003051f41f3e7ca7b3f2470eb
      ;;
    'Linux aarch64')
      scanner_archive=gitleaks_8.30.1_linux_arm64.tar.gz
      scanner_checksum=e4a487ee7ccd7d3a7f7ec08657610aa3606637dab924210b3aee62570fb4b080
      ;;
    *) echo 'Set GITLEAKS_BIN to a trusted local gitleaks executable on this platform.' >&2; exit 1 ;;
  esac
  curl --fail --location --retry 3 --silent --show-error \
    "https://github.com/gitleaks/gitleaks/releases/download/v8.30.1/$scanner_archive" \
    --output "$scan_directory/$scanner_archive"
  printf '%s  %s\n' "$scanner_checksum" "$scan_directory/$scanner_archive" | sha256sum --check
  tar -xzf "$scan_directory/$scanner_archive" -C "$scan_directory" gitleaks
  scanner="$scan_directory/gitleaks"
fi

# Full history includes deleted files. Findings are always redacted in logs.
"$scanner" git . --log-opts='--all --full-history' --redact=100 --no-banner

# Check candidate source files too, without scanning generated output or dependencies.
mkdir "$scan_directory/worktree"
git ls-files --cached --others --exclude-standard -z \
  | while IFS= read -r -d '' candidate_file; do
      if [[ -e "$candidate_file" || -L "$candidate_file" ]]; then printf '%s\0' "$candidate_file"; fi
    done \
  | tar --null -T - -cf - \
  | tar -xf - -C "$scan_directory/worktree"
"$scanner" dir "$scan_directory/worktree" --redact=100 --no-banner
