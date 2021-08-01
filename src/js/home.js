document.addEventListener("DOMContentLoaded", function () {
  const animationSection = document.querySelector(".hero");
  const bilderLogo = animationSection.querySelector(".logo");
  const textContainer = animationSection.querySelector(".text-container");
  const canvas = document.getElementById("start-sequence");
  const context = canvas.getContext("2d");
  const frameCount = 155;
  const sceneHeight = 2500 - innerHeight;
  const img = new Image();
  let scale;
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

  preloadImages();

  function drawToCanvas(img) {
    scale = Math.max(canvas.width / img.width, canvas.height / img.height);

    // get the top left position of the image
    const x = canvas.width / 2 - (img.width / 2) * scale;
    const y = canvas.height / 2 - (img.height / 2) * scale;
    context.drawImage(img, x, y, img.width * scale, img.height * scale);
  }

  img.src = currentFrame(1);
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
    setTimeout(() => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawToCanvas(img);
    }, 200);
  }

  function initAnimation() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    window.addEventListener("resize", resizeListener);

    scene.on("progress", (e) => {
      progress = e.progress;
      console.log("progress", progress);
    });

    animationInterval = setInterval(() => {
      delay += (progress - delay) * 0.05;
      //console.log("delay", delay);

      const frameIndex = Math.min(
        frameCount - 1,
        Math.ceil(delay * frameCount)
      );

      //console.log("frameIndex", frameIndex);
      requestAnimationFrame(() => updateImage(frameIndex + 1));
    }, 33.3);
  }

  function resetScene() {
    scene.off("progress");
    window.removeEventListener("resize", resizeListener);
    clearInterval(animationInterval);
    delay = 1;
  }

  // Stop interval if animation is out of viewport

  let callback = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
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

  window.scroll(0, 0);
  setTimeout(() => {
    window.scrollTo({
      top: window.innerHeight / 4,
      behavior: "smooth",
    });
  }, 200);

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
});
