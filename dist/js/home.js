const animationSection = document.querySelector(".hero");
const bilderLogo = animationSection.querySelector(".intro h1");
const canvas = document.getElementById("start-sequence");
const context = canvas.getContext("2d");
const frameCount = 121;
const sceneHeight = 3000 - window.innerHeight;
const img = new Image();
let progress = 0;
let delay = 0;
let animationInterval;

context.imageSmoothingEnabled = false;

const currentFrame = (index) =>
  `assets/start_sequence/StartAnimation1_${index
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
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
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
  .addIndicators()
  .setPin(animationSection)
  .addTo(controller);

//LOGO ANIMATION
const logoAnim = TweenMax.fromTo(bilderLogo, 3, { opacity: 1 }, { opacity: 0 });

let scene2 = new ScrollMagic.Scene({
  duration: sceneHeight,
  triggerElement: animationSection,
  triggerHook: 0,
})
  .setTween(logoAnim)
  .addTo(controller);

//Video Animation

const updateImage = (index) => {
  img.src = currentFrame(index);
  drawToCanvas(img);

  window.addEventListener("resize", function () {
    setTimeout(() => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawToCanvas(img);
    }, 500);
  });
};

scene.on("update", (e) => {
  progress = e.scrollPos / (sceneHeight * 0.9);
  //console.log("progress", progress);
});

function initAnimation() {
  animationInterval = setInterval(() => {
    delay += (progress - delay) * 0.05;
    console.log("delay", delay);

    const frameIndex = Math.min(frameCount - 1, Math.ceil(delay * frameCount));

    //console.log("frameIndex", frameIndex);
    requestAnimationFrame(() => updateImage(frameIndex + 1));
  }, 33.3);
}

// Stop interval if animation is out of viewport

let callback = (entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      initAnimation();
    } else {
      clearInterval(animationInterval);
      delay = 1;
    }
  });
};

let animationRunObserver = new IntersectionObserver(callback, {
  rootMargin: "-10px",
  threshold: 0,
});

animationRunObserver.observe(animationSection);

window.scroll(0, 0);
// scroll down a bit
document.addEventListener("DOMContentLoaded", function (event) {
  window.scrollTo;
  setTimeout(() => {
    scrollTo(document.body, 300, 500);
  }, 200);
});

function scrollTo(element, to, duration) {
  var start = element.scrollTop,
    change = to - start,
    currentTime = 0,
    increment = 20;

  var animateScroll = function () {
    currentTime += increment;
    var val = Math.easeInOutQuad(currentTime, start, change, duration);
    element.scrollTop = val;
    if (currentTime < duration) {
      setTimeout(animateScroll, increment);
    }
  };
  animateScroll();
}

//t = current time
//b = start value
//c = change in value
//d = duration
Math.easeInOutQuad = function (t, b, c, d) {
  t /= d / 2;
  if (t < 1) return (c / 2) * t * t + b;
  t--;
  return (-c / 2) * (t * (t - 2) - 1) + b;
};
