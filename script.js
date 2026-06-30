const slides = document.querySelector(".slider-inner");
const slider = document.querySelector(".slider");
const dots = document.querySelectorAll(".dot");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");
let current = 0;
let autoSlide;
let touchStartX = 0;
let touchStartY = 0;

function changeSlide(index) {
  if (!slides || !dots.length) {
    return;
  }

  if (index < 0) index = dots.length - 1;
  if (index >= dots.length) index = 0;

  slides.style.transform = `translateX(-${index * 100}%)`;

  dots[current]?.classList.remove("active");
  dots[index]?.classList.add("active");

  current = index;
  resetAuto();
}

function startAuto() {
  if (!slides || !dots.length) {
    return;
  }

  autoSlide = setInterval(() => {
    changeSlide(current + 1);
  }, 4000);
}

function resetAuto() {
  clearInterval(autoSlide);
  startAuto();
}

if (nextBtn && prevBtn && dots.length) {
  nextBtn.addEventListener("click", () => changeSlide(current + 1));
  prevBtn.addEventListener("click", () => changeSlide(current - 1));

  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => changeSlide(i));
  });

  startAuto();
}

if (slider && dots.length) {
  slider.addEventListener(
    "touchstart",
    (event) => {
      const touch = event.touches[0];
      if (!touch) {
        return;
      }

      touchStartX = touch.clientX;
      touchStartY = touch.clientY;
    },
    { passive: true },
  );

  slider.addEventListener(
    "touchend",
    (event) => {
      const touch = event.changedTouches[0];
      if (!touch) {
        return;
      }

      const deltaX = touch.clientX - touchStartX;
      const deltaY = touch.clientY - touchStartY;
      const absX = Math.abs(deltaX);
      const absY = Math.abs(deltaY);

      if (absX < 45 || absX <= absY) {
        return;
      }

      if (deltaX < 0) {
        changeSlide(current + 1);
      } else {
        changeSlide(current - 1);
      }
    },
    { passive: true },
  );
}

const ham = document.querySelector(".hamburger");
const menu = document.querySelector(".hamburger-content");

if (ham && menu) {
  ham.addEventListener("click", () => {
    ham.classList.toggle("active");
    menu.classList.toggle("active");
  });

  document.querySelectorAll(".hamburger-content a").forEach((link) => {
    link.addEventListener("click", () => {
      ham.classList.remove("active");
      menu.classList.remove("active");
    });
  });
}

const ageModal = document.getElementById("ageModal");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");

window.addEventListener("load", () => {
  if (!ageModal) {
    return;
  }

  if (localStorage.getItem("ageConfirmed") !== "true") {
    ageModal.style.display = "flex";
  } else {
    ageModal.style.display = "none";
  }
});

if (yesBtn && ageModal) {
  yesBtn.addEventListener("click", () => {
    localStorage.setItem("ageConfirmed", "true");
    ageModal.style.display = "none";
  });
}

if (noBtn) {
  noBtn.addEventListener("click", () => {
    alert("Zugriff verweigert. Diese Seite ist ausschliesslich fuer Personen ab 18 Jahren.");
    window.close();
    window.location.href = "https://dezig.de/";
  });
}

const items = document.querySelectorAll(".review-item");
const next = document.querySelector(".next-rev");
const prev = document.querySelector(".prev-rev");
let index = 0;

function showSlide(i) {
  if (!items.length) {
    return;
  }

  items.forEach((el) => el.classList.remove("active"));
  items[i]?.classList.add("active");
}

if (next && prev && items.length) {
  next.addEventListener("click", () => {
    index++;
    if (index >= items.length) index = 0;
    showSlide(index);
  });

  prev.addEventListener("click", () => {
    index--;
    if (index < 0) index = items.length - 1;
    showSlide(index);
  });
}

const btn = document.querySelector(".desc button");
const desc = document.querySelector(".desc");

if (btn && desc) {
  btn.addEventListener("click", () => {
    desc.classList.toggle("open");
    btn.textContent = desc.classList.contains("open")
      ? "Weniger anzeigen"
      : "Mehr anzeigen";
  });
}

const city = document.getElementById("city");
const cont = document.querySelectorAll(".foot-cont-three a");

function toggleCont() {
  if (!city) {
    return;
  }

  city.classList.toggle("active");
  city.setAttribute(
    "aria-expanded",
    city.classList.contains("active") ? "true" : "false",
  );
  Array.from(cont).forEach((el) => {
    el.style.display = el.style.display === "block" ? "none" : "block";
  });
}

if (city) {
  city.addEventListener("click", toggleCont);
}

const warnBar = document.querySelector(".warn");
const siteHeader = document.querySelector(".site-header");

function syncStickyHeader() {
  const scrollY = window.scrollY || window.pageYOffset;

  if (warnBar) {
    warnBar.classList.toggle("is-hidden", scrollY > 24);
  }

  if (siteHeader) {
    siteHeader.classList.toggle("scrolled", scrollY > 8);
  }
}

window.addEventListener("scroll", syncStickyHeader, { passive: true });
window.addEventListener("load", syncStickyHeader);
syncStickyHeader();

const yearSpan = document.querySelector("#year");
if (yearSpan) {
  yearSpan.innerText = new Date().getFullYear();
}
