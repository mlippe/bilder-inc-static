// window.addEventListener("scroll", (event) => {
//   let scroll = this.scrollY;
//   let navbar = document.querySelector(".navbar");

//   if (scroll > 300) {
//     navbar.classList.add("out-of-view");
//   } else {
//     navbar.classList.remove("out-of-view");
//   }
// });

let lastScrollTop = 0;
let navbar = document.querySelector(".navbar");

window.addEventListener(
  "scroll",
  function (event) {
    let st = window.pageYOffset || document.documentElement.scrollTop;
    if (st > lastScrollTop) {
      console.log("st", st);
      if (st > 300) {
        navbar.classList.add("out-of-view");
        navbar.classList.remove("mouse-trigger");
      } else {
        navbar.classList.remove("out-of-view");
      }
    } else {
      navbar.classList.remove("out-of-view");
    }
    lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
  },
  false
);

navbar.addEventListener("mouseenter", function () {
  if (navbar.classList.contains("out-of-view")) {
    navbar.classList.remove("out-of-view");
    navbar.classList.add("mouse-trigger");
  }
});
