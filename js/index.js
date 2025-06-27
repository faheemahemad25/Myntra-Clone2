const slider_Container =  document.querySelector(".hero-slider-container");
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


// ḥero slider no of images
const hero_slides_no_display=()=>{
    const totalSlides =  document.querySelectorAll(".hero-slider-img-conatiner");
    console.log(totalSlides);
    
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


//mobile ḥero slider no of images
const mobile_hero_slides_no_display=()=>{
    const mobiletotalSlides =  document.querySelectorAll(".mobile-hero-slider-img-conatiner");
    console.log(mobiletotalSlides);
    
    const mobileslides_numbs_container =  document.querySelector(".mobile-hero-sliders-no-container");
    
    let statements = "";
    for(let i=0; i<mobiletotalSlides.length; i++){
        
        statements = statements + `
           <i class="fa-solid fa-circle-dot hero-sliders-total-no-icon"></i>
        `;
    }    
   mobileslides_numbs_container.innerHTML = statements;

}
mobile_hero_slides_no_display();


const sideBar = () => {
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


    // ---------- Side bar open AND Side bar close logic ---------- 

    const sidebarSuperContainer = document.querySelector('.sidebar-super-container');
    const side_bar_transluecent_background = document.querySelector('.side-bar-transluecent-background');
    const body = document.getElementById('body');
    
    // Side bar open
      const hemBurgerIcon = document.querySelector('.hemBurger-icon');
       hemBurgerIcon.addEventListener('click',()=>{
        //   sidebarSuperContainer.style="display:block";
          /*   OR  */ /*👆 👇 alternate of display: block; for transition feel is transform: translateX(0);   */
          sidebarSuperContainer.classList.add('show-sidebarSuperContainer');  
          side_bar_transluecent_background.style.display="block";
         body.style="overflow: hidden"; //📗🔖📗🔖so that after open scroll bar back dont scroll.
     })

    // Side bar close 
     const closeBtn = document.querySelector('.close-Btn');
     closeBtn.addEventListener('click',()=>{
        //    sidebarSuperContainer.style="display:none";
           /*   OR  */ /* alternate of display: none; for transition feel is  transform: translateX(-100%); 👇*/
        sidebarSuperContainer.classList.remove('show-sidebarSuperContainer');
        side_bar_transluecent_background.style.display="none";
           body.style="overflow: auto"; //📗🔖📗🔖so that after open scroll bar back dont scroll.
     })


    //and also close with  Side bar close 
     sidebarSuperContainer.addEventListener('click',(e)=>{
           if (e.target === e.currentTarget) { //📗🔖📗🔖📗🔖
                // sidebarSuperContainer.style.display = 'none';
                   /*   OR  */ /* alternate of display: none; for transition feel is  transform: translateX(-100%); 👇*/
                 sidebarSuperContainer.classList.remove('show-sidebarSuperContainer');
                 side_bar_transluecent_background.style.display="none";
                body.style="overflow: auto"; //📗🔖📗🔖so that after open scroll bar back dont scroll.
            }
     })



}
sideBar();



// const sideBar = () => {
//     const sideBarMenus = document.querySelectorAll('.sidebar-wrapper-main-heading');

//     sideBarMenus.forEach((sideBarMenu) => {
//         sideBarMenu.addEventListener("click", (e) => {
//             e.preventDefault();
//             // e.stopPropagation();

//             const currentHeading = e.currentTarget; // The element the event is bound to 
//             console.log(currentHeading);
            
//             const nextElement = currentHeading.nextElementSibling;

//             if (nextElement.classList.contains('hide-menu')) {
//                 nextElement.classList.remove('hide-menu');
//             } else  {
//                 nextElement.classList.add('hide-menu');
//             }
//         });
//     });
// };

// sideBar();
