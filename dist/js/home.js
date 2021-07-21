const hero = document.querySelector(".intro")
const text = document.querySelector(".intro h1")
const canvas = document.getElementById("start-sequence");
const context = canvas.getContext("2d");

const frameCount = 121;
const sceneHeight = 3000;

const currentFrame = index => (
  `assets/start_sequence/StartAnimation1_${index.toString().padStart(5, '0')}.jpg`
)

const preloadImages = () => {
  for (let i = 1; i < frameCount; i++) {
    const img = new Image();
    img.src = currentFrame(i);
  }
};

const img = new Image()
img.src = currentFrame(1);
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;
img.onload=function(){
  context.drawImage(img, 0, 0, window.innerWidth, window.innerHeight);
}

preloadImages()

//SCROLLMAGIC
const controller = new ScrollMagic.Controller();

//Scenes
let scene = new ScrollMagic.Scene({
  duration: sceneHeight,
  triggerElement: intro,
  triggerHook: 0
})
  .addIndicators()
  .setPin(intro)
  .addTo(controller);

//Text Animation
const textAnim = TweenMax.fromTo(text, 3, { opacity: 1 }, { opacity: 0 });

let scene2 = new ScrollMagic.Scene({
  duration: sceneHeight,
  triggerElement: intro,
  triggerHook: 0
})
  .setTween(textAnim)
  .addTo(controller);

//Video Animation
let progress = 0;
let delay = 0;

scene.on("update", e => {
  progress = e.scrollPos / (sceneHeight * 0.9) ;
  console.log("progress", progress);
});


setInterval(() => {
  delay += (progress - delay) * 0.05;
  console.log("delay", delay);

  const frameIndex = Math.min(
    frameCount,
    Math.ceil(delay * frameCount)
  );
  
  console.log("frameIndex", frameIndex);
  requestAnimationFrame(() => updateImage(frameIndex + 1))
}, 33.3);



const updateImage = index => {
  img.src = currentFrame(index);
  context.drawImage(img, 0, 0, window.innerWidth, window.innerHeight);
}



