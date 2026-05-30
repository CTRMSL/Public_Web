# VIGILO by CTR — ctrmsl.com

This repository is the source of **https://ctrmsl.com** (served via GitHub Pages with a Cloudflare-managed custom domain).

## Live URLs

- **Production:** https://ctrmsl.com/ (once DNS is wired — see Setup below)
- **GitHub Pages mirror:** https://ctrmsl.github.io/Public_Web/
- **Legacy path** (kept for back-compat with already-shared review URLs): https://ctrmsl.github.io/Public_Web/v/a/ and https://ctrmsl.com/v/a/

## Structure

```
/
  CNAME                 ← "ctrmsl.com" — tells GitHub Pages this is the custom domain
  index.html            ← VIGILO landing page
  about/                ← About page
  privacy/              ← Privacy Policy
  terms/                ← Terms of Use
  404.html              ← Branded 404
  assets/               ← Images, fonts, demo video
  vigilo-professional-demo.mp4
  sitemap.xml
  robots.txt
  _headers              ← Security headers + asset caching (Cloudflare Pages / Netlify format)
  _redirects            ← Legacy-path redirects (Cloudflare Pages / Netlify format)
  .well-known/
    security.txt
  v/a/                  ← Legacy duplicate of the site at this path — kept for back-compat
  previews/             ← Thumbnails (legacy picker artwork)
```

## Setup (one-time, required to activate ctrmsl.com)

After this commit lands, two manual steps remain to switch ctrmsl.com over to GitHub Pages:

### Step 2 — GitHub (30 seconds)

1. Go to https://github.com/CTRMSL/Public_Web/settings/pages
2. **Custom domain**: enter `ctrmsl.com` → **Save**
3. Wait 5–15 min for the SSL certificate to provision
4. Tick **Enforce HTTPS** once it's available

### Step 3 — Cloudflare DNS (1 minute)

In Cloudflare → ctrmsl.com → DNS:

1. **Delete** the current `A` records for `@` pointing to the previous origin
2. **Add four A records for `@`** pointing to GitHub Pages:
   - `185.199.108.153`
   - `185.199.109.153`
   - `185.199.110.153`
   - `185.199.111.153`
3. Optional: add `AAAA` records for IPv6:
   - `2606:50c0:8000::153`
   - `2606:50c0:8001::153`
   - `2606:50c0:8002::153`
   - `2606:50c0:8003::153`
4. Proxy status: orange cloud (Proxied) recommended for Cloudflare's caching + DDoS protection

### Step 4 — Cloudflare SSL (30 sec)

SSL/TLS → Overview → set mode to **Full (strict)** (matches GitHub Pages TLS).

### Step 5 — Verify (~5 min after DNS change)

```bash
curl -I https://ctrmsl.com/
# Expect HTTP 200 + content from the new build
```

Future deploys are just `git push` to `main` of this repo. GitHub Pages rebuilds and Cloudflare CDN refreshes automatically.

## Editing the site

Edit files in this repo's working copy on your machine, commit, and push. See `Editing_on_Windows.md` in the private `CTRMSL/CTR_Web` repo for Windows step-by-step instructions.
