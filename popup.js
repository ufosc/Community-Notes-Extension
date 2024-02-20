async function main() {
    const tabs = await chrome.tabs.query({"active": true, "currentWindow": true});
    const currentTab = tabs[0];
  
    document.querySelector('.title').textContent = currentTab.title;
    document.querySelector('.url').textContent = currentTab.url;
  
    if (currentTab.url?.startsWith('chrome://')) {
      document.querySelector('.description').textContent = "Cannot add note to this page.";
      document.querySelector('.textarea').style.display = "none";
      document.querySelector('button#save').style.display = "none";
      document.querySelector('button#clear').style.display = "none";
      return;
    }
  
    chrome.storage.local.get([currentTab.url]).then((result) => {
      document.querySelector('.description').textContent = result[currentTab.url] || "No Note for this page.";
      document.querySelector('.textarea').textContent = result[currentTab.url] || "";
    });
  
    const saveButton = document.querySelector('button#save');
    saveButton.addEventListener('click', async () => {
      const text = document.querySelector('.textarea').textContent;
      chrome.storage.local.set({[currentTab.url]: text}).then(() => {
      });
      document.querySelector('.description').textContent = text || "No Note for this page.";
    });
  
    const clearButton = document.querySelector('button#clear');
    clearButton.addEventListener('click', async () => {
      document.querySelector('.textarea').textContent = "";
      chrome.storage.local.remove(currentTab.url).then(() => {
      });
      document.querySelector('.description').textContent = "No Note for this page.";
    });
  
  }
  
  await main();
  export {};