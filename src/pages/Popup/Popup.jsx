import React, { useState, useEffect } from 'react';
import logo from '../../assets/img/logo.svg';
import Greetings from '../../containers/Greetings/Greetings';
import './Popup.css';

const Popup = () => {
  const [borderChecked, setBorderChecked] = useState(false);
  const [styleChecked, setStyleChecked] = useState(false);
  const [badgeChecked, setBadgeChecked] = useState(false);
  const [prodInfoChecked, setProdInfoChecked] = useState(false);

  useEffect(() => {
    sendMessageToTabs('borders', { state: borderChecked });
  }, [borderChecked]);

  useEffect(() => {
    sendMessageToTabs('style', { state: styleChecked });
  }, [styleChecked]);

  useEffect(() => {
    sendMessageToTabs('badges', { state: badgeChecked });
  }, [badgeChecked]);

  useEffect(() => {
    sendMessageToTabs('prodInfo', { state: prodInfoChecked });
  }, [prodInfoChecked]);

  const sendMessageToTabs = (msgText, msgObj) => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { action: msgText, obj: msgObj }, function (response) {
      });
    });
  }

  const handleBorderChange = () => {
    setBorderChecked(!borderChecked);
  }

  const handleStyleChange = () => {
    setStyleChecked(!styleChecked);
  }

  const handleBadgeChange = () => {
    setBadgeChecked(!badgeChecked);
  }

  const handleProdInfoChange = () => {
    setProdInfoChecked(!prodInfoChecked);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h2>[A/B]mazon</h2>
        <h4>
          Toggle page properties:
        </h4>
        <div class="controls">
          <div>
            <input type="checkbox" selected={styleChecked} onChange={handleStyleChange} />Change stylesheet
          </div>
          <div>
            <input type="checkbox" selected={borderChecked} onChange={handleBorderChange} />Change borders
          </div>
          <div>
            <input type="checkbox" selected={badgeChecked} onChange={handleBadgeChange} />Change badges
          </div>
          <div>
            <input type="checkbox" selected={prodInfoChecked} onChange={handleProdInfoChange} />Product info
          </div>
        </div>
      </header>
    </div>
  );
};

export default Popup;
