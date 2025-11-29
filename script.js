// PORTFOLIO FILTERING
document.addEventListener("DOMContentLoaded", () => {
  const filterButtons = document.querySelectorAll(".filter-bar button");
  const items = document.querySelectorAll(".gallery .item");

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const f = btn.getAttribute("data-filter");

      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      items.forEach((i) => {
        if (f === "all" || i.classList.contains(f)) {
          i.style.display = "block";
        } else {
          i.style.display = "none";
        }
      });
    });
  });

  // CONTACT FORM → GOOGLE SHEETS
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    const statusEl = document.getElementById("formStatus");

    const scriptURL = "https://script.google.com/macros/s/AKfycbx7lEy8cAYRNWgYkN_NHIOHRjlu1BRg9ZQZUcSmT3TUOswrB3NPh9zLR8T7n0VGqsEN/exec"; // <- yahan apna URL daal

    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      statusEl.textContent = "Sending...";

      fetch(scriptURL, {
        method: "POST",
        body: new FormData(contactForm),
      })
        .then((response) => {
          statusEl.textContent = "Message sent successfully!";
          contactForm.reset();
        })
        .catch((error) => {
          console.error("Error!", error.message);
          statusEl.textContent = "Something went wrong. Try again.";
        });
    });
  }
});

// LIGHTBOX FUNCTIONS (global for onclick usage)
function openLightbox(src) {
  const lightbox = document.getElementById("lightbox");
  const v = document.getElementById("videoPlayer");
  lightbox.style.display = "flex";
  v.src = src;
  v.play();
}

function closeLightbox() {
  const lightbox = document.getElementById("lightbox");
  const player = document.getElementById("videoPlayer");

  lightbox.style.display = "none";
  player.pause();
  player.src = "";
}
