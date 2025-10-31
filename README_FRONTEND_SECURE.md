# Frontend_Secure (cleaned)

Framework detected: static

What I changed:
- Replaced hardcoded backend URLs (like http://localhost:5000) with environment-variable-friendly code.
  - For Create React App / Next: replaced with template literals that use `process.env.REACT_APP_API_URL`.
  - For Vite: replaced with template literals that use `import.meta.env.VITE_API_URL`.
  - For static sites: added `config.js` and replaced URLs with `API_URL` usage.
- Added `.env.template` showing which environment variable to set during local development or on Vercel.
- Added `.gitignore` to ignore node_modules and env files.

Files modified or added:
[
  "Frontend/dist/assets/index-CCe97b1-.js",
  "Frontend/src/AdminDashboard.jsx",
  "Frontend/src/AdminLogin.jsx",
  "Frontend/src/Form.jsx",
  "Frontend/src/TeacherLogin.jsx",
  "config.js",
  "set_api_url.js",
  ".env.template",
  ".gitignore"
]

How to use:
1. If using CRA/Next: set `REACT_APP_API_URL` in Vercel's Environment Variables (Project → Settings → Environment Variables) to your backend URL, then redeploy.
2. If using Vite: set `VITE_API_URL` similarly and redeploy.
3. If static: replace `REPLACE_WITH_BACKEND_URL` in `config.js` or set during your build step on Vercel.
