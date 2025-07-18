import React from "react";
import "./App.css";

function App() {
  async function handleClick() {
    const tabs = await browser.tabs.query({
      active: true,
      currentWindow: true,
    });
    const tab = tabs[0].id || null;
    if (tab == null) return;
    // maybe remove await
    await browser.tabs.sendMessage(tab, { action: "readPage" });
  }
  return (
    <main>
      <button onClick={handleClick}>Load Followers</button>
    </main>
  );
}

export default App;
