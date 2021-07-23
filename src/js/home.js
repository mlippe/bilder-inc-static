const animationSection = document.querySelector(".hero");
const bilderLogo = animationSection.querySelector(".logo");
const textContainer = animationSection.querySelector(".text-container");
const canvas = document.getElementById("start-sequence");
const context = canvas.getContext("2d");
let innerWidth = window.innerWidth;
let innerHeight = window.innerHeight;
const frameCount = 155;
const sceneHeight = 2500 - innerHeight;
const img = new Image();
let progress = 0;
let delay = 0;
let animationInterval;

context.imageSmoothingEnabled = false;

const currentFrame = (index) =>
  `assets/start_sequence/Startanimpart3_${index
    .toString()
    .padStart(5, "0")}.jpg`;

const preloadImages = () => {
  for (let i = 1; i < frameCount; i++) {
    const img = new Image();
    img.src = currentFrame(i);
  }
};

function drawToCanvas(img) {
  const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
  // get the top left position of the image
  const x = canvas.width / 2 - (img.width / 2) * scale;
  const y = canvas.height / 2 - (img.height / 2) * scale;
  context.drawImage(img, x, y, img.width * scale, img.height * scale);
}

img.src = currentFrame(1);
canvas.width = innerWidth;
canvas.height = innerHeight;
img.onload = function () {
  drawToCanvas(img);
};

preloadImages();

//SCROLLMAGIC
const controller = new ScrollMagic.Controller();

//INIT MAIN SCENE
let scene = new ScrollMagic.Scene({
  duration: sceneHeight,
  triggerElement: animationSection,
  triggerHook: 0,
})
  .setPin(animationSection)
  .addTo(controller);

//LOGO ANIMATION

const timeline = new TimelineMax();

const logoAnim2 = TweenMax.fromTo(
  bilderLogo,
  { opacity: 1 },
  { opacity: 0, duration: 2 }
);

const headlineAnim = TweenMax.fromTo(
  textContainer,
  { y: innerHeight / 2, opacity: 0 },
  { y: 0, opacity: 1, duration: 2, delay: 1 }
);

timeline.add(logoAnim2).add(headlineAnim);
timeline.progress(0.3);

let scene2 = new ScrollMagic.Scene({
  duration: sceneHeight - innerHeight / 4,
  triggerElement: animationSection,
  triggerHook: 0,
  offset: innerHeight / 4,
})
  .setTween(timeline)
  .addTo(controller);

//Video Animation

const updateImage = (index) => {
  img.src = currentFrame(index);
  drawToCanvas(img);
};

function resizeListener() {
  innerWidth = window.innerWidth;
  innerHeight = window.innerHeight;
  setTimeout(() => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    drawToCanvas(img);
    scene.update();
    scene2.update();
  }, 200);
}

function initAnimation() {
  resizeListener();
  window.addEventListener("resize", resizeListener);

  scene.on("update", (e) => {
    progress = e.scrollPos / (sceneHeight * 0.9);
    console.log("progress", progress);
  });

  animationInterval = setInterval(() => {
    delay += (progress - delay) * 0.05;
    //console.log("delay", delay);

    const frameIndex = Math.min(frameCount - 1, Math.ceil(delay * frameCount));

    //console.log("frameIndex", frameIndex);
    requestAnimationFrame(() => updateImage(frameIndex + 1));
  }, 33.3);
}

function resetScene() {
  window.removeEventListener("resize", resizeListener);

  scene.off("update");

  clearInterval(animationInterval);
  delay = 1;
}

// Stop interval if animation is out of viewport

let callback = (entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      resizeListener();
      initAnimation();
      animationSection.classList.add("inview");
    } else {
      resetScene();
      animationSection.classList.remove("inview");
    }
  });
};

let animationRunObserver = new IntersectionObserver(callback, {
  rootMargin: "-10px",
  threshold: 0,
});

animationRunObserver.observe(animationSection);

document.addEventListener("DOMContentLoaded", function (event) {
  window.scroll(0, 0);
  setTimeout(() => {
    window.scrollTo({
      top: innerHeight / 4,
      behavior: "smooth",
    });
  }, 200);
});
// window.scroll(0, 0);
// // scroll down a bit
// document.addEventListener("DOMContentLoaded", function (event) {
//   window.scrollTo;
//   setTimeout(() => {
//     scrollTo(document.body, window.innerHeight / 3, 200);
//   }, 200);
// });

// function scrollTo(element, to, duration) {
//   var start = element.scrollTop,
//     change = to - start,
//     currentTime = 0,
//     increment = 20;

//   var animateScroll = function () {
//     currentTime += increment;
//     var val = Math.easeInOutQuad(currentTime, start, change, duration);
//     element.scrollTop = val;
//     if (currentTime < duration) {
//       setTimeout(animateScroll, increment);
//     }
//   };
//   animateScroll();
// }

// //t = current time
// //b = start value
// //c = change in value
// //d = duration
// Math.easeInOutQuad = function (t, b, c, d) {
//   t /= d / 2;
//   if (t < 1) return (c / 2) * t * t + b;
//   t--;
//   return (-c / 2) * (t * (t - 2) - 1) + b;
// };

// TOGGLE PROBLEM CARDS

const toggleButton = document.querySelector(".one-central-space .button");
const target = document.querySelector(".one-central-space .hide-wrapper");

toggleButton.addEventListener("click", function () {
  TweenLite.fromTo(
    target,
    0.5,
    { opacity: 0, y: 20, display: "none" },
    { opacity: 1, y: 0, display: "block" }
  );
  toggleButton.style.display = "none";
});
