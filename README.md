# 🖋️ Quill — AI Content Assistant

Quill is a sleek, modern, and highly accessible AI-powered writing assistant built with React and Vite. It helps you draft blog intros, social captions, emails, cover letters, essays, stories, newsletters, and assignments instantly, customized precisely to your desired tone and length.

This project was built as a graduation project extending the concepts learned in the Scrimba Advanced React course.

---

## ✨ Features

- **🎯 Controlled Content Generation:** Form parameters are completely controlled components (prompt description, format selection, tone pills, and length pills).
- **🔒 Input Validation:** The **Generate** button remains disabled until all required parameters (text description, tone, and length) are selected.
- **🕒 Generation History Sidebar:** A slide-out panel that acts as a local archive of all your draft generations.
  - Automatically persists to and loads from the browser's `localStorage`.
  - Supports loading past drafts with a single click.
  - Generates new drafts as fresh history items, keeping all previous versions accessible.
- **♿ First-Class Accessibility (A11y):** 
  - Complete keyboard navigation support with customized `:focus-visible` outlines.
  - Full screen-reader support using semantic HTML landmarks, `aria-live` announcements, and dynamic button states (`aria-pressed`, `aria-expanded`, `aria-controls`).
  - Strict focus-management (opening the history sidebar focuses the close button; closing it restores focus back to the toggle header button so keyboard users never lose their place).
  - Handles `Escape` keyboard listeners to dismiss panels seamlessly.
- **⚠️ Error Handling:** Graceful API failure catching with an active `role="alert"` visual error banner.
- **⚡ Performance & Build:** Fast developer feedback loops with Vite and highly reactive layout scrolling to newly loaded drafts.

---

## 🛠️ Built With

- **Framework:** React 19 / Vite
- **Styling:** Vanilla CSS (Glassmorphism, curated dark-mode HSL colors, responsive layouts)
- **API integration:** Hugging Face Inference API / Google Gemini AI Model
- **Accessibility standards:** WCAG 2.1 AA Compliant ARIA patterns

---

## 🚀 Quick Start

### 1. Clone the repository
```bash
git clone https://github.com/KingDave17/quill-assistant.git
cd quill-assistant
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables
Create a `.env` file inside the root directory:
```env
VITE_HF_API_KEY=your_hugging_face_token_here
```

> ⚠️ **Note:** `.env` files are ignored globally by Git to protect your secrets.

### 4. Run the development server
```bash
npm run dev
```
Open `http://localhost:5173` in your browser to start writing!
