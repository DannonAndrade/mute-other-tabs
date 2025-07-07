chrome.commands.onCommand.addListener((command) => {
  if (command === "mute-other-tabs") {
    chrome.tabs.query({currentWindow: true}, (tabs) => {
      chrome.tabs.query({active: true, currentWindow: true}, (activeTabs) => {
        const currentTabId = activeTabs[0].id;
        for (const tab of tabs) {
          const shouldMute = tab.id !== currentTabId;
          chrome.tabs.update(tab.id, {muted: shouldMute});
        }
      });
    });
  }
  if (command === "unmute-all-tabs") {
    chrome.tabs.query({currentWindow: true}, (tabs) => {
        for (const tab of tabs) {
          chrome.tabs.update(tab.id, {muted: false});
        }
    });
  }
});