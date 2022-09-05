console.log('This is thssse background page.');
console.log('Put the background scripts here.');
console.log('heysss');


chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  // console.log(changeInfo.url);
  // console.log('hey');
  // reddenPage();

  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { text: "redden" }, function (response) {
      if (response.type === "test") {
        console.log('test received');
      }
    });
  });
}); 
