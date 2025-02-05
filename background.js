chrome.tabs.onCreated.addListener((newTab) => {
    try {
        if (chrome.runtime.lastError || !newTab.pendingUrl) {
            return;
        }
        const newUrl = new URL(newTab.pendingUrl);
        // don't interrupt chrome special tabs such as chrome://newtab
        if (newUrl.protocol === 'chrome:') {
            return;
        }
        chrome.tabs.query({}, (tabs) => {
            for (let existingTab of tabs) {
                // Don't compare a tab against itself
                if (existingTab.id === newTab.id) {
                    continue;
                }
                const existingUrl = new URL(existingTab.url);

                // if the base urls don't match, move on
                if (existingUrl.origin !== newUrl.origin ||
                    existingUrl.pathname !== newUrl.pathname ||
                    existingUrl.search !== newUrl.search) {
                    continue
                }
        
                // Duplicate found: switch to the existing tab and close the new one
                chrome.tabs.remove(newTab.id, () => {
                    // If the new tab's url has a fragment, alter the existing tab to match it. This will
                    // trigger a hashchange event.
                    if (newUrl.hash) {
                        chrome.tabs.update(existingTab.id, { active: true, url: newUrl.toString() });   
                    // Otherwise, don't remove the existing tab's fragment value, just switch to it. 
                    } else {
                        chrome.tabs.update(existingTab.id, { active: true });
                    }
                    chrome.windows.update(existingTab.windowId, { focused: true });
                });
            }
        });
    } catch (error) {
        console.error('Avoid Tab Duplicates extension error:', error);
    }
});