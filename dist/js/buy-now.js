const optionsOption = document.querySelectorAll(
  ".buy-unit.option .option-item"
);

const optionsColor = document.querySelectorAll(".buy-unit.color .option-item");

optionsOption.forEach(function (item) {
  item.addEventListener("click", function () {
    if (!this.classList.contains("active")) {
      optionsOption.forEach(function (item) {
        item.classList.remove("active");
      });
      this.classList.add("active");
    }
  });
});

optionsColor.forEach(function (item) {
  item.addEventListener("click", function () {
    if (!this.classList.contains("active")) {
      optionsColor.forEach(function (item) {
        item.classList.remove("active");
      });
      this.classList.add("active");
    }
  });
});

const btn = document.querySelector(".buy-unit.last .button");
const notice = document.querySelector(".buy-unit.last .notice");

btn.addEventListener("click", function () {
  if (!btn.classList.contains("disabled")) {
    btn.classList.add("disabled");

    setTimeout(() => {
      TweenLite.fromTo(
        notice,
        1,
        { opacity: 0, y: -60, maxHeight: 0, display: "none" },
        { opacity: 1, y: 0, maxHeight: 1000, display: "block" }
      );
    }, 500);
  }
});

const swiper = new Swiper(".swiper-container", {
  // Optional parameters
  direction: "horizontal",
  loop: true,

  // If we need pagination
  pagination: {
    el: ".swiper-pagination",
  },

  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});
