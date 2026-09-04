# OBS Admin (CMS)

The public site stays static HTML. This module is a small authenticated API:

- `GET /cms/content.json` — public text overrides (no secrets)
- `POST /api/cms/setup` — first password (requires the administrator email)
- `POST /api/cms/login` — sets an httpOnly cookie
- `POST /api/cms/reset` — new password if the administrator email matches
- `PUT /api/cms/content` — save texts; also writes `public/cms/content.json` so the live site updates without a rebuild
- `POST /api/cms/files` — images/PDF into `public/uploads/`
- `GET|PUT /api/cms/integrations` — T-Kassa, forms, Pulse (file store, gitignored)
- `GET|PUT /api/cms/ai-assistant` — local `data/chat/store.json` when `DATABASE_URL` is empty; otherwise PostgreSQL `integrations` row `ai_assistant`
- `GET /api/cms/dialogs` — chat sessions for quality review

Password is created on `/ru/admin/login`. Recovery uses the administrator email. Hash lives in `data/cms/admin.json` (gitignored). Optional: `ADMIN_SECRET` for signing the session cookie, `ADMIN_EMAIL` to override the recovery address.

On Netlify the filesystem is read-only at runtime — save from the admin there will fail. Run admin locally (`npm run dev`) or on Timeweb (`npm start`, which now serves the API next to `dist/`).
