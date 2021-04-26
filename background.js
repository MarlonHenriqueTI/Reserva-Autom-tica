chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    switch(message.type) {
      case "alertUser":
        var sound = new Audio('alerta.mp3').play();
        // Assuming you have `sender` from the messaging API

        // This will make the window blink/draw attention in the taskbar or equivalent
        chrome.windows.update(sender.tab.windowId, {drawAttention: true});
        // Optionally, switch to the tab inside the window as well
        chrome.tabs.update(sender.tab.id, {active: true});
        break;
    }
  });