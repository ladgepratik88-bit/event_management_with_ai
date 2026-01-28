var icon = document.getElementById("icon");
icon.onclick=function(){
  document.body.classList.toggle("dark-theme");
  if(document.body.classList.contains("dark-theme")){
    icon.src="sun.png";
  }
  else{
    icon.src="moon.png"
  }
}
document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".image-slide");
  const prevBtn = document.querySelector(".image-btn.prev");
  const nextBtn = document.querySelector(".image-btn.next");
  const dots = document.querySelectorAll(".dot");
  let currentIndex = 0;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === index);
      dots[i].classList.toggle("active", i === index);
    });
    currentIndex = index;
  }

  function nextSlide() {
    let newIndex = (currentIndex + 1) % slides.length;
    showSlide(newIndex);
  }

  function prevSlide() {
    let newIndex = (currentIndex - 1 + slides.length) % slides.length;
    showSlide(newIndex);
  }

  nextBtn.addEventListener("click", nextSlide);
  prevBtn.addEventListener("click", prevSlide);

  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => showSlide(i));
  });

  // Auto-slide every 7 seconds
  setInterval(nextSlide, 7000);
});
