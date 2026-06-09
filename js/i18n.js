
let currentLanguage = "en";

// Code to load language and update content
async function loadLanguage(lang) {

    currentLanguage = lang;
    document.documentElement.lang = lang;

    const response = await fetch(`lang/${lang}.json`); // load JSON
    const translation = await response.json(); // convert JSON to JavaScript -> text becomes an object

    // get all keys from the translations object
    // for each key: find matching HTML element and update its textContent
    Object.keys(translation).forEach(key => { 

        const element = document.getElementById(key);

        if (element) {
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

    if(currentLanguage === "en") {

        button.textContent = "DE",
        button.onclick = () => setLanguage("de");

    } else {

        button.textContent = "EN",
        button.onclick = () => setLanguage("en");
    
    }
}

// save selected language
const savedLanguage = localStorage.getItem("language");

        if (savedLanguage) {
            loadLanguage(savedLanguage);
        } else {
            loadLanguage(currentLanguage);
        }
