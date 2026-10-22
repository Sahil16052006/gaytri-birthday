# माझ्या बहिणीसाठी — Gaytri Pawar | 20th Birthday Celebration Website

A personal, emotionally meaningful digital birthday editorial magazine and scrapbook created with heartfelt love by **Sahil** for his sister **Gaytri Pawar** on her 20th Birthday (**23 October 2026**).

---

## 🌸 Creative Direction & Aesthetic
- **Theme**: Luxury Editorial Magazine + Artistic Handmade Scrapbook
- **Primary Color Palette**: Cream (`#FFF8F0`), Blush Pink (`#F1D5D8`), Dusty Rose (`#D5A0A8`), Deep Black (`#211D1E`), Champagne Gold (`#C8A46B`), Warm Brown (`#6D4C46`)
- **Typography**: Authentic Marathi typography with Devanagari Unicode support (`Noto Serif Devanagari`, `Noto Sans Devanagari`, `Kalam`) paired with editorial Latin serifs (`Cormorant Garamond`, `Playfair Display`).
- **Core Emotional Heart**: Celebrates the deep sibling bond of understanding, calming overthinking, and never feeling alone.

---

## 📖 Experience Structure (9 Chapters)
1. **The Opening Gift (सुरुवात)** — Full-screen magazine cover with teaser reveal and opening unlock button.
2. **Happy 20th Birthday, Gaytri (शुभेच्छा)** — Editorial hero section with date, badge, authentic portrait, and celebration confetti.
3. **“तू आहेस, म्हणून एकटं वाटत नाही” (नात्याची भावना)** — The emotional heart of the site; a sincere tribute to having a sister who listens and understands.
4. **Her Creative Soul (तुझ्या कल्पनांचं सुंदर जग)** — Celebrating Gaytri's artistic passions: Craft, Sketching, Drawing, and Photography.
5. **The Photo Gallery (आपल्या आठवणींची छोटीशी गॅलरी)** — Polaroid-style scrapbook gallery featuring 7 real photographs with interactive lightbox.
6. **Handwritten Letter (एक पत्र, फक्त तुझ्यासाठी)** — Interactive wax-sealed envelope that opens to reveal Sahil's complete letter.
7. **Birthday Countdown (उलटी गिनती)** — Live countdown to 23 October 2026 in `Asia/Kolkata` (IST) timezone, transitions to birthday celebration mode on the day.
8. **The Secret Surprise (गुप्त सरप्राइज)** — Interactive gift box that showers rose petals and golden sparkles while revealing a brotherly note.
9. **The Final Page (शेवटचं पान)** — Quiet, elegant closing with warm wishes, signature, and replay option.

---

## 🎵 Gentle Acoustic Ambient Music
Includes a procedural acoustic chime player powered by the Web Audio API (zero external network or broken link dependencies), featuring:
- Play / Pause controls
- Volume slider & Mute toggle
- Pulse animations
- Non-intrusive: never autoplays before user interaction.

---

## 🛠️ Local Development

### Prerequisites
- Node.js (v18+)
- npm

### Run Locally
```bash
# Navigate to the project directory
cd projects/gaytri-birthday

# Start the local development server
npm run dev
```
Open `http://localhost:5174` in your browser.

### Build for Production
```bash
npm run build
```
The output files will be created in the `dist/` directory.

---

## 🖼️ How to Change or Add Photos
All photos are stored in `public/images/`.
To update photos:
1. Place your new photo in `public/images/`.
2. Open `src/data/birthdayConfig.ts`.
3. Update the `photos` array in `section5` with your new image path, caption, and tag.
Everything in the website (all Marathi text, dates, captions, and links) is configured centrally in `src/data/birthdayConfig.ts`!

---

## 🚀 Free Deployment Guide

### Option 1: GitHub Pages with Automated GitHub Actions (Recommended)
1. Initialize a Git repository and commit your files:
   ```bash
   git init
   git add .
   git commit -m "feat: complete birthday website for Gaytri"
   ```
2. Create a new public repository on [GitHub](https://github.com/new) named `gaytri-birthday`.
3. Push your repository:
   ```bash
   git remote add origin https://github.com/<your-username>/gaytri-birthday.git
   git branch -M main
   git push -u origin main
   ```
4. On GitHub, go to **Settings > Pages**:
   - Under **Build and deployment > Source**, select **GitHub Actions**.
   - The pre-configured `.github/workflows/deploy.yml` will automatically build and publish your website at `https://<your-username>.github.io/gaytri-birthday/`.

### Option 2: GitHub Pages using the `docs/` folder
1. In your GitHub repository **Settings > Pages**:
   - Under **Build and deployment > Source**, select **Deploy from a branch**.
   - Select branch `main` and folder `/docs`.
   - Click **Save**.

### Option 3: Free Deployment on Vercel or Netlify
- **Vercel**: Import your GitHub repository, choose Vite as Framework Preset, and click **Deploy**.
- **Netlify**: Drag and drop the `dist/` folder directly onto [Netlify Drop](https://app.netlify.com/drop).
