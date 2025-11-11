document.getElementById("lookup").addEventListener("click", async () => {
  const wordInput = document.getElementById("word");
  const word = wordInput.value.trim();

  if (!word) return;

  const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
  const data = await res.json();

  const titleEl = document.getElementById("word-title");
  const meaningEl = document.getElementById("meaning");
  const resultBox = document.getElementById("result-box");

  let meaning = "No definition found.";
  if (Array.isArray(data) && data[0]?.meanings?.length) {
    meaning = data[0].meanings[0].definitions[0].definition;
  } else if (data.title) {
    meaning = "No definition found.";
  }

  titleEl.textContent = word;
  meaningEl.textContent = meaning;
  resultBox.classList.remove("hidden");
});
