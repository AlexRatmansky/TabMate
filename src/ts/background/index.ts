import { createStore } from "redux";
import { wrapStore } from "webext-redux";
import { configureApp } from "./AppConfig";
import reducers, { loadState } from "./store";

const preloadedState = loadState();
const store = createStore(reducers, preloadedState);

configureApp(store);
wrapStore(store);

chrome.commands.onCommand.addListener((command) => {
  if (command == "toggle-pin") {
    // Get the currently selected tab
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      // Toggle the pinned status
      var current = tabs[0];
      chrome.tabs.update(current.id, { pinned: !current.pinned });
    });
  }

  if (command == "move-tab-left") {
    // Get the currently selected tab
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      // Toggle the pinned status
      var current = tabs[0];
      chrome.tabs.move(current.id, {
        index: current.index === 0 ? current.index : --current.index,
      });
    });
  }

  if (command == "move-tab-right") {
    // Get the currently selected tab
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      // Toggle the pinned status
      var current = tabs[0];
      chrome.tabs.move(current.id, { index: ++current.index });
    });
  }

  if (command == "move-tab-start") {
    // Get the currently selected tab
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      // Toggle the pinned status
      var current = tabs[0];
      chrome.tabs.move(current.id, { index: 0 });
    });
  }

  if (command == "move-tab-end") {
    // Get the currently selected tab
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      // Toggle the pinned status
      var current = tabs[0];
      chrome.tabs.move(current.id, { index: -1 });
    });
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.greeting == "hello") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      // Toggle the pinned status
      var current: chrome.tabs.Tab = tabs[0];
      chrome.tabs.update(current.id, { pinned: !current.pinned });
    });

    console.log(
      sender.tab
        ? "from a content script:" + sender.tab.url
        : "from the extension"
    );

    sendResponse({ farewell: "goodbye" });
  }
});
