document.addEventListener("DOMContentLoaded", () => {

  var swiper = new Swiper(".mySwiper", {
    loop: true,
    spaceBetween: 10,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    breakpoints: {
      0:    { slidesPerView: 1 },
      768:  { slidesPerView: 2 },
      1024: { slidesPerView: 3 },
    },
  });

  var swiper1 = new Swiper(".mySwiper1", {
    loop: true,
    spaceBetween: 30,
    pagination: {
      el: ".swiper1-pagination",
      clickable: true,
  dynamicBullets: true,
    },
    autoplay: {
      delay: 7000,
      disableOnInteraction: false,
    },
    observer: true,
    observeParents: true,
    resizeObserver: true,
    breakpoints: {
      0:    { slidesPerView: 1 },
      768:  { slidesPerView: 2 },
      1024: { slidesPerView: 3 },
    },
  });

});