// ===============================================================
// Components (Header & Footer loading)
// ===============================================================

// load header component and then set language
loadComponent("header", "components/header.html").then(() => {
  //active link - highlights the current page
  const currentPage = window.location.pathname.split("/").pop();
  const links = document.querySelectorAll(".navigation-list a");

  // pages that belong to the gallery section
  const galleryPages = [
    "practicalworks.html",
    "graduationproject.html",
    "sleepingbeauty.html",
    "architecture.html",
    "translucent.html",
    "fauxfinishes.html",
  ];

  links.forEach((link) => {
    const linkHref = link.getAttribute("href");

    // highlight exact match
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
    }

    // highlight when on a gallery subpage
    if (linkHref === "gallery.html" && galleryPages.includes(currentPage)) {
      link.classList.add("active");
    }
  });

  // dropdown-Toggle for gallery-navigation (tablet)
  const dropdownToggle = document.querySelector(".dropdown-toggle");
  const dropdownGallery = document.querySelector(".dropdown-gallery");

  dropdownToggle.addEventListener("click", (e) => {
    e.stopPropagation();

    const isOpen = dropdownGallery.classList.toggle("open"); //(true = now open, false = now closed)
    dropdownToggle.setAttribute("aria-expanded", isOpen); //keeps aria-expanded state in sync for screen readers
  });

  // close dropdown
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".has-dropdown-gallery")) {
      dropdownGallery.classList.remove("open");
      dropdownToggle.setAttribute("aria-expanded", "false");
    }
  });



  // hamburger-button
  const toggle = document.getElementById("menu-toggle");
  const navList = document.getElementById("navigation-list");

  toggle.addEventListener("click", () => {
    toggle.classList.toggle("open");
    navList.classList.toggle("open");
    toggle.setAttribute("aria-expanded", navList.classList.contains("open"));
  });

  initThemeToggle();

  loadLanguage(currentLanguage);
});

// load footer component
loadComponent("footer", "components/footer.html").then(() => {
  
  // back-to-top Button
  const backToTopButton = document.getElementById("back-to-top");

  // show back-to-top button after scrolling down 400px, hide when near the top again
  window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
      backToTopButton.classList.add("visible");
    } else {
      backToTopButton.classList.remove("visible");
    }
  });

  // scroll back to top on click
  backToTopButton.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

async function loadComponent(selector, file) {
  const response = await fetch(file);
  const html = await response.text();
  const element = document.querySelector(selector);
  element.innerHTML = html;
}

// ===============================================================
// Lightbox
// ===============================================================

// store references to lightbox elements
const lightbox = document.getElementById("lightbox");
const gallery = document.querySelector("#gallery, #studio-insights-gallery");

if (lightbox && gallery) {
  const lightboxImg = document.getElementById("lightbox-img");
  const galleryImgs = gallery.querySelectorAll("img");

  // track which image is currently shown
  let currentIndex = 0;

  // show image by index
  function showImage(index) {
    currentIndex = index;
    const img = galleryImgs[index];
    lightboxImg.src = img.dataset.large || img.src;
    lightboxImg.alt = img.alt;

    // Show credit if available
    const credit = document.getElementById("lightbox-credit");
    credit.textContent = img.dataset.credit || "";
  }

  // open lightbox when a gallery image is clicked
  gallery.addEventListener("click", (e) => {
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

// ===============================================================
// Video Lightbox
// ===============================================================

// store references to lightbox elements
const videoLightbox = document.getElementById("video-lightbox");
const videoIframe = document.getElementById("video-iframe");
const videoOpen = document.getElementById("video-open");
const VIDEO_URL = "https://www.youtube-nocookie.com/embed/8BNDVy-Xemw";

// open video lightbox
if (videoOpen && videoLightbox && videoIframe) {
  videoOpen.addEventListener("click", () => {
    videoIframe.src = VIDEO_URL;
    videoLightbox.showModal();
  });


  // close video lightbox
  videoLightbox.addEventListener("click", (e) => {
    if (
      e.target === videoLightbox ||
      e.target.classList.contains("video-close")
    ) {
      videoIframe.src = ""; // video stop when lightbox closed
      videoLightbox.close();
    }
  });
}


// ===============================================================
// Scroll Animation
// ===============================================================



// Scale gallery link based on scroll position (small -> big -> small)
const galleryTitleWrapper = document.querySelector(".gallery-nav");

function updateGalleryTitleScale() {
  if (!galleryTitleWrapper) return;

  const rect = galleryTitleWrapper.getBoundingClientRect();
  const viewportCenter = window.innerHeight / 2;
  const elementCenter = rect.top + rect.height / 2;

  const distance = Math.abs(viewportCenter - elementCenter);
  const maxDistance = window.innerHeight / 2 + rect.height / 2;
  const progress = Math.min(distance / maxDistance, 1);

  const minScale = 0.7;
  const maxScale = 1.15;
  const scale = maxScale - progress * (maxScale - minScale);

  galleryTitleWrapper.style.transform = `scale(${scale})`;
}

window.addEventListener("scroll", updateGalleryTitleScale);
window.addEventListener("resize", updateGalleryTitleScale);
updateGalleryTitleScale();




// Scroll reveal animation for subnav items
const revealElements = document.querySelectorAll(".subnav li");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        // stop observing once revealed, animation only runs once
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.3, // triggers once 30% of the element is visible
    rootMargin: "0px 0px -100px 0px",
  }
);

revealElements.forEach((el) => revealObserver.observe(el));