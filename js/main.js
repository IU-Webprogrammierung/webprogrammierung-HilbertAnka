// ==============================
// Components (Header & Footer loading)
// ==============================

//load header component and then set language
loadComponent("header", "components/header.html").then(() => {
  //active link - highlights the current page
  const currentPage = window.location.pathname.split("/").pop();
  const links = document.querySelectorAll(".navigation-list a");

  links.forEach((link) => {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
    }
  });

  //hamburger-button
  const toggle = document.getElementById("menu-toggle");
  const navList = document.getElementById("navigation-list");

  toggle.addEventListener("click", () => {
    toggle.classList.toggle("open");
    navList.classList.toggle("open");
    toggle.setAttribute("aria-expanded", navList.classList.contains("open"));
  });

  loadLanguage(currentLanguage);
});

//load footer component
loadComponent("footer", "components/footer.html");

async function loadComponent(selector, file) {
  const response = await fetch(file);
  const html = await response.text();
  const element = document.querySelector(selector);
  element.innerHTML = html;
}

// ==============================
// Lightbox
// ==============================

// store references to lightbox elements
const lightbox = document.getElementById("lightbox");
const gallery = document.getElementById("gallery");

if (lightbox && gallery) {
  const lightboxImg = document.getElementById("lightbox-img");
  const galleryImgs = document.querySelectorAll("#gallery img");

  // track which image is currently shown
  let currentIndex = 0;

  // show image by index
  function showImage(index) {
    currentIndex = index;
    const img = galleryImgs[index];
    lightboxImg.src = img.dataset.large || img.src;
    lightboxImg.alt = img.alt;
  }

  // open lightbox when a gallery image is clicked
  document.getElementById("gallery").addEventListener("click", (e) => {
    if (e.target.tagName === "IMG") {
      // Find which image was clicked
      const clickedIndex = Array.from(galleryImgs).indexOf(e.target);
      showImage(clickedIndex);
      lightbox.showModal();
    }
  });

  // navigate to previous image
  document.querySelector(".lightbox-prev").addEventListener("click", (e) => {
    e.stopPropagation(); // prevents the lightbox from closing
    const newIndex =
      (currentIndex - 1 + galleryImgs.length) % galleryImgs.length;
    showImage(newIndex);
  });

  // navigate to next image
  document.querySelector(".lightbox-next").addEventListener("click", (e) => {
    e.stopPropagation(); // prevents the lightbox from closing
    const newIndex = (currentIndex + 1) % galleryImgs.length;
    showImage(newIndex);
  });

  // close lightbox when clicking the backdrop or close button
  lightbox.addEventListener("click", (e) => {
    if (
      e.target === lightbox ||
      e.target.classList.contains("lightbox-close")
    ) {
      lightbox.close();
    }
  });

  // keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (!lightbox.open) return; // only when lightbox is open

    if (e.key === "ArrowRight") {
      const newIndex = (currentIndex + 1) % galleryImgs.length;
      showImage(newIndex);
    }

    if (e.key === "ArrowLeft") {
      const newIndex =
        (currentIndex - 1 + galleryImgs.length) % galleryImgs.length;
      showImage(newIndex);
    }
  });
}
