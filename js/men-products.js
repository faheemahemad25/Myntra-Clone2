const totalProductsNoDisplay=()=>{
    const allProductsTotalNumber = document.getElementById("All-Products-title-totalNumbers");

    if(allProductsTotalNumber === null){ //📗🔖📗🔖  for cart.html mei bhi ye index.js add honi h or kri h. MEANS jb items-conatiner element nhi mile tb if mei andar jao and js compiler bhai aage line pr mt jao bcz nhi h ye line so error se bache.
       return;
    }
    const MenTotalProducts =  MenProducts.length;
    allProductsTotalNumber.innerText = `- ${MenTotalProducts} products`;     
};
totalProductsNoDisplay();


// const productsDisplay=()=>{
//     const menproductslistcontainer = document.getElementById("men-products-list-container");

//     if(menproductslistcontainer === null){ //📗🔖📗🔖  for cart.html mei bhi ye index.js add honi h or kri h. MEANS jb items-conatiner element nhi mile tb if mei andar jao and js compiler bhai aage line pr mt jao bcz nhi h ye line so error se bache.
//        return;
//     }

//      let statements = "";
//      MenProducts.forEach(menProduct=>{
//         // console.log(menProduct);
        
//         statements = statements + `
//         <div class="product-container">
//             <div class="product-img-container">
//                 <a href="" class="">
//                     <img src="../${menProduct.item_image}" alt="" class="bb">
//                 </a>
//             </div>
//             <div class="product-info-container">
//                 <div class="rating-review-container bb">
//                     <span class="product-review-ratingStart">${menProduct.rating.stars} <span
//                             class="star-color">★</span></span>
//                     <span class="product-review-totalNumber">| ${menProduct.rating.noOfReveiews}</span>
//                 </div>
//                 <p class="product-company-name bb">${menProduct.item_company_name} </p>
//                 <p class="product-name bb">${menProduct.item_name}</p>
//                 <div class="product-price-container bb">
//                     <span class="product-current-price">Rs. ${menProduct.current_price}</span>
//                     <span class="product-original-price">Rs. ${menProduct.original_price}</span>
//                     <span class="product-discount-percentage">(${menProduct.discount_percentage}%) OFF</span>
//                 </div>
//             </div>
//             <div class="product-action-container">
//                 <div class="addtocart-button-container btn-style">
//                     <button onclick="handleAddToCart(${Number(menProduct.id)})">
//                         <span class="material-symbols-outlined btn-icon">
//                             shopping_cart
//                         </span>
//                         <span class="btn-txt"> Add to Cart</span>
//                     </button>
//                 </div>
//                 <div class="buy-button-container btn-style">
//                     <button>
//                         <span class="material-symbols-outlined btn-icon">
//                             local_mall
//                         </span>
//                         <span class="btn-txt"> Buy Now</span>
//                     </button>
//                 </div>
//             </div>
//         </div>
//      `;     
//    })
//     menproductslistcontainer.innerHTML =  statements;
// };
// productsDisplay(); 


//console.log(JSON.parse(localStorage.getItem("choosedProductsIds"))); // Step 1


let choosedProductsIdsGet =  JSON.parse(localStorage.getItem("choosedProductsIds"));
let selectedProductsIds = choosedProductsIdsGet || [];  //🔖📗 Memorize this Trick and understand it. OR || operator check the first condition true or falsy.
// now selectedProduct = [4, 1, 7, 13, 8, 43]; this array come from choosedProductsIdsGet; 
const handleAddToCart=(productId)=>{
    const itemAddedPopupContainer =  document.querySelector('.item-added-popup-container');
    //clicked Product id     
    console.log("choosed product's Id",productId);
    
    selectedProductsIds.push(Number(productId))
    menProductSaveDB(); 
    
    // popup msg
    itemAddedPopupContainer.style="display:block";
    setTimeout(()=>{
      itemAddedPopupContainer.style="display:none";
    },1000)

    // bagcount no
    displayCartProductsTotalNo();

}

const menProductSaveDB=()=>{ 
   localStorage.setItem("choosedProductsIds", JSON.stringify(selectedProductsIds));    
}



// =========================================== pagination ======================================

