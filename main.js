import { createCartLine, showCartContent } from './lib/ui.js';
import { formatNumber as formatPrice } from './lib/helpers.js';
/**
 * @typedef {Object} Product
 * @property {number} id Auðkenni vöru, jákvæð heiltala stærri en 0.
 * @property {string} title Titill vöru, ekki tómur strengur.
 * @property {string} description Lýsing á vöru, ekki tómur strengur.
 * @property {number} price Verð á vöru, jákvæð heiltala stærri en 0.
 */

const products = [
  {
    id: 1,
    title: 'HTML húfa',
    description:
      'Húfa sem heldur hausnum heitum og hvíslar hugsanlega að þér hvaða element væri best að nota.',
    price: 5_000,
  },
  {
    id: 2,
    title: 'CSS sokkar',
    description: 'Sokkar sem skalast vel með hvaða fótum sem er.',
    price: 3_000,
  },
  {
    id: 3,
    title: 'JavaScript jakki',
    description: 'Mjög töff jakki fyrir öll sem skrifa JavaScript reglulega.',
    price: 20_000,
  },
];
//reikna samtals kostnað
function calculateAndUpdateSubtotal() {
  
 
}

/** Bæta vöru í körfu */
function addProductToCart(product, quantity) {
  // Hér þarf að finna `<tbody>` í töflu og setja `cartLine` inn í það
  const cartTableBodyElement = document.querySelector('.cart table tbody');

  if (!cartTableBodyElement) {
    console.warn('fann ekki .cart table')
   }
  
  
  // TODO hér þarf að athuga hvort lína fyrir vöruna sé þegar til
  const cartLine = createCartLine(product, quantity);
  cartTableBodyElement.appendChild(cartLine);
  
   

  // Sýna efni körfu
  showCartContent(true);

  // TODO sýna/uppfæra samtölu körfu
  calculateAndUpdateSubtotal()
}

function submitHandler(event) {
  // Komum í veg fyrir að form submiti
  event.preventDefault();
  
  // Finnum næsta element sem er `<tr>`
  const parent = event.target.closest('tr')

  // Það er með attribute sem tiltekur auðkenni vöru, t.d. `data-product-id="1"`
  const productId = Number.parseInt(parent.dataset.productId);

  // Finnum vöru með þessu productId
  const product = products.find((i) => i.id === productId);

  // TODO hér þarf að finna fjölda sem á að bæta við körfu með því að athuga
  // á input
  


  const quantityInput = parent.querySelector('input[name="quantity"]');
  const quantity = quantityInput ? Number.parseInt(quantityInput.value) : 1;

  console.log(quantityInput)
  console.log(quantity)

  // Bætum vöru í körfu (hér væri gott að bæta við athugun á því að varan sé til)
  addProductToCart(product, quantity);
}

// Finna öll form með class="add"
const addToCartForms = document.querySelectorAll('.add')

// Ítra í gegnum þau sem fylki (`querySelectorAll` skilar NodeList)
for (const form of Array.from(addToCartForms)) {
  // Bæta submit event listener við hvert
  form.addEventListener('submit', submitHandler);
}

// TODO bæta við event handler á form sem submittar pöntun
function handleCheckout(event) {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const address = document.getElementById('address').value;

  if (!name.trim() || !address.trim()) {
    alert('Please fill in all the fields.');
    return;
  }


  console.log('Checkout data:', { name, address });

  event.target.reset();
  alert('Pöntun móttekin!');

  document.getElementById('checkoutForm').style.display = 'none';

  const receiptSection = document.querySelector('.receipt');
  if (receiptSection) {
    receiptSection.style.display = 'block'; 
  }




  event.preventDefault();
}

document.getElementById('checkoutForm').addEventListener('submit', handleCheckout);