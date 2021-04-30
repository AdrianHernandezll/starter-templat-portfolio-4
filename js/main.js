/**=================== NAVEGACION MEUNU===================== */

(() =>{
  const hamburguerBtn = document.querySelector(".hamburguer-btn"),
  navMenu = document.querySelector(".nav-menu"),
  closeNavBtn = navMenu.querySelector(".close-nav-menu"); 
  
  hamburguerBtn.addEventListener("click", showNavMenu);
  closeNavBtn.addEventListener("click", hideNavMenu);

  function showNavMenu(){
    navMenu.classList.toggle("open");
    bodyScrollingToggle();
  }
  function hideNavMenu(){
    navMenu.classList.remove("open");
    fadeOutEffect();
    bodyScrollingToggle();
  }
  function fadeOutEffect(){
    document.querySelector(".fade-out-effect").classList.add("active");
    setTimeout(() =>{
      document.querySelector(".fade-out-effect").classList.remove("active");
    },300)
  }
  document.addEventListener("click",(event) =>{
    if(event.target.classList.contains('link-item')){
      /**Asegurar que event.target.hash tenga valor antes de anular el comportamiento predetermiando  */
      if(event.target.hash !==""){
        // Prevenir default el ancho predeterminado
        event.preventDefault();
        const hash = event.target.hash;
        // Desactivar existente active Seccion
        document.querySelector(".section.active").classList.add("hide");
        document.querySelector(".section.active").classList.remove("active");
        //ok
        document.querySelector(hash).classList.add("active");
        document.querySelector(hash).classList.remove("hide");
        //ni idea
        navMenu.querySelector(".active").classList.add("shadow-1","hover-shadow");
        navMenu.querySelector(".active").classList.remove("active","inner-shadow");
        //activar
        if(navMenu.classList.contains("open")){
          event.target.classList.add("active","inner-shadow");
          event.target.classList.remove("shadow-1","hover-shadow");
          //hide navigation menu
        hideNavMenu();
        }
        else{
          let navItems = navMenu.querySelectorAll(".link-item");
          navItems.forEach((item) =>{
            if(hash === item.hash){
              //activar nueva navegacion menu 'link-item'
              item.classList.add("active","inner-shadow");
              item.classList.remove("shadow-1","hover-shadow");
            }
          })
          fadeOutEffect();
        }
        //Agregar hash (#) al la url

        window.location.hash = hash;

        
      }
    }
  })



})();






/*=====================SECCION TABS======================== */
(() => {
  const aboutSection = document.querySelector(".about-section"),
    tabsContainer = document.querySelector(".about-tabs");

  tabsContainer.addEventListener("click", (event) => {
    if (event.target.classList.contains("tab-item") && !event.target.classList.contains("active")) {
      const target = event.target.getAttribute("data-target");
      /*Desactivar existente active */
      tabsContainer.querySelector('.active').classList.remove("shadow-1", "active");
      /*Activar de nuevo 'tab-item' */
      event.target.classList.add("shadow-1", "active");
      /*Desactivar existente active 'tab-content' */
      aboutSection.querySelector(".tab-content.active").classList.remove("active");
      /*Activar nuevo 'tab-content' */
      aboutSection.querySelector(target).classList.add("active");

    }
  })
})();

function bodyScrollingToggle() {
  document.body.classList.toggle("hidden-scrolling");
}


/*==================== PORTFOLIO FILTROS Y POPUPS=========== */

