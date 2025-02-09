// scripts/popup.js

document.getElementById("save").addEventListener("click", () => {
  const quote = document.getElementById("quote").value;
  const activity = document.getElementById("activity").value;
  chrome.storage.sync.set({ quote, activity }, () => {
    alert("Settings saved!");
  });
});

// Load saved settings when the popup opens
chrome.storage.sync.get(["quote", "activity"], (data) => {
  if (data.quote) {
    document.getElementById("quote").value = data.quote;
  }
  if (data.activity) {
    document.getElementById("activity").value = data.activity;
  }
});