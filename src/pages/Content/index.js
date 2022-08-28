import { printLine } from './modules/print';

console.log('Content script works!');
console.log('Must reload extension for modifications to take effect.');

printLine("Using the 'printLine' function from the Print Module");

printLine("...from the Print Module");

// Called when the user clicks on the action.
function reddenPage() {
  console.log('HEYYY');
  document.body.style.backgroundColor = 'red';
}

// chrome.tabs.onUpdated.addListener((tab) => {
//     // if (!tab.url.includes("chrome://")) {
//     //     chrome.scripting.executeScript({
//     //         target: { tabId: tab.id },
//     //         function: reddenPage
//     //     });
//     // }
//     alert(tab);
// });

chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    if (request.text === "redden") {
      console.log('test sent');
      sendResponse({ type: "test" });
      // chrome.scripting.executeScript({
      //   target: { tabId: tab.id },
      //   function: reddenPage
      // });
      reddenPage();
    }
  });

