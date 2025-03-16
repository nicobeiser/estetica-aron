

const sliderTabs = document.querySelectorAll(".slider-tab");
const sliderIndicator = document.querySelector(".slider-indicator");
const sliderControls = document.querySelector(".slider-controls");
const urlParams = new URLSearchParams(window.location.search);
const startSlide = parseInt(urlParams.get("startSlide"), 10);



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

// Inicializa el swiper
const swiper = new Swiper(".slider-container", {
    effect: "fade",
    speed: 1300,
    navigation: {
        prevEl: "#slide-prev",
        nextEl: "#slide-next"
    },
    
    on: {
        slideChange: () => {
            const activeIndex = swiper.activeIndex;
            updateActiveTab(activeIndex);
            const currentTabIndex = [...sliderTabs].indexOf(sliderTabs[activeIndex]);
            updateIndicator(sliderTabs[activeIndex], currentTabIndex);
        },
        
        reachEnd: () => swiper.autoplay.stop()
    }
});
// Agrega esta sección después de la inicialización del Swiper

sliderTabs.forEach((tab, index) => {
    tab.addEventListener("click", () => {
        swiper.slideTo(index);               // Cambia al slide correspondiente
        updateIndicator(tab, index);         // Actualiza el indicador visual
        updateActiveTab(index);              // Actualiza la opacidad del logo en la pestaña
    });
});


// Si se especifica startSlide en la URL, mueve el slider a ese índice y actualiza el indicador
if (!isNaN(startSlide)) {
    swiper.slideTo(startSlide, 0);  // El segundo parámetro es la duración de la animación (0 para inmediata)
    updateIndicator(sliderTabs[startSlide], startSlide);
    updateActiveTab(startSlide);
} else {
    updateIndicator(sliderTabs[0], 0);
    updateActiveTab(0);
}

window.addEventListener("load", function() {
    document.body.classList.add("loaded");
});




window.addEventListener("resize", () =>
    updateIndicator(sliderTabs[swiper.activeIndex], 0)
);

