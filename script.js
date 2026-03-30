const generateBtn = document.getElementById("generateBtn");
const tryAgain = document.getElementById("tryAgain");
const copyBtn = document.getElementById("copyBtn");

const loading = document.getElementById("loading");
const resultCard = document.getElementById("resultCard");

const bookNameEl = document.getElementById("bookName");
const referenceEl = document.getElementById("reference");
const verseTextEl = document.getElementById("verseText");

const cache = {};

async function fetchData(book) {
  
  if (cache[book]) {
    return cache[book];
  }

  const res = await fetch(`data/${book}.json`);
  const data = await res.json();

  cache[book] = data; 
  return data;
}

function getRandomVerse(data) {
  const chapter = data.chapters[Math.floor(Math.random() * data.chapters.length)];
  const verseIndex = Math.floor(Math.random() * chapter.verses.length);

  return {
    book: data.book,
    chapter: chapter.chapter,
    verse: verseIndex + 1,
    text: chapter.verses[verseIndex]
  };
}

async function generateVerse() {
  resultCard.classList.add("hidden");
  loading.classList.remove("hidden");

  const book = document.getElementById("bookSelect").value;
  const data = await fetchData(book);

  setTimeout(() => {
    const verse = getRandomVerse(data);

    bookNameEl.textContent = verse.book;
    referenceEl.textContent = `Chapter ${verse.chapter}, Verse ${verse.verse}`;
    verseTextEl.textContent = `"${verse.text}"`;

    loading.classList.add("hidden");
    resultCard.classList.remove("hidden");
  }, 1400);
}

function copyVerse() {
  const text = `${bookNameEl.textContent} - ${referenceEl.textContent}\n${verseTextEl.textContent}`;
  navigator.clipboard.writeText(text);
}

generateBtn.addEventListener("click", generateVerse);
tryAgain.addEventListener("click", generateVerse);
copyBtn.addEventListener("click", copyVerse);
