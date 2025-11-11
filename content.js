// === Create a Shadow DOM host (isolated UI) ===
const host = document.createElement("div");
host.id = "textpoacher-root";
host.style.position = "fixed";
host.style.top = "0";
host.style.left = "0";
host.style.zIndex = "999999999"; // always on top
document.documentElement.appendChild(host);

// Attach a shadow root
const shadow = host.attachShadow({ mode: "open" });

// Add styles inside shadow
const style = document.createElement("style");
style.textContent = `
  #tp-popup {
    position: fixed;
    background: #111;
    color: #fff;
    padding: 8px 12px;
    border-radius: 8px;
    font-size: 14px;
    max-width: 320px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.4);
    z-index: 999999999;
    pointer-events: auto;
    opacity: 0;
    transition: opacity 0.15s ease;
  }

  #tp-close {
    position: absolute;
    top: 2px;
    right: 6px;
    cursor: pointer;
    color: #ccc;
    font-size: 14px;
  }

  #tp-close:hover {
    color: #fff;
  }
`;
shadow.appendChild(style);

// === Create popup inside shadow ===
const popup = document.createElement("div");
popup.id = "tp-popup";
popup.style.display = "none";
shadow.appendChild(popup);

// === Selection logic ===

// Safe message send wrapper
function safeSendMessage(payload) {
  try {
    chrome.runtime.sendMessage(payload);
  } catch (err) {
    console.warn("TextPoacher: message send failed (likely blocked page)", err);
  }
}

// Handle text selection
function handleSelection(e) {
  const selection = window.getSelection().toString().trim();
  if (!selection || selection.split(" ").length > 1) return;

  const x = e.pageX;
  const y = e.pageY;
  safeSendMessage({ word: selection, coords: { x, y } });
}

// Attach listener
function addSelectionListener() {
  document.addEventListener("mouseup", handleSelection);
}

// Attach once DOM is ready
if (document.readyState === "complete" || document.readyState === "interactive") {
  addSelectionListener();
} else {
  document.addEventListener("DOMContentLoaded", addSelectionListener);
}

// Reattach if SPA replaces DOM
const observer = new MutationObserver(() => {
  if (!document.onmouseup) addSelectionListener();
});
observer.observe(document.documentElement, { childList: true, subtree: true });

// === Receive meaning from background ===
chrome.runtime.onMessage.addListener((msg) => {
  if (!msg.word) return;

  // Clamp popup position to viewport
  let left = msg.coords.x + 10;
  let top = msg.coords.y + 10;
  if (left + 300 > window.innerWidth) left = window.innerWidth - 320;
  if (top + 100 > window.innerHeight) top = window.innerHeight - 120;

  popup.style.display = "block";
  popup.style.left = left + "px";
  popup.style.top = top + "px";
  popup.style.opacity = "1";

  popup.innerHTML = `
    <span id="tp-close">×</span>
    <strong>${msg.word}</strong>: ${msg.meaning}
  `;

  popup.querySelector("#tp-close").addEventListener("click", () => {
    popup.style.opacity = "0";
    setTimeout(() => (popup.style.display = "none"), 150);
  });

  setTimeout(() => {
    popup.style.opacity = "0";
    setTimeout(() => (popup.style.display = "none"), 150);
  }, 6000);
});
