loadComponent("header", "components/header.html").then(() =>
  loadLanguage(currentLanguage),
);

loadComponent("footer", "components/footer.html");

async function loadComponent(id, file) {
  const response = await fetch(file);
  const html = await response.text();
  const element = document.querySelector(id);
  element.innerHTML = html;
}
