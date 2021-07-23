const animationSection = document.querySelector(".animation-area");
const canvas = document.getElementById("explosion-sequence");
const context = canvas.getContext("2d");
let innerWidth = window.innerWidth;
let innerHeight = window.innerHeight;
const frameCount = 121;
const sceneHeight = 1000;
const img = new Image();
let progress = 0;
let delay = 0;
let lastDelay = 0;
let animationInterval;

context.imageSmoothingEnabled = false;

const currentFrame = (index) =>
  `../assets/explosion_sequence/Explosion_${index
    .toString()
    .padStart(5, "0")}.jpg`;

const preloadImages = () => {
  for (let i = 1; i < frameCount; i++) {
    const img = new Image();
    img.src = currentFrame(i);
  }
};

preloadImages();

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

//Video Animation

const updateImage = (index) => {
  img.src = currentFrame(index);
  drawToCanvas(img);
  console.log("progress");
};

function resizeListener() {
  innerWidth = window.innerWidth;
  innerHeight = window.innerHeight;
  setTimeout(() => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    drawToCanvas(img);
  }, 200);
}

function initAnimation() {
  delay = lastDelay;
  resizeListener();
  window.addEventListener("resize", resizeListener);

  scene.on("progress", (e) => {
    progress = e.progress;
    console.log(e.progress);

    //console.log("progress", progress);
  });

  animationInterval = setInterval(() => {
    delay += (progress - delay) * 0.05;
    //console.log("delay", delay);

    const frameIndex = Math.min(frameCount - 1, Math.ceil(delay * frameCount));

    //console.log("frameIndex", frameIndex);
    requestAnimationFrame(() => updateImage(frameIndex + 1));
  }, 50);
}

function resetScene() {
  window.removeEventListener("resize", resizeListener);
  scene.off("update");
  clearInterval(animationInterval);
  lastDelay = delay;
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
  rootMargin: "0px",
  threshold: 0,
});

animationRunObserver.observe(animationSection);
