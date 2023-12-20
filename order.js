const cart = JSON.parse(localStorage.getItem('cart'));
console.log('cart', cart);
let ordersHtml = '';
let cartQuantity = 0;
if(cart.length){cart.forEach((item) => {

  ordersHtml += `
  
        <div class="product-image-container">
          <img src="${item.product.image}">
        </div>

        <div class="product-details">
          <div class="product-name">
           ${item.product.name}
          </div>
          <div class="product-delivery-date">
            Arriving on: June 17
          </div>
          <div class="product-quantity"> Quantity:
            ${item.quantity}
          </div>
          <button class="buy-again-button button-primary">
            <img class="buy-again-icon" src="images/icons/buy-again.png">
            <span class="buy-again-message">Buy it again</span>
          </button>
        </div>

        <div class="product-actions">
          <a href="tracking.html">
            <button class="track-package-button button-secondary">
              Track package
            </button>
          </a>
        </div>
      </div>`
      
        cartQuantity += item.quantity}
       )} else {
        ordersHtml = `<h3>Please make an order</h3>`
      }



document.querySelector('.order-details-grid').innerHTML = ordersHtml;
document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
