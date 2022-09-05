import { remove } from 'fs-extra';
import { isBreakStatement } from 'typescript';
import { printLine } from './modules/print';

console.log('Content script works!');
console.log('Must reload extension for modifications to take effect.');

printLine("Using the 'printLine' function from the Print Module");


const changeBadgeColor = (obj) => {
  const redButtons = document.querySelectorAll('.a-badge-label');
  if (obj.state) {
    redButtons.forEach(button => {
      button.setAttribute('data-a-badge-color-old', button.getAttribute('data-a-badge-color'));
      button.setAttribute('data-a-badge-color', 'sx-purple');
    });
  } else {
    redButtons.forEach(button => {
      if (button.getAttribute('data-a-badge-color-old')) {
        button.setAttribute('data-a-badge-color', button.getAttribute('data-a-badge-color-old'));
      }
    });
  }
}

const appendNewButton = (el, button) => {
  const elInner = el.querySelector('.sg-col-inner .s-card-container');
  if (elInner) {
    elInner.appendChild(button);
  }
}

const createNewButton = (asin) => {
  const buttonDiv = document.createElement("div");
  const button = document.createElement("button");
  buttonDiv.className = 'abamazon-info-button';
  button.innerHTML = `Info for ${asin}`;
  button.addEventListener('click', () => {
    // alert(asin);

    const urlParams = {
      api_key: 'D74F0991A06B487C9247F2E8EAB6D962',
      type: 'product',
      asin: asin,
      amazon_domain: 'amazon.com',
    };
    const url = 'https://api.rainforestapi.com/request?' + new URLSearchParams(urlParams);
    const options = {
      method: 'GET',

      headers: {
        Accept: 'application/json',
        "Content-Type": 'application/json;charset=UTF-8',
      },
      // body: JSON.stringify({
      //   a: 10,
      //   b: 20,
      // }),
    };
    fetch(url, options)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const alertData = JSON.stringify(data, null, 2);
        alert(alertData);
      });
  });
  buttonDiv.appendChild(button);

  return buttonDiv;
};

const removeButton = (button) => {
  button.remove();
};

const findAllSearchResultsAsins = (obj) => {
  const gridItems = document.querySelectorAll('[data-asin]');
  if (obj.state) {
    gridItems.forEach(gridItem => {
      if (gridItem.getAttribute('data-asin')) {
        const button = createNewButton(gridItem.getAttribute('data-asin'));
        appendNewButton(gridItem, button);
      }
    });
  } else {
    const allButtons = document.querySelectorAll('.abamazon-info-button');
    allButtons.forEach(button => {
      removeButton(button);
    });
  }

};

const changeStyle = (obj) => {
  document.body.classList.remove('style1');
  if (obj.state) {
    document.body.classList.add('style1');
  }
}

const changeProductGridBorders = (obj) => {
  const gridItems = document.querySelectorAll('.s-search-results .s-card-border');
  console.log(`Turn on borders ${obj}`);

  const borderState = obj.state ? '2px dotted red' : null;
  gridItems.forEach(gridItem => {
    // if (!origProductGridBorders) {
    //   origProductGridBorders = gridItem.style.border;
    //   console.log('style', gridItem.style.border);
    // }
    gridItem.style.border = borderState;
  });
}



chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    switch (request.action) {
      case 'style':
        changeStyle(request.obj);
        break;
      case 'borders':
        changeProductGridBorders(request.obj);
        break;
      case 'badges':
        changeBadgeColor(request.obj);
        break;
      case 'prodInfo':
        findAllSearchResultsAsins(request.obj);
        break;
      default:
      // Do nothing
    }
  });

