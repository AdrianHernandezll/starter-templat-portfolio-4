/*============SECCION TABS=============== */
(() => {
    const aboutSection = document.querySelector(".about-section"),
    tabsContainer = document.querySelector(".about-tabs");

    tabsContainer.addEventListener("click", (event)=>{
        if(event.target.classList.contains("tab-item") && !event.target.classList.contains("active")){
          const target = event.target.getAttribute("data-target") ;
          /*Desactivar existente active */
          tabsContainer.querySelector('.active').classList.remove("shadow-1","active");
          /*Activar de nuevo 'tab-item' */
          event.target.classList.add("shadow-1","active");
          /*Desactivar existente active 'tab-content' */
          aboutSection.querySelector(".tab-content.active").classList.remove("active");
          /*Activar nuevo 'tab-content' */
          aboutSection.querySelector(target).classList.add("active");

        }   
    })
})();