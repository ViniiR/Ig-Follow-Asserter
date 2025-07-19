import "./App.css";

function App() {
    async function sendAction(action: string) {
        const tabs = await browser.tabs.query({
            active: true,
            currentWindow: true,
        });
        const tab = tabs[0].id || null;
        if (tab == null) return;
        browser.tabs.sendMessage(tab, { action });
    }
    return (
        <main>
            <button
                onClick={() => {
                    sendAction("readPage");
                }}
            >
                Run
            </button>
            <button
                onClick={() => {
                    sendAction("compareFollowers");
                }}
            >
                Compare
            </button>
        </main>
    );
}

export default App;
