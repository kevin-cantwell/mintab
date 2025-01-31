chrome.tabs.onCreated.addListener((newTab) => {
    if (chrome.runtime.lastError || !newTab.pendingUrl) {
        return;
    }
    chrome.tabs.query({}, (tabs) => {
        for (let tab of tabs) {
            if (tab.id !== newTab.id && tab.url === newTab.pendingUrl) {
                // Duplicate found: switch to the existing tab and close the new one
                chrome.tabs.remove(newTab.id, () => {
                    chrome.tabs.update(tab.id, { active: true });
                    chrome.windows.update(tab.windowId, { focused: true });
                });
                return;
            }
        }
    });
});