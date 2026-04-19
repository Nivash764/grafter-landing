# Grafterr Landing Page Technical Assessment

This project is a technical assessment implementing the Grafterr Landing Page based strictly on a provided Figma design.

### 🌐 Live Deployment
**Live Link:** [Insert your Vercel/Netlify URL here after deployment]

## 🛠️ Chosen Stack
- **Option A:** Plain JavaScript (Vanilla JS using ES6+ Modules).
- **Styling:** CSS3 variables, flexbox, and semantic HTML5 properties natively.
- **Build Server:** Vite `4.4.5` (Used strictly as an HTTP static server to bypass local CORS limitations for JSON injection).

## 🚀 Setup Steps

1. Clone this repository directly onto your machine:
   ```bash
   git clone https://github.com/Nivash764/grafterr-landing.git
   cd grafterr-landing
   ```
2. Install the lightweight development server:
   ```bash
   npm install
   ```
3. Run the application locally in your browser:
   ```bash
   npm run dev
   ```
4. Click the local server link (e.g. `http://localhost:5173`) to view the complete build!

## 📖 Explanation of Approach

- **Component & Script Architecture**: Instead of jamming all variables into one file, logic was securely separated into modular JS pieces (`api.js`, `carousel.js`, `components.js`, `main.js`). This mimics the lifecycle hooks of major frameworks but retains the speed and lightweight overhead of Vanilla JS.
- **Dynamic Asynchronous Data Fetching**: Instead of hardcoding content in HTML, all strings, variables, and arrays are localized in `data/content.json`. I utilized the native `Fetch API` paired tightly with Javascript Promises to execute 1-second simulated network latencies (`setTimeout`), fully mimicking a production-ready application environment. 
- **Skeleton Fallbacks**: When the Fetch API triggers the 1-second delay, native CSS-shimmering `<div class="skeleton">` layout meshes render seamlessly on screen. When the Promise resolves, a DOM class removal instantly snaps the rendered items into an elegant pure HTML payload!
- **Carousel Mechanics**: A robust Object-Oriented JS Class interface hooks universally into Javascript touch events. By validating differences in `screenX` thresholds (`touchstart` vs `touchend`), mobile device testing provides fluid sliding parameters to transition across the Product items.

## 📸 Screenshots

*(To the Reviewer: Below are visual comparisons measuring the implementation against the Figma scope).*

**Desktop Implementation:**
![Desktop Screenshot](desktop-hero.png)

**Mobile Implementation:**
![Mobile Screenshot](mobile-view.png)
