"""Throwaway UI preview. Run: npm run prototype. No dependencies."""
import os
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlparse

if os.environ.get("NODE_ENV") == "production":
    raise SystemExit("This throwaway prototype is not a production site.")

os.chdir(Path(__file__).resolve().parent)

class Preview(SimpleHTTPRequestHandler):
    def log_message(self, format, *args):
        pass

    def do_GET(self):
        path = urlparse(self.path).path
        if path == "/" or path == "/prototype" or path.rstrip("/") in (
            "/pl", "/en", "/pl/blog", "/en/blog",
            "/pl/blog/mniej-ale-lepiej", "/en/blog/less-but-better",
            "/pl/blog/bardziej-ludzki-internet", "/en/blog/a-more-human-internet",
            "/pl/blog/montaz-i-interfejsy", "/en/blog/editing-and-interfaces"
        ):
            self.path = "/index.html"
        super().do_GET()

print("Prototypy UI: http://localhost:4321/pl/?variant=A", flush=True)
ThreadingHTTPServer(("127.0.0.1", 4321), Preview).serve_forever()
