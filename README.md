# ClientFlow Lite

ClientFlow Lite is a lightweight, browser based project and invoice management tool built for freelancers, small agencies, and local businesses.

It runs completely inside the browser with no backend server, no database, and no login system.

---

## 🚀 Live Demo
Host this repository using GitHub Pages to view the live demo.

---

## ✨ Features

- Client management
- Project tracking per client
- PDF invoice generation
- GST support for Indian billing
- Backup and restore via JSON
- Offline support using Service Worker
- Zero server cost

---

## 🛠 Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript
- LocalStorage
- jsPDF
- GitHub Pages

---

## 📦 Data Storage

All data is stored locally in your browser using LocalStorage.  
No data is sent to any server.

---

## 🔐 Privacy

Your data never leaves your device.  
Clearing browser data will remove stored records unless backed up.

---

## 📂 Project Structure

```text
clientflow-lite/
├── index.html
├── css/
│   └── style.css
├── js/
│   ├── app.js
│   ├── storage.js
│   ├── client.js
│   ├── project.js
│   └── invoice.js
├── sw.js
└── README.md
