chrome.runtime.onMessage.addListener(async (message, sender) => {
  const word = message.word?.trim().toLowerCase();
  const coords = message.coords;
  if (!word) return;

  try {
    const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    const data = await res.json();

    let meaning = "No definition found.";
    if (Array.isArray(data) && data[0]?.meanings?.length) {
      meaning = data[0].meanings[0].definitions[0].definition;
    } else if (data.title) {
      console.warn("API message:", data.message);
    }

    // Send meaning back to the content script
    chrome.tabs.sendMessage(sender.tab.id, { word, meaning, coords });
  } catch (err) {
    console.error("Error fetching definition:", err);
  }
});
