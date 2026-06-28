// check if user has already selected a theme
const savedTheme = localStorage.getItem("theme");

// if yes, apply it immediately before header loads
if (savedTheme) {
    document.documentElement.setAttribute("data-theme", savedTheme);
}


function initThemeToggle() {

    // find the toggle button and icon in the DOM  
    const themeToggle = document.getElementById("theme-toggle");
    const themeThumb = document.querySelector(".theme-thumb");


    // update the icon based on the current theme
    function updateToggle(theme) {
        if (theme === "dark") {
            themeToggle.checked = true;
            themeThumb.textContent = "🌙";
        } else {
            themeToggle.checked = false;
            themeThumb.textContent = "☀️";
        }
    }
    // apply correct state on load (if no theme is saved -> "light" as default)
    updateToggle(savedTheme || "light");

    // listen for change on the checkbox
    themeToggle.addEventListener("change", () => {
        const next = themeToggle.checked ? "dark" : "light";
        document.documentElement.setAttribute("data-theme", next);

        // save the new theme to localStorage
        localStorage.setItem("theme", next);
        updateToggle(next);
    });
}