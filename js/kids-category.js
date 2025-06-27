const slider_Container =  document.querySelector(".slider-container");
console.log("slider_Container", slider_Container);

const nextImgSlide=()=>{
    const nextBtn =  document.querySelector("#arrow-forward");
    nextBtn.addEventListener("click",()=>{

        // visual logic 
        console.log("total scroll or  max scrollWidth", slider_Container.scrollWidth); //1st property scrollWidth📗🔖 
        console.log("offsetWidth:", slider_Container.offsetWidth); //1st property offsetWidth📗🔖 . visible size to be scrolled.
        console.log("max scrollLeft or max scrolled: ", slider_Container.scrollWidth - slider_Container.offsetWidth); //or but in actuall this size scrollable.📗🔖
       
        // actull logic
        // slider_Container.scrollLeft = 800;
        // slider_Container.scrollLeft = 0; by default
         slider_Container.scrollLeft = slider_Container.scrollLeft + slider_Container.offsetWidth;
         console.log("scrolled",slider_Container.scrollLeft);
        
        //         OR both are same just below is predefined function and other styple, method

        //  actull logic + smoot scroll
        // const scrollAmount = slider_Container.offsetWidth;
        // slider_Container.scrollBy({ 
        //     left: scrollAmount, 
        //     behavior: "smooth" 
        // });   
    })
}
nextImgSlide();

const backImgSlide=()=>{
    const backBtn =  document.querySelector("#arrow-back");
    backBtn.addEventListener("click",()=>{
        
        // actull logic
         slider_Container.scrollLeft = slider_Container.scrollLeft - slider_Container.offsetWidth;
         console.log("scrolled",slider_Container.scrollLeft);

         // OR both are same just below is predefined function and other styple, method

        //  actull logic + smoot scroll
        // const scrollAmount = slider_Container.offsetWidth;
        // slider_Container.scrollBy({ 
        //     left: -scrollAmount, 
        //     behavior: "smooth" 
        // });
    })

}
backImgSlide();


const slides_no_display=()=>{
    const totalSlides =  document.querySelectorAll(".img-container");
    const slides_numbs_container =  document.querySelector(".slider-no-container");
    
    let statements = "";
    for(let i=0; i<totalSlides.length; i++){
        
        statements = statements + `
            <span class="material-symbols-outlined">
                radio_button_checked
            </span>
        `;
    }    
   slides_numbs_container.innerHTML = statements;

}
slides_no_display();


// ḥero slider
const hero_slides_no_display=()=>{
    const totalSlides =  document.querySelectorAll(".hero-slider-img-conatiner");
    const slides_numbs_container =  document.querySelector(".hero-sliders-no-container");
    
    let statements = "";
    for(let i=0; i<totalSlides.length; i++){
        
        statements = statements + `
           <span class="material-symbols-outlined hero-sliders-total-no-icon">
                radio_button_checked
            </span>
        `;
    }    
   slides_numbs_container.innerHTML = statements;

}
hero_slides_no_display();


// ------------------------ toggle Dropdown --------------
const toggleDropdown = () => {
    const sideBarMenus = document.querySelectorAll('.sidebar-wrapper-main-heading');
     
    sideBarMenus.forEach((sideBarMenu) => {

        sideBarMenu.addEventListener("click", (e) => {
            e.preventDefault();
            console.log("clicked element", e.currentTarget);   //📗🔖📗🔖 
            console.log("clicked element next element", e.currentTarget.nextElementSibling);

            const nextElement = e.currentTarget.nextElementSibling;
            // console.log("nextElement",nextElement);

             const rightArrow = e.currentTarget.querySelector('.rightArrow');
             const downArrow = e.currentTarget.querySelector('.downArrow');
             
             
            if (nextElement.classList.contains('hide-menu')){
                nextElement.classList.remove('hide-menu');

                rightArrow.classList.add('hide-rightArrow');
                downArrow.classList.add('show-downArrow');

            } else {
                nextElement.classList.add('hide-menu');

                downArrow.classList.remove('show-downArrow');
                rightArrow.classList.remove('hide-rightArrow');
                
            }
        })
    })

}
toggleDropdown();
