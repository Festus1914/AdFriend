// scripts/content.js

// List of inspirational quotes
const inspirationalQuotes = [
    "Believe you can and you're halfway there. – Theodore Roosevelt",
    "The only way to do great work is to love what you do. – Steve Jobs",
    "Don't watch the clock; do what it does. Keep going. – Sam Levenson",
    "Success is not final, failure is not fatal: It is the courage to continue that counts. – Winston Churchill",
    "The future belongs to those who believe in the beauty of their dreams. – Eleanor Roosevelt",
    "You are never too old to set another goal or to dream a new dream. – C.S. Lewis",
    "The best time to plant a tree was 20 years ago. The second best time is now. – Chinese Proverb",
    "Your time is limited, don't waste it living someone else's life. – Steve Jobs",
    "Act as if what you do makes a difference. It does. – William James",
    "The only limit to our realization of tomorrow is our doubts of today. – Franklin D. Roosevelt",
    "Start where you are. Use what you have. Do what you can. – Arthur Ashe",
    "Dream big and dare to fail. – Norman Vaughan",
    "The harder you work for something, the greater you'll feel when you achieve it. – Unknown",
    "You don't have to be great to start, but you have to start to be great. – Zig Ziglar",
    "The secret of getting ahead is getting started. – Mark Twain",
    "It always seems impossible until it's done. – Nelson Mandela",
    "Don't be pushed around by the fears in your mind. Be led by the dreams in your heart. – Roy T. Bennett",
    "Success is walking from failure to failure with no loss of enthusiasm. – Winston Churchill",
    "The only person you are destined to become is the person you decide to be. – Ralph Waldo Emerson",
    "Do what you can, with what you have, where you are. – Theodore Roosevelt"
  ];
  
  // Function to detect ad elements
  function detectAdElements() {
    const adSelectors = [
      "div[class*='ad']",
      "iframe[src*='ads']",
      "img[src*='ad']",
      "div[id*='ad']"
    ];
  
    let adElements = [];
    adSelectors.forEach(selector => {
      adElements.push(...document.querySelectorAll(selector));
    });
    return adElements;
  }
  
  // Function to create a motivational quote widget
  function createQuoteWidget(quote) {
    const widget = document.createElement("div");
    widget.className = "adfriend-widget";
    widget.innerHTML = `
      <div class="quote-container">
        <i class="fas fa-quote-left"></i>
        <p class="quote-text">${quote}</p>
        <i class="fas fa-quote-right"></i>
        <p class="quote-author">- AdFriend</p>
      </div>
    `;
    return widget;
  }
  
  // Function to create an activity reminder widget
  function createActivityWidget(activity) {
    const widget = document.createElement("div");
    widget.className = "adfriend-widget";
    widget.innerHTML = `
      <div class="activity-container">
        <i class="fas fa-running"></i>
        <p class="activity-text">${activity}</p>
      </div>
    `;
    return widget;
  }
  
  // Function to replace ads with widgets
  function replaceAds() {
    chrome.storage.sync.get(["quote", "activity"], (data) => {
      // Use a custom quote if set, otherwise pick a random inspirational quote
      const quote = data.quote || inspirationalQuotes[Math.floor(Math.random() * inspirationalQuotes.length)];
      const activity = data.activity || "Have you done your burpees today?";
      const adElements = detectAdElements();
      adElements.forEach((ad, index) => {
        const widget = index % 2 === 0 ? createQuoteWidget(quote) : createActivityWidget(activity);
        ad.replaceWith(widget);
      });
    });
  }
  
  // Run the replacement function when the page loads
  window.addEventListener("load", replaceAds);