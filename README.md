For people who tend to open the same document over and over and want to avoid polluting their Chrome tabs with a bunch of duplicates. This extension listens for the tabs.onCreated event and if the pendingUrl matches anything already open, it will navigate to the open tab instead of creating a new one. It is strict! If the url params are different or out of order it will not notice a match and you'll end up with two tabs with very similar, but not exactly the same, URLs. Only tabs created from clicking a link or other similar action will be evaluated. Directly editing an already open tab has no effect. This means if you hit ⌘-T and paste a url, you can still get dupes! This is an important distinction because it represents a workaround if you actually do want to force a duplicate for some reason.

URL fragments (or hashes) are handled in a nuanced way. URLs with different fragments may still match. If the newly created tab has a fragment, the already open tab will be updated with it and a hashchange event will trigger.

Lastly, URLs that start with "chrome:" are ignored. This is because empty tabs actually have a URL ("chrome://newtab/") and I didn't want to interfere with Chrome's special protocol.

Release Notes

v0.0.0.2 - Handle URL fragments by updating the already open tab with it
v0.0.0.1 - Initial release