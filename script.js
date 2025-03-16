


// Función para obtener el parámetro "startSlide" de la URL
function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? null : decodeURIComponent(results[1].replace(/\+/g, ' '));
  }
  
  // Obtén el valor del parámetro y conviértelo a número (por defecto 0 si no existe)
  const startSlideParam = parseInt(getUrlParameter('startSlide')) || 0;
  
  const sliderTabs = document.querySelectorAll(".slider-tab");
  const sliderIndicator = document.querySelector(".slider-indicator");
  const sliderControls = document.querySelector(".slider-controls");
  
  function updateActiveTab(activeIndex) {
      sliderTabs.forEach((tab, index) => {
          const logo = tab.querySelector('.logo');
          if (logo) {  // Solo actúa sobre el slider-tab que tiene el logo
              logo.style.opacity = (index === activeIndex ? '1' : '0.4');
          }
      });
  }
  
  const updateIndicator = (tab, index) => {
      sliderIndicator.style.transform = `translateX(${tab.offsetLeft - 20}px)`;
      sliderIndicator.style.width = `${tab.getBoundingClientRect().width}px`;
  
      const scrollLeft = sliderTabs[index].offsetLeft - sliderControls.offsetWidth / 2 + sliderTabs[index].offsetWidth / 2;
      sliderControls.scrollTo({ left: scrollLeft, behavior: "smooth" });
  }
  
// Selecciona el contenedor principal del slider
const sliderContainer = document.querySelector(".slider-container");

const swiper = new Swiper(".slider-container", {
  initialSlide: startSlideParam, // slide inicial según el parámetro de la URL
  effect: "fade",
  speed: 1300,
  navigation: {
    prevEl: "#slide-prev",
    nextEl: "#slide-next"
  },
  on: {
    init: function() {
      updateIndicator(sliderTabs[this.activeIndex], this.activeIndex);
      updateActiveTab(this.activeIndex);
      // Agrega o remueve la clase en sliderContainer
      if (this.activeIndex === 3 || this.activeIndex === 4) {
        sliderContainer.classList.add('white-indicator');
      } else {
        sliderContainer.classList.remove('white-indicator');
      }
    },
    slideChange: function() {
      updateIndicator(sliderTabs[this.activeIndex], this.activeIndex);
      updateActiveTab(this.activeIndex);
      if (this.activeIndex === 3 || this.activeIndex === 4 || this.activeIndex === 5) {
        sliderContainer.classList.add('white-indicator');
      } else {
        sliderContainer.classList.remove('white-indicator');
      }
    },
    reachEnd: function() {
      this.autoplay.stop();
    }
  }
});


// Si usas la opción init:false, recuerda llamar a swiper.init() manualmente
swiper.init();

// Manejar el clic en cada slider-tab
sliderTabs.forEach((tab, index) => {
  tab.addEventListener("click", () => {
    swiper.slideTo(index);
    updateIndicator(tab, index);
    updateActiveTab(index);
  });
});

// Inicializa el indicador y la opacidad en la pestaña indicada por el parámetro
updateIndicator(sliderTabs[startSlideParam], startSlideParam);
updateActiveTab(startSlideParam);

window.addEventListener("load", function() {
  document.body.classList.add("loaded");
});

window.addEventListener("resize", () =>
  updateIndicator(sliderTabs[swiper.activeIndex], 0)
);

  



