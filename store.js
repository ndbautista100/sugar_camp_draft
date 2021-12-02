let carts = document.querySelectorAll('.add-cart');



let products = [
    {
        name: 'Betsy Vintage Tee',
        price: 15.99,
        inCart: 0,
        stock: 1
    },
    {
        name: 'Temptations Cafe Tee',
        price: 15.99,
        inCart: 0,
        stock: 1
    },
    {
        name: 'SugarCamp Stickers',
        price: 2.99,
        inCart: 0,
        stock: 5
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

function addOne(){
    const EL_button = event.currentTarget;
    //const id = this.closest("span"); // i.e: "245"
    var span_Text = document.getElementById("span_add").innerText;
    var span_Price = document.getElementById("span_addprice").innerText;
    console.log(span_Price);
    console.log("before : ", window.localStorage.productsInCart);  //display it
    var favs = JSON.parse(window.localStorage.productsInCart || {});  //read and convert to object
    var cartNum = JSON.parse(window.localStorage.cartNumbers || {});
    var cost = parseInt(JSON.parse(window.localStorage.totalCost || {}));
    if (favs[span_Text]) {  //check if key exists
        cartNum = cartNum + 1;
        favs[span_Text].inCart = favs[span_Text].inCart + 1;
        cost = cost + Math.round(span_Price);
    }
    window.localStorage.productsInCart = JSON.stringify(favs);  //save it back
    window.localStorage.cartNumbers = JSON.stringify(cartNum);
    window.localStorage.totalCost = JSON.stringify(cost);
    console.log("after : ", window.localStorage.productsInCart);
    console.log("after : ", window.localStorage.cartNumbers);
    console.log("after : ", window.localStorage.totalCost);
    window.location.reload();
}

function remove(product){
    const EL_button = event.currentTarget;
    //const id = this.closest("span"); // i.e: "245"
    var span_Text = document.getElementById("span_remid").innerText;
    var span_Price = document.getElementById("span_remprice").innerText;
    console.log(span_Price);
    console.log("before : ", window.localStorage.productsInCart);  //display it
    var favs = JSON.parse(window.localStorage.productsInCart || {});  //read and convert to object
    var cartNum = JSON.parse(window.localStorage.cartNumbers || {});
    var cost = parseInt(JSON.parse(window.localStorage.totalCost || {}));
    if(favs[span_Text].inCart == 1)
    {
        if (favs[span_Text]) {  //check if key exists 
            delete favs[span_Text];
            cost =  Math.round(cost - span_Price); //remove the key from object
            cartNum = cartNum - 1;
        }
        window.localStorage.productsInCart = JSON.stringify(favs);  //save it back
        window.localStorage.cartNumbers = JSON.stringify(cartNum);
        window.localStorage.totalCost = JSON.stringify(cost);
        console.log("after : ", window.localStorage.productsInCart);
        console.log("after : ", window.localStorage.cartNumbers);
        console.log("after : ", window.localStorage.totalCost);
        window.location.reload();
    }
    else{
        if (favs[span_Text]) {  //check if key exists
            cartNum = cartNum - 1;
            favs[span_Text].inCart = favs[span_Text].inCart - 1;
            cost = Math.round(cost - span_Price);
        }
        window.localStorage.productsInCart = JSON.stringify(favs);  //save it back
        window.localStorage.cartNumbers = JSON.stringify(cartNum);
        window.localStorage.totalCost = JSON.stringify(cost);
        console.log("after : ", window.localStorage.productsInCart);
        console.log("after : ", window.localStorage.cartNumbers);
        console.log("after : ", window.localStorage.totalCost);
        window.location.reload();

    }
    
    
}

function removeAll(prod){
    const EL_button = event.currentTarget;
    //const id = this.closest("span"); // i.e: "245"
    console.log(prod.id);
    var span_Text = document.getElementById("span_id").innerText;
    var span_Price = document.getElementById("span_price").innerText;
    var span_Quantity = document.getElementById("span_quantity").innerText;
    console.log(span_Price);
    console.log("before : ", window.localStorage.productsInCart);  //display it
    var favs = JSON.parse(window.localStorage.productsInCart || {});  //read and convert to object
    var cartNum = JSON.parse(window.localStorage.cartNumbers || {});
    var cost = parseInt(JSON.parse(window.localStorage.totalCost || {}));
    console.log("cart numbers", typeof(favs[prod.id].inCart));
    if (favs[prod.id]) {  //check if key exists 
        cartNum = cartNum - favs[prod.id].inCart;
        delete favs[prod.id];
        cost =  Math.round(cost - (span_Quantity * span_Price)); //remove the key from object
        //cartNum = cartNum - favs[prod.id].inCart;
    }
    window.localStorage.productsInCart = JSON.stringify(favs);  //save it back
    window.localStorage.cartNumbers = JSON.stringify(cartNum);
    window.localStorage.totalCost = JSON.stringify(cost);
    console.log("after : ", window.localStorage.productsInCart);
    console.log("after : ", window.localStorage.cartNumbers);
    console.log("after : ", window.localStorage.totalCost);
    window.location.reload();
}

function displayCart(){
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector(".products");
    
    let cartCost = localStorage.getItem('totalCost');

    if( cartItems && productContainer ){
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item =>{
            if(item.stock > 1){
                productContainer.innerHTML += `
            <div class="product" >
                <img src="./images/${item.name}.jpg">
                <span>${item.name}</span>
                    <ion-icon name="close-circle-outline" id="${item.name}" onClick="removeAll(this)">
                    <span id="span_id" style="display:none">${item.name}</span>
                    <span id="span_price" style="display:none">${item.price}</span>
                    <span id="span_quantity" style="display:none">${item.inCart}</span>
                    </ion-icon>
                
            </div>
            <div class="price">$${item.price}</div>
            <div class="quantity">
                <ion-icon name="caret-back-outline" onClick="remove(this)">
                    <span id="span_remid" style="display:none">${item.name}</span>
                    <span id="span_remprice" style="display:none">${item.price}</span>
                    <span id="span_remquantity" style="display:none">${item.inCart}</span>
                </ion-icon>
                <span>${item.inCart}</span>
                <ion-icon name="caret-forward-outline" onClick="addOne()">
                    <span id="span_add" style="display:none">${item.name}</span>
                    <span id="span_addprice" style="display:none">${item.price}</span>
                    <span id="span_addquantity" style="display:none">${item.inCart}</span>
                </ion-icon>
                
            </div>
            <div class="total">
                $${item.inCart * item.price} 
            </div>`
            }else{
            productContainer.innerHTML += `
            <div class="product">
                <img src="./images/${item.name}.jpg">
                <span>${item.name}</span>
                    <ion-icon name="close-circle-outline" id="${item.name}" onClick="remove()">
                    <span id="span_remid" style="display:none">${item.name}</span>
                    <span id="span_remprice" style="display:none">${item.price}</span>
                    <span id="span_remquantity" style="display:none">${item.inCart}</span>
                    </ion-icon>
                
            </div>
            <div class="price">$${item.price}</div>
            <div class="quantity">
                <span>${item.inCart}</span>
                
            </div>
            <div class="total">
                $${item.inCart * item.price} 
            </div>`}
        });
        productContainer.innerHTML += `
        <div class="basketTotalContainer">
            <h4 class basketTotalTitle">
                Total:
            </h4>
            <h4 class="basketTotal">
                 $${cartCost}
            </h4>
            <a href="payment.html">
                <button type="button">Checkout</button>
            </a>
        </div>`
        

    }
}

onLoadCartNumbers();
displayCart();