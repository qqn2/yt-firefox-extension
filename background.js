chrome.commands.onCommand.addListener((command) => {
  if (command === "summarize-transcript") {
    // Identify the active tab
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = tabs[0];
      // Inject our content script into that tab
      chrome.tabs.executeScript(tab.id, {
        file: "content.js"
      });
    });
  }
});
