let images = [{
    url: "./images/img1.jpg",
    city: "Rostov-on-Don LCD admiral",
    apartmentarea: "81 m2",
    repairtime: "3.5 months",
    repaircost: "81 m2"
  }, {
    url: "./images/img2.jpg",
    city: "Sochi Thieves",
    apartmentarea: "105 m2",
    repairtime: "4 months",
    repaircost: "Upon request"
  }, {
    url: "./images/img3.jpg",
    city: "Rostov-on-Don Patriotic",
    apartmentarea: "93 m2",
    repairtime: "3 months",
    repaircost: "Upon request"
  }];

function initSlider(options) {
  if (!images || !images.length) return;
  
  options = options || {
    autoplay: false
  };
  
  let sliderImages = document.querySelector(".slider__images");
  let sliderArrows = document.querySelector(".slider__arrows");
  let sliderDots = document.querySelector(".slider__dots");
  let sliderCity = document.querySelector(".slider_city");
  let sliderApartmentarea = document.querySelector(".slider_apartmentarea");
  let sliderRepairtime = document.querySelector(".slider_repairtime");
  let sliderRepaircost = document.querySelector(".slider_repaircost");
  let sliderNavs = document.querySelector(".slider_navigation");

  initImages();
  initNotes();
  initArrows();
  initDots();
  initNavs();
    
  if (options.autoplay) {
    initAutoplay();
  }
  
  function initImages() {
    images.forEach((image, index) => {
      let imageDiv = `<div class="image n${index} ${index === 0? "active" : ""}" style="background-image:url(${images[index].url});" data-index="${index}"></div>`;
      sliderImages.innerHTML += imageDiv;
    });
  }
  
  function initArrows() {
    sliderArrows.querySelectorAll(".slider__arrow").forEach(arrow => {
      arrow.addEventListener("click", function() {
        let curNumber = +sliderImages.querySelector(".active").dataset.index;
        let nextNumber;
        if (arrow.classList.contains("left")) {
          nextNumber = curNumber === 0? images.length - 1 : curNumber - 1;
        } else {
          nextNumber = curNumber === images.length - 1? 0 : curNumber + 1;
        }
        moveSlider(nextNumber);
      });
    });
  }
  
  function initDots() {
    images.forEach((image, index) => {
      let dot = `<div class="slider__dots-item n${index} ${index === 0? "active" : ""}" data-index="${index}"></div>`;
      sliderDots.innerHTML += dot;
    });
    sliderDots.querySelectorAll(".slider__dots-item").forEach(dot => {
      dot.addEventListener("click", function() {
        moveSlider(this.dataset.index);
      })
    })
  }

  function initNavs() {
    images.forEach((image, index) => {
        let nav = `<li class="slider_navigation_item navigation__item n${index} ${index === 0? "active" : ""}" data-index="${index}""><a href="#">${images[index].city}</a></li>`;
        sliderNavs.innerHTML += nav;
      });
      sliderNavs.querySelectorAll(".slider_navigation_item").forEach(nav => {
        nav.addEventListener("click", function() {
          moveSlider(this.dataset.index);
        })
      })
  }
  
  function moveSlider(num) {
    sliderImages.querySelector(".active").classList.remove("active");
    sliderImages.querySelector(".n" + num).classList.add("active");
    sliderDots.querySelector(".active").classList.remove("active");
    sliderDots.querySelector(".n" + num).classList.add("active");
    sliderNavs.querySelector(".active").classList.remove("active");
    sliderNavs.querySelector(".n" + num).classList.add("active");
    changeNotes(num);
  }
  
  function initNotes() {
    sliderCity.innerText = images[0].city;
    sliderApartmentarea.innerText = images[0].apartmentarea;
    sliderRepairtime.innerText = images[0].repairtime;
    sliderRepaircost.innerText = images[0].repaircost;
  }
  
  function changeNotes(num) {
    sliderCity.innerText = images[num].city;
    sliderApartmentarea.innerText = images[num].apartmentarea;
    sliderRepairtime.innerText = images[num].repairtime;
    sliderRepaircost.innerText = images[num].repaircost;
  }
  
  function initAutoplay() {
    setInterval(() => {
      let curNumber = +sliderImages.querySelector(".active").dataset.index;
      let nextNumber = curNumber === images.length - 1? 0 : curNumber + 1;
      moveSlider(nextNumber);
    }, options.autoplayInterval);
  }
}

let sliderOptions = {
  autoplay: false,
  autoplayInterval: 5000
};

document.addEventListener("DOMContentLoaded", function() {
  initSlider(sliderOptions);
});