// -------------------- STEP 1 ----------------------------- 
const generatePage = () => {
    const pagination_info_txt = document.getElementById("pagination-info-txt");
    const pagenumbersContainer = document.querySelector(".pagenumbers-container");

    //  render and append how much show at a time or at one page
    pagination_info_txt.innerText = `Showing 20 of ${MenProducts.length} products`;
     
     perPageProducts = 20;
    const totalPages = Math.ceil(MenProducts.length / perPageProducts);
    
    //  Generating page numbers dynamically based on total products.
    let statements = ""
    for (let i = 1; i <= totalPages; i++) {
        statements = statements + `
          <span onclick="updateProductsIndex(${i})" id="page${i}" class="page">${i}</span>
       `;
    }
    pagenumbersContainer.innerHTML = statements;
}
generatePage();

 let clikedNo_clikedPage_currentPage = 1; //📗🔖📗🔖GLOBAL VARIABLE, this is clicked no  AND it will be keep changing and start and end index will be upadte so like this next page or next index range changes.
 // -------------------- STEP 2 -----------------------------
 const productsDisplay = () => {

    const menproductslistcontainer = document.getElementById("men-products-list-container");
    if(menproductslistcontainer === null){ //📗🔖for cart.html mei bhi ye index.js add honi h or kri h. MEANS jb items-conatiner element nhi mile tb if mei andar jao and js compiler bhai aage line pr mt jao bcz nhi h ye line so error se bache.
       return;
    }

    //  ============================ Automatic Scroll bottom to top  =====================================
    
    // if you want to force the whole page to top (not just the container):
    window.scrollTo( //📗🔖📗🔖window.scrollTo
        { 
            top: 0, behavior: "smooth" 
        }
    );

    
    //  ============================ PREV BTN start =====================================

     // prevent  when next btn clicked more less than page like 1 time then CONTROL that case👇 
     const prevBtn = document.querySelector('#prev-btn');
     const prevBtnTxt = document.querySelector('.pagination-prevbtn-text');
     const prevBtnIcon = document.querySelector('.pagination-prevbtn-icon');

    if(clikedNo_clikedPage_currentPage <= 1){
        // btn disable
        prevBtn.disabled = true; // 📗🔖📗🔖disabled html attribute not work with div. it work only with button,input.
        // btn disable feel and look
        prevBtnTxt.classList.add('pagination-NxtPrev-Btn-disable-feel');
        prevBtnIcon.classList.add('pagination-NxtPrev-Btn-disable-feel');
    
     }
     else{
        // btn disable remove
        prevBtn.disabled = false; // 📗🔖📗🔖disabled html attribute not work with div. it work only with button,input.
        // btn disable feel and look
        prevBtnTxt.classList.remove('pagination-NxtPrev-Btn-disable-feel');
        prevBtnIcon.classList.remove('pagination-NxtPrev-Btn-disable-feel');
     }


    console.log("clikedNo_clikedPage_currentPage no",clikedNo_clikedPage_currentPage);
    // user clicked 1 or by defult 
     startIndex = (clikedNo_clikedPage_currentPage - 1) * perPageProducts;     //? (1 - 1) * 20 =  0 
     endIndex  =  (perPageProducts - 1) + startIndex ;                         //? (20 - 1) +  0 = 19
    
    console.log("startIndex",startIndex); //last page click means 4th time //60    //next btn reaches more than page no. like 5th time click  //80
    console.log("endIndex",endIndex);                                      //79                                                               //99
    

    //  ============================ NEXT BTN start =====================================

    // ================ change pages via next btn click ===============================
     // prevent  when next btn clicked more than page like 5 time then CONTROL that case👇 
     const nextBtn = document.querySelector('#next-btn');
     const nextBtnTxt = document.querySelector('.pagination-nxtbtn-text');
     const nextBtnIcon = document.querySelector('.pagination-nxtbtn-icon');
     
     if(startIndex > MenProducts.length){
        // btn disable
        nextBtn.disabled = true; // 📗🔖📗🔖disabled html attribute not work with div. it work only with button,input.
        // btn disable feel and look
        nextBtnTxt.classList.add('pagination-NxtPrev-Btn-disable-feel');
        nextBtnIcon.classList.add('pagination-NxtPrev-Btn-disable-feel');
        // when next btn click reach more than total page then
        return;
     }
     else{
        // btn disable remove
        nextBtn.disabled = false; // 📗🔖📗🔖disabled html attribute not work with div. it work only with button,input.
        // btn disable feel and look
        nextBtnTxt.classList.remove('pagination-NxtPrev-Btn-disable-feel');
        nextBtnIcon.classList.remove('pagination-NxtPrev-Btn-disable-feel');
     }

     // ================ changes page via page no. clicked insted of next and prev btn click and THEN -> "next btn"  AND  "prev btn" disable feel ===============================

    // prevent for last page  from error
     if(endIndex > MenProducts.length){
        endIndex = MenProducts.length - 1; // Again assign same length as array of obj have OR means our products db size

        // btn disable
        nextBtn.disabled = true; // 📗🔖📗🔖disabled html attribute not work with div. it work only with button,input.
        // btn disable feel and look
        nextBtnTxt.classList.add('pagination-NxtPrev-Btn-disable-feel');
        nextBtnIcon.classList.add('pagination-NxtPrev-Btn-disable-feel');

     }

     // ================ active page   OR  clicked page  ===============================

     const currentClickedPage = document.querySelector(`#page${clikedNo_clikedPage_currentPage}`); 
     const pages = document.querySelectorAll(".page");

      pages.forEach(page=>{
         if(page.classList.contains('active-clicked-page')){
             page.classList.remove('active-clicked-page');
         }
      });
      currentClickedPage.classList.add('active-clicked-page');


    
    // render products based on index range which created via user select which pageno. and based on it startIndex and endIndex created.
    let statements = "";
    for(let i=startIndex; i<=endIndex; i++){
        // MenProducts[i];
       statements = statements + `
        <div class="product-container">
            <div class="product-img-container">
                <a href="" class="">
                    <img src="../${MenProducts[i].item_image}" alt="" class="bb">
                </a>
            </div>
            <div class="product-info-container">
                <div class="rating-review-container bb">
                    <span class="product-review-ratingStart">${MenProducts[i].rating.stars} <span
                            class="star-color">★</span></span>
                    <span class="product-review-totalNumber">| ${MenProducts[i].rating.noOfReveiews}</span>
                </div>
                <p class="product-company-name bb">${MenProducts[i].item_company_name} </p>
                <p class="product-name bb">${MenProducts[i].item_name}</p>
                <div class="product-price-container bb">
                    <span class="product-current-price">Rs. ${MenProducts[i].current_price}</span>
                    <span class="product-original-price">Rs. ${MenProducts[i].original_price}</span>
                    <span class="product-discount-percentage">(${MenProducts[i].discount_percentage}%) OFF</span>
                </div>
            </div>
            <div class="product-action-container">
                <div class="addtocart-button-container btn-style">
                    <button onclick="handleAddToCart(${Number(MenProducts[i].id)})">
                        <span class="material-symbols-outlined btn-icon">
                            shopping_cart
                        </span>
                        <span class="btn-txt"> Add to Cart</span>
                    </button>
                </div>
                <div class="buy-button-container btn-style">
                    <button>
                        <span class="material-symbols-outlined btn-icon">
                            local_mall
                        </span>
                        <span class="btn-txt"> Buy Now</span>
                    </button>
                </div>
            </div>
        </div>
     `;     
    }
    menproductslistcontainer.innerHTML =  statements;
 };
 productsDisplay();


 // -------------------- STEP 3 -----------------------------
