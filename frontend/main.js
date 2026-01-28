/* ===== IMAGE PRELOADER ===== */

const preloadImages = [
  "1st.jpeg",
  "2nd.jpeg",
  "3rd.jpeg"
];

preloadImages.forEach(src => {
  const img = new Image();
  img.src = src;
});
/* ===== DARK MODE ===== */

var icon = document.getElementById("icon");

icon.onclick = function(){
  document.body.classList.toggle("dark-theme");

  if(document.body.classList.contains("dark-theme")){
    icon.src = "sun.png";
  }else{
    icon.src = "moon.png";
  }
}

/* ===== 3 IMAGE SLIDER ===== */
const track = document.querySelector(".carousel-track");
const slides = document.querySelectorAll(".slide");

let index = 1; // first real image
let slideWidth = slides[0].clientWidth;

// Initial position
track.style.transform = `translateX(-${index * slideWidth}px)`;

/* ---------- AUTO SLIDE ---------- */
function moveSlider(){
  index++;
  track.style.transition = "transform 0.5s ease-in-out";
  track.style.transform = `translateX(-${index * slideWidth}px)`;
}

let autoSlide = setInterval(moveSlider, 3000);

/* ---------- INFINITE LOOP FIX ---------- */
track.addEventListener("transitionend", () => {

  if(slides[index].classList.contains("clone")){
    track.style.transition = "none";

    if(index === slides.length - 1){
      index = 1; // jump to first real
    }

    if(index === 0){
      index = slides.length - 2; // jump to last real
    }

    track.style.transform = `translateX(-${index * slideWidth}px)`;

    // Force reflow to avoid flicker/delay
    track.offsetHeight; 
    track.style.transition = "transform 0.5s ease-in-out";
  }
});

/* ---------- TOUCH SWIPE ---------- */

let startX = 0;
let endX = 0;

track.addEventListener("touchstart", (e)=>{
  clearInterval(autoSlide);
  startX = e.touches[0].clientX;
});

track.addEventListener("touchmove", (e)=>{
  endX = e.touches[0].clientX;
});

track.addEventListener("touchend", ()=>{
  let diff = startX - endX;

  if(diff > 40) index++;   // swipe left
  if(diff < -40) index--;  // swipe right

  track.style.transition = "transform 0.5s ease-in-out";
  track.style.transform = `translateX(-${index * slideWidth}px)`;

  autoSlide = setInterval(moveSlider, 4000);
});

/* ---------- RESIZE ---------- */
window.addEventListener("resize", ()=>{
  slideWidth = slides[0].clientWidth;
  track.style.transition = "none";
  track.style.transform = `translateX(-${index * slideWidth}px)`;
});
