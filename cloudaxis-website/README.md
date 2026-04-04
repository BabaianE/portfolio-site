# CloudAxis — Freelancer Website

Personal website for **Alex Müller**, freelance Azure Infrastructure & Cloud FinOps specialist for the insurance sector.

---

## Project Structure

```
cloudaxis-website/
├── index.html              # Main HTML entry point
├── assets/
│   ├── css/
│   │   └── styles.css      # All styles (design tokens, layout, components)
│   └── js/
│       └── main.js         # Cursor, scroll-reveal, contact form logic
├── .vscode/
│   ├── extensions.json     # Recommended VSCode extensions
│   └── settings.json       # Workspace formatting & editor settings
├── .gitignore
└── README.md
```

---

## Getting Started

### Prerequisites
- [VSCode](https://code.visualstudio.com/) (recommended)
- [Live Server extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) for local preview

### Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/cloudaxis-website.git
   cd cloudaxis-website
   ```

2. Open in VSCode:
   ```bash
   code .
   ```

3. Install the recommended extensions when prompted by VSCode.

4. Start Live Server:
   - Right-click `index.html` → **Open with Live Server**
   - Or click **Go Live** in the VSCode status bar
   - Opens at `http://127.0.0.1:5500`

---

## Personalisation Checklist

Before going live, update these placeholders:

| File | What to change |
|---|---|
| `index.html` | Name, job title, availability date, certifications |
| `index.html` | LinkedIn / GitHub / XING URLs |
| `index.html` | Phone number, email address displayed |
| `assets/js/main.js` | `recipient` email address in `handleSubmit()` |
| `index.html` | VAT number (USt-IdNr) in the footer |

---

## Contact Form

The form uses a `mailto:` approach — no backend required. When a visitor submits the form, their default email client opens with all fields pre-filled. They send the email themselves.

**To upgrade later:** swap the `mailto:` logic in `main.js` for a [Formspree](https://formspree.io) endpoint (free tier: 50 submissions/month) with minimal code changes.

---

## Deployment

This is a **static website** — any static host works:

| Host | Notes |
|---|---|
| [Netlify](https://netlify.com) | Free, drag-and-drop deploy or Git integration |
| [GitHub Pages](https://pages.github.com) | Free, push-to-deploy from this repo |
| [Azure Static Web Apps](https://azure.microsoft.com/products/app-service/static) | Free tier, fits the Azure theme |
| Any webspace / hoster | Just upload the files via FTP / SFTP |

---

## Tech Stack

- **HTML5** — semantic markup
- **CSS3** — custom properties (design tokens), Grid, animations
- **Vanilla JS** — no frameworks or build tools required
- **Google Fonts** — Cormorant Garamond · DM Mono · Syne

---

## License

© 2025 Alex Müller. All rights reserved.
