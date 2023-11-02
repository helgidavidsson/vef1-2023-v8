import { formatNumber as formatPrice } from './helpers.js';
/**
 * Búa til línu í cart töflu.
 * @param  {import('../main.js').Product} product
 * @param {number} quantity 
 * @returns HTMLElement
 */
 let cartSubtotal = 0;

function deleteLineFromCart(event) {

  event.preventDefault();
  const lineToDelete = event.submitter.closest('tr');
  lineToDelete.parentElement.removeChild(lineToDelete)
  
}






export function createCartLine(product, quantity) {
  // TODO útfæra þannig að búin sé til lína í körfu á forminu:

  /*
  <tr data-cart-product-id="1">
    <td>HTML húfa</td>
    <td>1</td>
    <td><span class="price">5.000 kr.-</span></td>
    <td><span class="price">5.000 kr.-</span></td>
    <td>
      <form class="remove" method="post">
        <button>Eyða</button>
      </form>
    </td>
  </tr>
  */
  const productTotalPrice = quantity * product.price;
  cartSubtotal += productTotalPrice;

  const cartLineElement = document.createElement('tr');
  
  const titleElement = document.createElement('td');
  titleElement.textContent = product.title;
  cartLineElement.appendChild(titleElement)

  const qtyElement = document.createElement('td');
  qtyElement.textContent = quantity;
  cartLineElement.appendChild(qtyElement);


  const priceElement = document.createElement('td');
  priceElement.textContent = formatPrice(productTotalPrice);
  cartLineElement.appendChild(priceElement)

  const totalElement = document.createElement('td');
  totalElement.textContent =  formatPrice(quantity * product.price);
  cartLineElement.appendChild(totalElement);

  const formTdElement = document.createElement('td');

  const formElement = document.createElement('form');
  formElement.addEventListener('submit', deleteLineFromCart)
  
  const buttonElement = document.createElement('button');
  buttonElement.textContent = "Eyða";

  formElement.appendChild(buttonElement);

  formTdElement.appendChild(formElement);
  cartLineElement.appendChild(formTdElement);


  
  const subTotalElement = document.getElementById('subtotal');
  if (subTotalElement) {
    subTotalElement.textContent = `${formatPrice(cartSubtotal)}`;
    console.log(cartSubtotal)
  }




  // const cartLineElement = document.createElement('div');
  // const cartLineTitleElement = document.createElement('strong');
  // const cartLinePriceElement = document.createElement('span');
  // cartLinePriceElement.textContent = formatNumber(product.price);

  // cartLineTitleElement.textContent = product.title;

  // cartLineElement.appendChild(cartLineTitleElement);
  // cartLineElement.appendChild(cartLinePriceElement);

  // TODO hér þarf að búa til eventListener sem leyfir að eyða línu úr körfu

  return cartLineElement;
}

/**
 * Sýna efni körfu eða ekki.
 * @param {boolean} show Sýna körfu eða ekki
 */
export function showCartContent(show = true) {
  // Finnum element sem inniheldur körfuna
  const cartElement = document.querySelector('.cart');

  if (!cartElement) {
    console.warn('fann ekki .cart');
    return;
  }

  const emptyMessage = cartElement.querySelector('.empty-message');
  const cartContent = cartElement.querySelector('.cart-content');

  

  if (!emptyMessage || !cartContent) {
    console.warn('fann ekki element');
    return;
  }

  if (show) {
    emptyMessage.classList.add('hidden');
    cartContent.classList.remove('hidden');

  } else {
    emptyMessage.classList.remove('hidden');
    cartContent.classList.add('hidden');
  }
}


