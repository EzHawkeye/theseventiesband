# Deploy naar Vercel

Je pusht **geen** `.env.local` naar GitHub. Alleen code gaat naar Git; **gevoelige waarden** zet je in Vercel.

## 1. Code op GitHub

```bash
git add .
git commit -m "Deploy ready"
git push origin main
```

(Zorg dat `.env.local` **niet** in de commit zit — die staat in `.gitignore`.)

## 2. Nieuw project op Vercel

1. Ga naar [vercel.com](https://vercel.com) en log in (bijv. met GitHub).
2. **Add New… → Project**.
3. **Import** je repository `theseventiesband`.
4. Framework: **Next.js** (wordt automatisch herkend).
5. Klik **Deploy** (eerste keer mag nog zonder alle env-vars; build kan slagen, mail werkt pas na stap 3).

## 3. Environment variables (belangrijk)

In Vercel: **Project → Settings → Environment Variables**.

Voeg toe (Production en eventueel **Preview** als je contactformulier op preview-URLs wilt testen):

| Name | Waarde | Opmerking |
|------|--------|------------|
| `RESEND_API_KEY` | `re_...` uit Resend | **Verplicht** voor contactmail |
| `CONTACT_TO_EMAIL` | Jouw inbox | Optioneel; anders gebruikt de app de default uit de code |
| `RESEND_FROM_EMAIL` | `The Seventies Band <onboarding@resend.dev>` of eigen domein | Optioneel |
| `NEXT_PUBLIC_SITE_URL` | `https://jouw-project.vercel.app` of custom domein | Voor Open Graph / metadata (na eerste deploy URL invullen) |

Daarna: **Deployments → … op laatste deployment → Redeploy** (of push een lege commit) zodat de nieuwe variabelen actief zijn.

## 4. Custom domein (optioneel)

**Settings → Domains** → voeg je domein toe en volg DNS-instructies.

Update daarna `NEXT_PUBLIC_SITE_URL` naar `https://jouwdomein.be`.

## 5. Resend na livegang

- Voor productie: eigen domein in Resend verifiëren en `RESEND_FROM_EMAIL` daarop zetten.
- `onboarding@resend.dev` is alleen geschikt voor test.

## Snelcheck

- Build faalt: bekijk **Deployments → Build log**.
- Mail werkt niet op productie: controleer **RESEND_API_KEY** in Vercel en Resend-dashboard (domain / limits).
