chrome.tabs.onUpdated.addListener((newTabId, changeInfo, tab) => {
    chrome.tabs.query({}, (tabs) => {
        for (let tab of tabs) {
            if (tab.id !== newTabId && tab.url === changeInfo.url) {
                // Duplicate found: switch to the existing tab and close the new one
                chrome.tabs.remove(newTabId, () => {
                    chrome.tabs.update(tab.id, { active: true });
                    chrome.windows.update(tab.windowId, { focused: true });
                });
                return;
            }
        }
    });
});