const updateProductsIndex=(userClickedPart)=>{
    clikedNo_clikedPage_currentPage = userClickedPart; // current page is what user click
   
    productsDisplay();
}

//  -------------------- STEP 4 : next and previous btn feature  -----------------------------
const nextBtn=()=>{
  clikedNo_clikedPage_currentPage = clikedNo_clikedPage_currentPage + 1;
  productsDisplay();
}

const prevBtn=()=>{
  clikedNo_clikedPage_currentPage = clikedNo_clikedPage_currentPage - 1;
  productsDisplay();
}









// =========================================== pagination End  ======================================

// ====================================================================

                    // Mobile ui js

// ===================================================================

const bottomNavBarPopUp=()=>{
    // ------------------- sort --------------
    const sortBtnPopupConatiner =  document.querySelector('.sort-Btn-popup-conatiner');
    const sortPopupConatinerEle =  document.querySelector('#bottom-NavBar-sort-popup-container');
    const menProductsBodyEle =  document.querySelector('#men-products-body');
    const sortpopuptransluecentbackground =  document.querySelector('.sort-popup-transluecent-background');
 
    if(sortBtnPopupConatiner === null){ //bcz this js file used in another html like cart.html
        return;
    }

     sortBtnPopupConatiner.addEventListener("click",()=>{
           sortPopupConatinerEle.style.transform="translateY(0%)";
           menProductsBodyEle.classList.add("body-scroll-stop");
           sortpopuptransluecentbackground.style.display="block";
       })

     sortPopupConatinerEle.addEventListener("click", (e)=>{
           // 1st WAY 
           // if(e.target.classList.contains('sort-pop-container-closejs')){
           //     sortPopupConatinerEle.style.transform="translateY(100%)";
           // }
           //  ---- OR ---- 
           //2nd WAY   📗🔖📗🔖📗🔖 
           if(e.target === e.currentTarget){
                sortPopupConatinerEle.style.transform="translateY(100%)";
                 menProductsBodyEle.classList.remove("body-scroll-stop");
                 sortpopuptransluecentbackground.style.display="none";
           }
       })

       // ------------------- filter --------------
    const filterBtnPopupConatiner =  document.querySelector('.filter-Btn-popup-conatiner');
    const filterPopupConatinerEle =  document.querySelector('#bottom-NavBar-filter-popup-container');
    const filterpopuptransluecentbackground =  document.querySelector('.filter-popup-transluecent-background');
 

     filterBtnPopupConatiner.addEventListener("click",()=>{
           filterPopupConatinerEle.style.transform="translateY(0%)";
           menProductsBodyEle.classList.add("body-scroll-stop");
           filterpopuptransluecentbackground.style.display="block";
       })

     filterPopupConatinerEle.addEventListener("click", (e)=>{
           // 1st WAY 
           // if(e.target.classList.contains('filter-pop-container-closejs')){
           //     filterPopupConatinerEle.style.transform="translateY(100%)";
           // }
           //  ---- OR ---- 
           //2nd WAY   📗🔖📗🔖📗🔖 
           if(e.target === e.currentTarget){
                filterPopupConatinerEle.style.transform="translateY(100%)";
                 menProductsBodyEle.classList.remove("body-scroll-stop");
                 filterpopuptransluecentbackground.style.display="none";
           }
       })

     // --------------- filter vertical tabs initially ------------
     const mobileFiltersContentAreas =  document.querySelectorAll('.mobile-filters-content-area');
     mobileFiltersContentAreas.forEach(mobileFiltersContentArea=>{
            //  mobileFiltersContentArea.style.display="none";
             mobileFiltersContentArea.classList.add('hide-content-area');
     })
      
}
bottomNavBarPopUp();

// --------------- filter vertical tabs ------------
const showContentContainer=(toBeShownContentContainerId)=>{
          const contentContainerIdAreaShow = document.querySelector(`#${toBeShownContentContainerId}`);
          const mobileFiltersContentAreas =  document.querySelectorAll('.mobile-filters-content-area');

          mobileFiltersContentAreas.forEach(mobileFiltersContentArea=>{
               mobileFiltersContentArea.classList.add('hide-content-area');
               mobileFiltersContentArea.classList.remove('show-content-area'); // second time click then pevious showing hide.    
           })
         //  click area show
         contentContainerIdAreaShow.classList.add('show-content-area');      
};

// --------------- filter  active btn ------------
const filterBtns =  document.querySelectorAll('.filter-btn');
filterBtns.forEach(filterBtn=>{
    filterBtn.addEventListener('click',()=>{
             filterBtns.forEach(fltBtn=>{
                fltBtn.classList.remove('btn-active');
             })
            //  click btn background add
             filterBtn.classList.add('btn-active');
    })
})



     