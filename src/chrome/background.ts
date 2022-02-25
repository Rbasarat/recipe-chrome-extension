import { ChromeMessage, Sender } from "../types";

/** Fired when the extension is first installed,
 *  when the extension is updated to a new version,
 *  and when Chrome is updated to a new version. */
 chrome.runtime.onInstalled.addListener((details) => {
    console.log('[background.js] onInstalled', details);   
});

/**
 *  Sent to the event page just before it is unloaded.
 *  This gives the extension opportunity to do some clean up.
 *  Note that since the page is unloading,
 *  any asynchronous operations started while handling this event
 *  are not guaranteed to complete.
 *  If more activity for the event page occurs before it gets
 *  unloaded the onSuspendCanceled event will
 *  be sent and the page won't be unloaded. */
chrome.runtime.onSuspend.addListener(() => {
    console.log('[background.js] onSuspend')
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
        console.log("joheo in backgroudn")
        console.log(request)
        sendResponse("johoee from background")
 });