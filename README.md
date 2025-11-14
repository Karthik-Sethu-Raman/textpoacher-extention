# TextPoacher: Highlight-to-Define Chrome Extension

TextPoacher is a minimalist Chrome extension that lets you highlight any word on any webpage to instantly view its meaning in a sleek popup.
Built with Manifest V3, JavaScript, and DictionaryAPI, it’s fast, safe, and completely offline-friendly once loaded.

---

## Features

* Instant definitions: highlight a word, and the meaning appears instantly.
* Shadow-DOM popup: isolated from site styles, looks clean everywhere.
* Modern dark UI: rounded corners, subtle animations, and responsive design.
* Privacy-respecting: no tracking, no storage, no analytics.
* Works on almost every website: CSP-safe and lightweight.

---

## Tech Stack

| Component  | Technology                     |
| ---------- | ------------------------------ |
| Manifest   | Chrome Extension Manifest V3   |
| Frontend   | HTML, CSS, JavaScript          |
| Background | Service Worker (background.js) |
| API        | dictionaryapi.dev              |
| UI         | Shadow DOM overlay popup       |

---

## Installation (Developer Mode)

1. Clone this repository

   ```
   git clone https://github.com/<your-username>/textpoacher-extension.git
   cd textpoacher-extension
   ```

2. Open Chrome → `chrome://extensions`

3. Enable Developer Mode (top-right toggle)

4. Click Load Unpacked → select this project folder

5. Click the TextPoacher icon and test it!

---

## How It Works

```
You highlight a word
   ↓
content.js captures the text + cursor position
   ↓
background.js fetches the meaning from dictionaryapi.dev
   ↓
content.js displays a floating popup with the definition
```

No user data is stored, transmitted, or logged — only a single, anonymous dictionary API request.

---

## Folder Structure

```
textpoacher-extension/
│
├── manifest.json
├── background.js
├── content.js
│
├── popup/
│   ├── popup.html
│   ├── popup.css
│   └── popup.js
│
├── icons/
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
│
├── LICENSE
└── README.md
```

---

## Privacy

TextPoacher does not collect or share any personal data.
All definitions are fetched directly from the public Dictionary API.

---

## Author

**Karthik Sethuraman**
Built in 2025 as a lightweight productivity extension.

"Created to make learning words frictionless —> just highlight and poach!"

---

## License

This project is licensed under the MIT License.

---

## Support

If you like this project:

* Star this repo
* Report issues or suggestions under Issues
* Fork and improve!
