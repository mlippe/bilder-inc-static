document.addEventListener("DOMContentLoaded", function () {
  function debounce(method, delay) {
    clearTimeout(method._tId);
    method._tId = setTimeout(function () {
      method();
    }, delay);
  }

  window.addEventListener("scroll", function () {
    debounce(triggerNavbar, 100);
  });

  let lastScrollTop = 0;
  const navbar = document.querySelector(".navbar");

  function triggerNavbar() {
    let st = window.pageYOffset || document.documentElement.scrollTop;
    if (st > lastScrollTop) {
      if (st > window.innerHeight / 4 + 10) {
        navbar.classList.add("out-of-view");
        navbar.classList.remove("mouse-trigger");
      } else {
        navbar.classList.remove("out-of-view");
      }
    } else {
      navbar.classList.remove("out-of-view");
    }
    lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
  }

  navbar.addEventListener("mouseenter", function () {
    if (navbar.classList.contains("out-of-view")) {
      navbar.classList.remove("out-of-view");
      navbar.classList.add("mouse-trigger");
    }
  });

  navbar.addEventListener("click", function () {
    if (navbar.classList.contains("out-of-view")) {
      navbar.classList.remove("out-of-view");
      navbar.classList.add("mouse-trigger");
    }
  });

  const navToggle = document.querySelector(".navbar .menu-toggle");
  const navTarget = document.querySelector(".menu-mobile");
  const closeBtn = document.querySelector(".menu-mobile .close");

  navTarget.style.display = "none";

  navToggle.addEventListener("click", function () {
    if (navTarget.classList.contains("hidden")) {
      TweenLite.fromTo(
        navTarget,
        0.5,
        { opacity: 0, y: -20, display: "none" },
        { opacity: 1, y: 0, display: "flex" }
      );

      navbar.classList.add("override");
      navTarget.classList.remove("hidden");
    } else {
      TweenLite.fromTo(
        navTarget,
        0.5,
        { opacity: 1, y: 0, display: "flex" },
        { opacity: 0, y: -20, display: "none" }
      );
      navbar.classList.remove("override");
      navTarget.classList.add("hidden");
    }
  });

  closeBtn.addEventListener("click", function () {
    if (!navTarget.classList.contains("hidden")) {
      TweenLite.fromTo(
        navTarget,
        0.5,
        { opacity: 1, y: 0, display: "flex" },
        { opacity: 0, y: -20, display: "none" }
      );
      navbar.classList.remove("override");
      navTarget.classList.add("hidden");
    }
  });
});
