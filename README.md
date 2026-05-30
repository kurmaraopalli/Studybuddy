Study Guide — Grades 1–10

A mobile-friendly, gender-neutral study guide web app that fetches short summaries from public sources (Wikipedia) to provide quick, curriculum-aligned overviews per grade.

Files created:
- index.html
- styles.css
- script.js

How to run:
1. Serve the folder with a static file server (recommended) so browser `fetch` calls to Wikipedia work correctly.

Example (Python 3):

```bash
cd "c:/Users/kurma/OneDrive/Documents/Workspace/STATIC STUDY GUIDE"
python -m http.server 8000
```

Then open `http://localhost:8000` in your browser.

Notes and limitations:
- Content is pulled from Wikipedia's REST summary endpoint; results depend on available pages and may vary. If a page isn't available, a friendly fallback summary is shown.
- For production use, consider a curated backend or caching to avoid CORS/rate limits and to adapt content to local curricula.

Would you like me to:
- Add more subjects per grade?
- Improve visuals (icons, illustrations)?
- Bundle into a single-file app or PWA for offline use?