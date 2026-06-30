
let currentLanguage = "en";

// Code to load language and update content
async function loadLanguage(lang) {

  currentLanguage = lang;
  document.documentElement.lang = lang;

  const response = await fetch(`lang/${lang}.json`); // load JSON
  const translation = await response.json(); // convert JSON to JavaScript -> text becomes an object

  // find all elements with data-i18n attribute and update their textContent
  document.querySelectorAll("[data-i18n]").forEach(element => {
    const key = element.getAttribute("data-i18n");
    if (translation[key]) {
      element.textContent = translation[key];
    }
  });

  updateLanguageButton();
}

// language switch function
function setLanguage(lang) {
  localStorage.setItem("language", lang)
  document.documentElement.lang = lang;
  loadLanguage(lang);
}


//update text in language-button
function updateLanguageButton() {
  const button = document.getElementById("language-switch");

  if (!button) return;


  // reset classes
  button.classList.remove("en", "de");

  if (currentLanguage === "en") {
    button.classList.add("en");
  } else {
    button.classList.add("de");
  }

  button.onclick = () => {
    if (currentLanguage === "en") {
      setLanguage("de");
    } else {
      setLanguage("en");
    }
  };
}

// save selected language
const savedLanguage = localStorage.getItem("language");

if (savedLanguage) {
  loadLanguage(savedLanguage);
} else {
  loadLanguage(currentLanguage);
}
