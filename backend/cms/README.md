# OBS Admin (CMS)

The public site stays static HTML. This module is a small authenticated API:

- `GET /cms/content.json` — public text overrides (no secrets)
- `POST /api/cms/login` — sets an httpOnly cookie
- `PUT /api/cms/content` — save texts; also writes `public/cms/content.json` so the live site updates without a rebuild
- `POST /api/cms/files` — images/PDF into `public/uploads/`
- `GET|PUT /api/cms/integrations` — T-Kassa, forms, Pulse (file store, gitignored)
- `GET|PUT /api/cms/ai-assistant` — PostgreSQL `integrations` row `ai_assistant`
- `GET /api/cms/dialogs` — chat sessions for quality review

Set `ADMIN_PASSWORD` on the server. Optional: `ADMIN_SECRET` for signing the session cookie.

On Netlify the filesystem is read-only at runtime — save from the admin there will fail. Run admin locally (`npm run dev`) or on Timeweb (`npm start`, which now serves the API next to `dist/`).
