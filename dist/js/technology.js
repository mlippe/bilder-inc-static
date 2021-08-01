document.addEventListener("DOMContentLoaded", function () {
  const animationSection = document.querySelectorAll(".animation-area");
  let animationContainer;
  let canvas;
  let context;
  let frameCount;
  let sizingImg;
  let sceneHeight;
  let img;
  let progress = 0;
  let delay = 0;
  let lastDelay = 0;
  let animationInterval;
  let currentFrame;
  const controller = new ScrollMagic.Controller();
  const scene = new ScrollMagic.Scene();

  function setContent(arr) {
    if (arr.includes("box")) {
      animationContainer = document.querySelector(".animation-area.box");
      canvas = document.getElementById("explosion-sequence");
      context = canvas.getContext("2d");
      sizingImg = animationContainer.querySelector("img");

      frameCount = 121;
      sceneHeight = window.innerHeight / 2;
      img = new Image();

      currentFrame = (index) =>
        `../assets/explosion_sequence/Explosion_${index
          .toString()
          .padStart(5, "0")}.jpg`;

      scene.duration(sceneHeight);
      scene.triggerElement(animationContainer);
    } else if (arr.includes("book")) {
      animationContainer = document.querySelector(".animation-area.book");
      canvas = document.getElementById("book-sequence");
      context = canvas.getContext("2d");
      sizingImg = animationContainer.querySelector("img");

      frameCount = 80;
      sceneHeight = window.innerHeight / 2;
      img = new Image();

      currentFrame = (index) =>
        `../assets/book_sequence/bookintrosquare_${index
          .toString()
          .padStart(5, "0")}.jpg`;

      scene.duration(sceneHeight);
      scene.triggerElement(animationContainer);
    } else if (arr.includes("projector")) {
      animationContainer = document.querySelector(".animation-area.projector");
      canvas = document.getElementById("projector-sequence");
      context = canvas.getContext("2d");
      sizingImg = animationContainer.querySelector("img");

      frameCount = 80;
      sceneHeight = window.innerHeight / 2;
      img = new Image();

      currentFrame = (index) =>
        `../assets/projector_sequence/projectorintrosquare_00001_${index
          .toString()
          .padStart(5, "0")}.jpg`;

      scene.duration(sceneHeight);
      scene.triggerElement(animationContainer);
    } else if (arr.includes("scanner")) {
      animationContainer = document.querySelector(".animation-area.scanner");
      canvas = document.getElementById("scanner-sequence");
      context = canvas.getContext("2d");
      sizingImg = animationContainer.querySelector("img");

      frameCount = 80;
      sceneHeight = window.innerHeight / 2;
      img = new Image();

      currentFrame = (index) =>
        `../assets/scanner_sequence/scannerintrosquare_${index
          .toString()
          .padStart(5, "0")}.jpg`;

      scene.duration(sceneHeight);
      scene.triggerElement(animationContainer);
    }
  }

  const preloadImages = () => {
    for (let i = 1; i < frameCount; i++) {
      const img = new Image();
      img.src = currentFrame(i);
    }
  };

  function drawToCanvas(img) {
    const scale = Math.max(
      canvas.width / img.width,
      canvas.height / img.height
    );
    // get the top left position of the image
    const x = canvas.width / 2 - (img.width / 2) * scale;
    const y = canvas.height / 2 - (img.height / 2) * scale;
    context.drawImage(img, x, y, img.width * scale, img.height * scale);
  }

  const updateImage = (index) => {
    img.src = currentFrame(index);
    drawToCanvas(img);
  };

  function initAnimation() {
    preloadImages();
    scene.addTo(controller);
    scene.duration(sizingImg.height);

    //delay = lastDelay;
    context.imageSmoothingEnabled = false;
    canvas.width = sizingImg.width * 2;
    canvas.height = sizingImg.height * 2;
    // canvas.width = window.innerWidth;
    // canvas.height = window.innerHeight;

    img.src = currentFrame(1);
    img.onload = function () {
      drawToCanvas(img);
    };

    scene.on("progress", (e) => {
      progress = e.progress;
    });

    console.log(scene);
    animationInterval = setInterval(() => {
      delay += (progress - delay) * 0.05;
      //console.log("delay", delay);

      const frameIndex = Math.min(
        frameCount - 1,
        Math.ceil(delay * frameCount)
      );

      //console.log("frameIndex", frameIndex);
      requestAnimationFrame(() => updateImage(frameIndex + 1));
    }, 50);
  }

  function resetScene() {
    scene.destroy();
    clearInterval(animationInterval);
    lastDelay = delay;
  }

  // Stop interval if animation is out of viewport

  let callback = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setContent([...entry.target.classList]);
        //console.log(entry);
        setTimeout(() => {
          initAnimation();
        }, 50);
      } else {
        resetScene();
      }
    });
  };

  let animationRunObserver = new IntersectionObserver(callback, {
    rootMargin: "0px",
    threshold: 0,
  });

  animationSection.forEach((section) => {
    animationRunObserver.observe(section);
  });
});
