let cart = JSON.parse(localStorage.getItem("cart"));
let totalCost = 0;
let totalQuantity = 0;
let shippingAmount = 4.99;

function deleteProduct(productId) {
  console.log(cart);
  cart = cart
    .filter((entry) => {
      if (entry.quantity === 1 && entry.product.id === productId) {
        return false;
      } else {
        return true;
      }
    })
    .map((entry) => {
      if (entry.product.id === productId) {
        entry.quantity = entry.quantity - 1;
      }
      return entry;
    });
    
  localStorage.setItem("cart", JSON.stringify(cart));

  renderHTML();
}

const renderHTML = () => {
  let checkoutHtml = "";
  let paymentSummary = "";
  totalCost = 0;
  totalQuantity = 0;
 
  if (cart.length) {
    cart.forEach((item) => {
      totalCost += item.cost * item.quantity;
      if (totalCost > 20){
        shippingAmount = 4.99
      } else {
        shippingAmount = 0
      }
      totalQuantity += item.quantity;
      checkoutHtml += `
      <div class="cart-item-container">
                <div class="delivery-date">
                  Delivery date: Tuesday, June 21
                </div>
    
                <div class="cart-item-details-grid">
                  <img class="product-image"
                  src="${item.product.image}">
    
                  <div class="cart-item-details">
                    <div class="product-name">
                    ${item.product.name}
                    </div>
                    <div class="product-price">
                    $${item.cost * item.quantity}
                    </div>
                    <div class="product-quantity">
                      <button class="update-quantity-link link-primary "> <a  href="amazon.html"> Update <a/>
                      </button>
                      <button class="delete-quantity-link link-primary delete-button" onclick="deleteProduct('${
                        item.product.id
                      }')">
                        Delete
                      </button>
                      <span>
                        Quantity: <span class="quantity-label">${
                          item.quantity
                        }</span>
                      </span>
                    </div>
                  </div>
    
                  <div class="delivery-options">
                    <div class="delivery-options-title">
                      Choose a delivery option:
                    </div>
                    <div class="delivery-option">
                      <input type="radio" checked
                        class="delivery-option-input"
                        name="delivery-option-1">
                      <div>
                        <div class="delivery-option-date">
                        Upto 4 working days
                        </div>
                        <div class="delivery-option-price">
                          FREE Shipping
                        </div>
                      </div>
                    </div>
                    <div class="delivery-option">
                      <input type="radio"
                        class="delivery-option-input"
                        name="delivery-option-1">
                      <div>
                        <div class="delivery-option-date">
                          Upto 2 working days
                        </div>
                        <div class="delivery-option-price">
                          $9.99 - Shipping
                        </div>
                      </div>
                    </div>
                    <div class="delivery-option">
                      <input type="radio"
                        class="delivery-option-input"
                        name="delivery-option-1">
                      <div>
                        <div class="delivery-option-date">
                          Tommorow
                        </div>
                        <div class="delivery-option-price">
                          $4.99 - Shipping
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          
      `;
    });
  } else {
    checkoutHtml = `<h1>Your cart is empty</h1>`;
  }

  paymentSummary = `<div class="payment-summary">
   <div class="payment-summary-title">Order Summary</div>
  
   <div class="payment-summary-row">
     <div>Items (${totalQuantity.toFixed()}):</div>
     <div class="payment-summary-money">$${totalCost.toFixed()}</div>
   </div>
  
   <div class="payment-summary-row">
     <div>Shipping &amp; handling:</div>
     <div class="payment-summary-money">$${shippingAmount}</div>
   </div>
  
   <div class="payment-summary-row subtotal-row">
     <div>Total before tax:</div>
     <div class="payment-summary-money">$${(totalCost+shippingAmount).toFixed()}</div>
   </div>
  
   <div class="payment-summary-row">
     <div>Estimated tax (10%):</div>
     <div class="payment-summary-money">$${(0.1*totalCost).toFixed()}</div>
   </div>
  
   <div class="payment-summary-row total-row">
     <div>Order total:</div>
     <div class="payment-summary-money">$${(totalCost+shippingAmount+0.1*totalCost).toFixed()}</div>
   </div>
  
   <button class="place-order-button button-primary">
     Place your order
   </button>
  </div>`;

  document.querySelector(".order-summary").innerHTML = checkoutHtml;
  document.querySelector(".payment-summary-container").innerHTML =
    paymentSummary;
};

renderHTML();
