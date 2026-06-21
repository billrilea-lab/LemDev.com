# lemdev.com on GitHub Pages + GoDaddy DNS

**Cost:** GoDaddy domain only (~$15–20/year). Hosting is **free** on GitHub Pages.

---

## Part 1 — GitHub (one time)

### 1. Create the repo

1. Open **https://github.com/new**
2. Owner: **billrilea-lab**
3. Repository name: **`lemdev.com`**
4. **Public**
5. Do **not** add README (we push files from your Mac)
6. Click **Create repository**

### 2. Push the site (Terminal on Mac Mini)

```bash
cd "/Users/williamrilea/Cursor- Crypto/lemdev-site"
git init
git add index.html css/ js/ robots.txt sitemap.xml CNAME
git commit -m "LEMdev landing page for GitHub Pages"
git branch -M main
git remote add origin git@github.com:billrilea-lab/lemdev.com.git
git push -u origin main
```

### 3. Turn on GitHub Pages

1. Open **https://github.com/billrilea-lab/lemdev.com/settings/pages**
2. **Source:** Deploy from branch
3. **Branch:** `main` → **`/ (root)`** → Save
4. **Custom domain:** type **`lemdev.com`** → Save
5. Wait 1–5 minutes. Enable **Enforce HTTPS** when the checkbox appears.

Your site will work at `https://billrilea-lab.github.io/lemdev.com/` first, then `https://lemdev.com` after DNS.

---

## Part 2 — GoDaddy DNS (one time)

1. Log in → **My Products** → **lemdev.com** → **DNS** (or **Manage DNS**)
2. **Delete** parking records (e.g. "Parked" A record or forwarding)
3. Add these records:

### Apex `@` (lemdev.com)

| Type | Name | Value | TTL |
|------|------|-------|-----|
| A | @ | `185.199.108.153` | 600 |
| A | @ | `185.199.109.153` | 600 |
| A | @ | `185.199.110.153` | 600 |
| A | @ | `185.199.111.153` | 600 |

(GitHub’s official Pages IPs — all four required.)

### www (optional but recommended)

| Type | Name | Value | TTL |
|------|------|-------|-----|
| CNAME | www | `billrilea-lab.github.io` | 600 |

4. Save. DNS can take **15 minutes to 48 hours** (often under 1 hour).

---

## Part 3 — Verify

```bash
# After DNS propagates:
curl -I https://lemdev.com
```

Or open **https://lemdev.com** in Chrome — you should see the LEMdesk landing page.

In GitHub → repo → **Settings → Pages**, you should see:  
**“Your site is live at https://lemdev.com”**

---

## Updating the site later

Edit files in `lemdev-site/`, then:

```bash
cd "/Users/williamrilea/Cursor- Crypto/lemdev-site"
git add -A
git commit -m "Update landing page"
git push
```

GitHub redeploys in ~1 minute. No GoDaddy upload needed.

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| GoDaddy parking page still shows | Remove parking; wait for DNS |
| GitHub “DNS check unsuccessful” | Confirm 4 A records; wait longer |
| HTTPS not available | Custom domain must verify first; then Enforce HTTPS |
| www works but apex doesn’t | Add all 4 A records for `@` |

---

## What stays private

- **Do not** put `.env`, API keys, or the crypto bot in this repo.
- This repo is **only** the public marketing site (`index.html`, css, js).
