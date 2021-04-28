/*=====================SECCION TABS======================== */
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

function bodyScrollingToggle(){
  document.body.classList.toggle("stop-scrolling");
}


/*==================== PORTFOLIO FILTROS Y POPUPS=========== */

(()=>{

      const filterContainer = document.querySelector(".portfolio-filter"),
      portfolioItemsContainer = document.querySelector(".portfolio-items"),
      portfolioItems = document.querySelectorAll(".portfolio-item"),
      popup = document.querySelector(".portfolio-popup"),
      prevBtn = popup.querySelector(".portfolio-popup"),
      nextBtn = popup.querySelector(".pp-next"),
      closeBtn = popup.querySelector(".pp-close"),
      projectDetailsContainer = popup.querySelector(".pp-details"),
      projectDetailsBtn = popup.querySelector(".pp-project-details-btn");
      let itemIndex, slideIndex, screenshots;

      /*Filtros portfolio items */
      filterContainer.addEventListener("click",(event)=>{
        if(event.target.classList.contains("filter-item") && 
        !event.target.classList.contains("active")){
          /*Desactivar existente active 'Filter-item' */
          filterContainer.querySelector(".active").classList.remove("shadow-1","active");
          /*Activar nuevo filtro Item*/
          event.target.classList.add("active","shadow-1");
          const target = event.target.getAttribute("data-target");
          portfolioItems.forEach((item) =>{
            if(target === item.getAttribute("data-category")|| target === 'all'){
              item.classList.remove("hide");
              item.classList.add("show");
            }
            else{
              item.classList.remove("show");
              item.classList.add("hide");
            }   
          })
        }    
      })

      portfolioItemsContainer.addEventListener("click",(event) =>{
        if(event.target.closest(".portfolio-item-inner")){
          const portfolioItem = event.target.closest(".portfolio-item-inner").parentElement;
          //el portafolioItem Index
          itemIndex = Array.from(portfolioItem.parentElement.children).indexOf(portfolioItem);
          screenshots = portfolioItems[itemIndex].querySelector(".portfolio-item-img img").getAttribute("data-screenshot");
          //convertir screenshots en array
          screenshots = screenshots.split(",");
          slideIndex = 0;
          popupToggle();
          popupSlideshow();
        }
      })
      closeBtn.addEventListener("click", ()=>{
        popupToggle()
      })

      function popupToggle(){
        popup.classList.toggle("open");
        bodyScrollingToggle();
      }

      function popupSlideshow(){
        const imgSrc = screenshots[slideIndex];
        const popupImg = popup.querySelector(".pp-img");
        popupImg.src=imgSrc;
        
      }


})();