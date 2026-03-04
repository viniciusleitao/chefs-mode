chrome.action.onClicked.addListener(async (tab) => {
  if (!tab.id) return;

  try {
    // Ask the content script in the current tab to toggle Chef's Mode
    await chrome.tabs.sendMessage(tab.id, { type: "TOGGLE_CHEFS_MODE" });
  } catch (err) {
    // If the content script isn't injected yet (e.g. due to match patterns),
    // inject it on demand, then retry the toggle message.
    try {
      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ["contentScript.js"]
      });

      await chrome.tabs.sendMessage(tab.id, { type: "TOGGLE_CHEFS_MODE" });
    } catch (injectErr) {
      console.error("Chef's Mode: failed to inject or message content script", injectErr);
    }
  }
});

