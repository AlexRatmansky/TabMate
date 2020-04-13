// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

chrome.commands.onCommand.addListener(function (command) {
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
