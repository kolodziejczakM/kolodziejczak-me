/** Copy on the click gesture, including HTTP previews without Clipboard API. */
export async function copyField(
  field: HTMLInputElement | HTMLTextAreaElement,
): Promise<void> {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(field.value);
      return;
    } catch {
      // An older copy command may still work when the async API is denied.
    }
  }

  const active = document.activeElement;
  const start = field.selectionStart;
  const end = field.selectionEnd;
  try {
    field.focus({ preventScroll: true });
    field.select();
    // Explicit selection is needed by some mobile browsers for readonly fields.
    if (start !== null) field.setSelectionRange(0, field.value.length);
    if (!document.execCommand("copy"))
      throw new Error("Clipboard write was refused");
  } finally {
    if (start !== null && end !== null) field.setSelectionRange(start, end);
    if (active instanceof HTMLElement) active.focus({ preventScroll: true });
  }
}
