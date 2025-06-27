console.log("MenProducts",MenProducts); // it come from another js file. called men-products-DB.js
console.log("selectedProductsIds",selectedProductsIds); // it come from another js file. called men-products.js

// ========================================================
const emptyBagHandel=()=>{
    const bagProductsListingContainer =  document.querySelector('.bag-items-container');
    const bagProductsPriceContainer =  document.querySelector('.bag-items-price-container');
    const emptyBagContainer =  document.querySelector('.empty-bag');

    if(bagProductsListingContainer === null){ // bcz this cart.js file use in another js so that like m-in men-products.js/ men-products.hmtl
      return;
    }
    if(bagProductsPriceContainer === null){ // bcz this cart.js file use in another js so that like m-in men-products.js/ men-products.hmtl
      return;
    }
    if(emptyBagContainer === null){ // bcz this cart.js file use in another js so that like m-in men-products.js/ men-products.hmtl
      return;
    }

     if(selectedProductsIds.length <= 0){
         bagProductsListingContainer.style="display:none";
         bagProductsPriceContainer.style="display:none";
         emptyBagContainer.classList.add('show-Bag');
     }
}
emptyBagHandel();


// ======================== mobile version ===============
const orderBtnDisable=()=>{
  const placeOrderButton =  document.querySelector('.place-Order-button');

    if(placeOrderButton === null){ // this cartjs file added in another hmtl like men-products.html
        return;
     }

    if(selectedProductsIds <= 0){
        placeOrderButton.disabled = true;  //📗🔖📗🔖 disabled attribute is added in Html elemet then dont work. <button class="placeOrder-btn place-Order-button" disabled>PLACE ORDER</button>
        placeOrderButton.classList.add('btn-disabled-feel');
      }
    
}
orderBtnDisable();


// ========================================================
const displayCartProductsTotalNo=()=>{
    const bagItemCounts =  document.querySelectorAll('.bag-item-count');
    bagItemCounts.forEach(bagItemCount=>{
      bagItemCount.innerHTML =  selectedProductsIds.length;
    })
}
displayCartProductsTotalNo();


// ========================================================
let selectedProducts = [];
const findOutCartIdsProducts=()=>{
  selectedProducts = selectedProductsIds.map(selectedProductId=>{
    for (let i = 0; i < MenProducts.length; i++) {
        if(selectedProductId === Number(MenProducts[i].id)){
          // console.log("true id is",Number(MenProducts[i].id));
            return MenProducts[i];
        }
        // console.log("false id is",Number(MenProducts[i].id));    
    }
  })    
  console.log("selectedProducts",selectedProducts);
}
findOutCartIdsProducts();

// ========================================================
const displayCartProducts=()=>{
  const bagProductsContainer =  document.querySelector('.bag-items-container');

  if(bagProductsContainer === null){ // bcz this cart.js file use in another js so that like m-in men-products.js/ men-products.hmtl
      return;
  }

  let statements = "";
  selectedProducts.forEach(selectedProduct=>{
    // console.log(selectedProduct);
     
    statements = statements + `
        <div class="bag-item">
          <div class="img-container">
            <img src="../${selectedProduct.item_image}" alt="">
          </div>
          <div>
            <p class="product-company-name">${selectedProduct.item_company_name}</p>
            <p class="product-name">${selectedProduct.item_name}</p>
            <p>
              <span class="product-current-price">Rs. ${selectedProduct.current_price}</span>
              <span class="product-original-price">${selectedProduct.original_price}</span>
              <span class="product-discount-percentage">(${selectedProduct.discount_percentage}%)</span>
            </p>
            <p>14 days return allowed.</p>
            <p>
              Delivery Estimate <spna class="delivery-Estimate">${selectedProduct.delivery_date}</span>
            </p>
          </div>
          <div class="delete-btn" onclick="deleteCartProduct(${Number(selectedProduct.id)})">
            <span class="material-symbols-outlined">
              close
            </span>
          </div>
        </div>
    `;
  })
  bagProductsContainer.innerHTML= statements;
}
displayCartProducts();


// ========================================================
const deleteCartProduct=(id)=>{
    console.log("delete product id is",id);

    // Get from db(local storagr) old list
    let men_products_ids = JSON.parse(localStorage.getItem("choosedProductsIds"));
    console.log("men_products_ids",men_products_ids);

    selectedProductsIds = men_products_ids.filter(men_products_id=>{
          if(id !== men_products_id){
              return men_products_id;
          }  
    })
    console.log("selectedProductsIds",selectedProductsIds); 
    
    // Save  new updated list
    localStorage.setItem("choosedProductsIds",JSON.stringify(selectedProductsIds));

    // Refresh all cart views
    findOutCartIdsProducts()
    displayCartProducts()
    displayCartProductsTotalNo()
    displayProductsPrices()
    emptyBagHandel()
    orderBtnDisable()
}

// ========================================================
const displayProductsPrices=()=>{
  const countNumber =  document.querySelector('.count-number');
  const totalOriginalMRPPriceEle =  document.querySelector('.total-original-price');
  const totalDiscountAmountEle =  document.querySelector('.discount-amount');
  const totalAmountPayEles =  document.querySelectorAll('.total-amount-pay');
  // const totalplatformFeeEle =  document.querySelector('.platformfee-amount');


  //total products count show on webpage
  if(countNumber === null){ // bcz this cart.js file use in another js so that like m-in men-products.js/ men-products.hmtl
      return;
  }
  countNumber.innerText = `(${selectedProductsIds.length} items)`;

 
  let totalOriginalMRPPrice = 0;
  let totalDiscountAmount = 0;
  selectedProducts.forEach(selectedProduct=>{
    console.log(selectedProduct.original_price);
    // total original Price calculate
    totalOriginalMRPPrice = totalOriginalMRPPrice + selectedProduct.original_price;
    // total discount amount calculate
    totalDiscountAmount = totalDiscountAmount + (selectedProduct.original_price - selectedProduct.current_price); 
   
  })
  // total amount pay calculate
  totalAmountPay = totalOriginalMRPPrice - totalDiscountAmount;
  // // total platform fee amount calculate
  // let platformFee =  Math.ceil(totalAmountPay * 0.1 / 100);

  // total original Price render on webpage
  totalOriginalMRPPriceEle.innerText =  `₹${totalOriginalMRPPrice}`;
  // total discount amount render on webpage
  totalDiscountAmountEle.innerText = `- ₹${totalDiscountAmount}`;
  // total amount pay render on webpage
  // totalAmountPayEle.innerText = `₹${totalAmountPay}`;
  totalAmountPayEles.forEach(totalAmountPayEle=>{
        totalAmountPayEle.innerText = `₹${totalAmountPay}`;
  })

  // total platform fee amount  render on webpage
  // totalplatformFeeEle.innerText = platformFee;

}
displayProductsPrices();


