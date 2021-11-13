let carts = document.querySelectorAll('.add-cart');


let products = [
    {
        name: 'Betsy Vintage Tee',
        price: 15.99,
        inCart: 0
    },
    {
        name: 'Temptations Cafe Tee',
        price: 15.99,
        inCart: 0
    },
    {
        name: 'SugarCamp Sticker Roll',
        price: 2.99,
        inCart: 0
    }
];

for(let i=0; i < carts.length; i++){
    console.log("my loop");
    carts[i].addEventListener('click', ()=>{
        cartNumbers(products[i]);
        totalCost(products[i]);
    })
}


function onLoadCartNumbers(){
    let productNumbers = localStorage.getItem('cartNumbers');
    if(productNumbers){
        document.querySelector('.navbar__item span').textContent = productNumbers;
    }
}

function cartNumbers(product){
    let productNum = localStorage.getItem('cartNumbers');

    productNum = parseInt(productNum);
    if(productNum){
        localStorage.setItem('cartNumbers', productNum+1);
        document.querySelector('.navbar__item span').textContent = productNum + 1;

    } else{
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.navbar__item span').textContent = 1;
    }
    setItems(product);
    
}

function setItems(product){
    console.log("My product is", product);
    let cartItems = localStorage.getItem('productsInCart');

    cartItems = JSON.parse(cartItems);

    if(cartItems != null){

        if(cartItems[product.name] == undefined){
            cartItems = {
                ...cartItems,
                [product.name]: product
            }
        }
        cartItems[product.name].inCart +=1;
    }else{
        product.inCart = 1;
        cartItems = {
            [product.name]: product
        }
    }
    localStorage.setItem("productsInCart", JSON.stringify(cartItems) );
}

function totalCost(product){
    let cartCost = localStorage.getItem('totalCost');
    localStorage.setItem("totalCost", product.price);

    if(cartCost != null){
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + Math.round(product.price));
    }else{
        localStorage.setItem("totalCost", Math.round(product.price));
    }
}

function displayCart(){
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector(".products");
    console.log(productContainer);
    let cartCost = localStorage.getItem('totalCost');

    if( cartItems && productContainer ){
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item =>{
            productContainer.innerHTML += `
            <div class="product">
                <ion-icon name="close-circle-outline"></ion-icon>
                <img src="./images/${item.name}.jpg">
                <span>${item.name}</span>
            </div>
            <div class="price">$${item.price}</div>
            <div class="quantity">
                <ion-icon name="caret-back-outline"></ion-icon>
                <span>${item.inCart}</span>
                <ion-icon name="caret-forward-outline"></ion-icon>
                
            </div>
            <div class="total">
                ${item.inCart * item.price} 
            </div>`
        });
        productContainer.innerHTML += `
        <div class="basketTotalContainer">
            <h4 class basketTotalTitle">
                Total:
            </h4>
            <h4 class="basketTotal">
                 $${cartCost}
            </h4>
        </div>`

    }
}

onLoadCartNumbers();
displayCart();