(() => {

  const filterContainer = document.querySelector(".portfolio-filter"),
    portfolioItemsContainer = document.querySelector(".portfolio-items"),
    portfolioItems = document.querySelectorAll(".portfolio-item"),
    popup = document.querySelector(".portfolio-popup"),
    prevBtn = popup.querySelector(".pp-prev"),
    nextBtn = popup.querySelector(".pp-next"),
    closeBtn = popup.querySelector(".pp-close"),
    projectDetailsContainer = popup.querySelector(".pp-details"),
    projectDetailsBtn = popup.querySelector(".pp-project-details-btn");
  let itemIndex, slideIndex, screenshots;

  /*Filtros portfolio items */
  filterContainer.addEventListener("click", (event) => {
    if (event.target.classList.contains("filter-item") &&
      !event.target.classList.contains("active")) {
      /*Desactivar existente active 'Filter-item' */
      filterContainer.querySelector(".active").classList.remove("shadow-1", "active");
      /*Activar nuevo filtro Item*/
      event.target.classList.add("active", "shadow-1");
      const target = event.target.getAttribute("data-target");
      portfolioItems.forEach((item) => {
        if (target === item.getAttribute("data-category") || target === 'all') {
          item.classList.remove("hide");
          item.classList.add("show");
        }
        else {
          item.classList.remove("show");
          item.classList.add("hide");
        }
      })
    }
  })

  portfolioItemsContainer.addEventListener("click", (event) => {
    if (event.target.closest(".portfolio-item-inner")) {
      const portfolioItem = event.target.closest(".portfolio-item-inner").parentElement;
      //el portafolioItem Index
      itemIndex = Array.from(portfolioItem.parentElement.children).indexOf(portfolioItem);
      screenshots = portfolioItems[itemIndex].querySelector(".portfolio-item-img img").getAttribute("data-screenshot");
      //convertir screenshots en array
      screenshots = screenshots.split(",");
      if (screenshots.length === 1) {
        prevBtn.style.display = "none";
        nextBtn.style.display = "none";
      }
      else {
        prevBtn.style.display = "block";
        nextBtn.style.display = "block";
      }
      slideIndex = 0;
      popupToggle();
      popupSlideshow();
      popupDetails();
    }
  })
  closeBtn.addEventListener("click", () => {
    popupToggle()
    if (projectDetailsContainer.classList.contains("active")) {
      popupDetailsToggle();
    }
  })

  function popupToggle() {
    popup.classList.toggle("open");
    bodyScrollingToggle();
  }

  function popupSlideshow() {
    const imgSrc = screenshots[slideIndex];
    const popupImg = popup.querySelector(".pp-img");
    //Activar loader imgSrc
    popup.querySelector(".pp-loader").classList.add("active");
    popupImg.src = imgSrc;
    popupImg.onload = () => {
      //descactivar loader antes del popumImg load
      popup.querySelector(".pp-loader").classList.remove("active");
    }
    popup.querySelector(".pp-counter").innerHTML = (slideIndex + 1) + " of " + screenshots.length;
  }

  //Siguiente Slide
  nextBtn.addEventListener("click", () => {
    if (slideIndex === screenshots.length - 1) {
      slideIndex = 0;
    }
    else {
      slideIndex++
    }
    popupSlideshow();
  })

  //Anterior Slide
  prevBtn.addEventListener("click", () => {
    if (slideIndex === 0) {
      slideIndex = screenshots.length - 1
    }
    else {
      slideIndex--;
    }
    popupSlideshow();
    console.log("slideIndex:" + slideIndex);
  })

  function popupDetails() {
    //if PORTFOLIO-ITEM-DETAILS NO EXISTE
    if (!portfolioItems[itemIndex].querySelector(".portfolio-item-details")) {
      projectDetailsBtn.style.display = "none";
      return; //Termina Funcion Ejecutada
    }
    projectDetailsBtn.style.display = "block";
    //  el Proyeto Detalles 
    const details = portfolioItems[itemIndex].querySelector(".portfolio-item-details").innerHTML;
    popup.querySelector(".pp-project-details").innerHTML = details;
    //EL PROYECTO TITLE
    const title = portfolioItems[itemIndex].querySelector(".portfolio-item-title").innerHTML;
    //EL PROYECTO TITLE SET
    popup.querySelector(".pp-title h2").innerHTML = title;
    //EL PROYECTO CATEGORIA
    const category = portfolioItems[itemIndex].getAttribute("data-category");
    popup.querySelector(".pp-project-category").innerHTML = category.split("-").join(" ");


  }

  projectDetailsBtn.addEventListener("click", () => {
    popupDetailsToggle()
  })
  function popupDetailsToggle() {
    if (projectDetailsContainer.classList.contains("active")) {
      projectDetailsBtn.querySelector("i").classList.remove("fa-minus");
      projectDetailsBtn.querySelector("i").classList.add("fa-plus");
      projectDetailsContainer.classList.remove("active");
      projectDetailsContainer.style.maxHeight = 0 + "px";
    }
    else {
      projectDetailsBtn.querySelector("i").classList.remove("fa-plus");
      projectDetailsBtn.querySelector("i").classList.add("fa-minus");
      projectDetailsContainer.classList.add("active");
      projectDetailsContainer.style.maxHeight = projectDetailsContainer.scrollHeight + "px";
      popup.scrollTo(0, projectDetailsContainer.offsetTop);
    }

  }

})();

/*Hide en Todas las Secciones Active*/

(() =>{
    const sections = document.querySelectorAll(".section");
    sections.forEach((section) =>{
      if(!section.classList.contains("active")){
        section.classList.add("hide");
      }
    })
})();