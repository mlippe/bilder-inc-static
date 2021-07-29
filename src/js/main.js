document.addEventListener("DOMContentLoaded", function () {
  let options = {
    root: null, // relative to document viewport
    rootMargin: "0% 0% -20% 0%", // margin around root
    threshold: 0, // visible amount of item shown in relation to root
  };

  const initScrollAnimation = (animationItems) => {
    let scrollObserver = new IntersectionObserver(onChange, options);

    function onChange(changes, scrollObserver) {
      changes.forEach((change) => {
        if (change.intersectionRatio > 0) {
          if (change.isIntersecting) {
            change.target.classList.add("in-viewport");
            change.target.addEventListener(
              "transitionend",
              function _listener() {
                if (event.propertyName == "transform") {
                  change.target.classList.add("scroll-animation-finished");
                  change.target.removeEventListener("transitionend", _listener);
                }
              }
            );
          }
        }
      });
    }

    animationItems.forEach((item) => scrollObserver.observe(item));
  };

  let animationItems = document.querySelectorAll(".scroll-animation");
  initScrollAnimation(animationItems);
});
