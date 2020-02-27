document.addEventListener("DOMContentLoaded", function(event){

    var ProductObject = function (pProductName, pPrice) {
        this.ProductName = pProductName;
        this.Price = pPrice;
    }

    //productList array is full of actual product objects.
    //however, user cart is simply integers indicating how many of each [indexed product] is in cart.
    //protections for going under 0 should be in place when at the cart page.
    let productList = [];
    let userCart = [];
    
    //create products
    let product0 = new ProductObject("Stereo", 200);
    let product1 = new ProductObject("Speakers", 150);
    let product2 = new ProductObject("Remote control", 20);
    

    //push each product to the product list
    productList.push(product0);
    productList.push(product1);
    productList.push(product2);

    //fill cart with 0, as the cart is empty
    for (var i = 0; i < productList.length; i++){
        userCart.push(0);
    }

    //empty the cart after purchase
    function emptyCart(){
        for (var i = 0; i < userCart.length; i++){
            userCart[i] = 0;
        }
    }

    document.getElementById("btnRecommend").addEventListener("click", displayRandomProduct);

    function displayRandomProduct(){
        let rnd = Math.floor((Math.random() * productList.length));
        document.getElementById("recommended").innerHTML = "Try the " + productList[rnd].ProductName + " for only " + productList[rnd].Price + " yollars today!";
        document.getElementById("recommendedImg").src = "images/products/" + productList[rnd].ProductName + ".jpg";
    }

    displayRandomProduct();


    function addToCartFirst(pProduct){
        for (var i = 0; i < productList.length; i++){
            if (pProduct == productList[i]){
                userCart[i] = userCart[i] + 1;
            }
        }
        alert("Added one " + pProduct.ProductName + " to cart!");
        console.log(userCart);
    }

    //display name, picture, and price along with a button to buy
    function displayProduct(pProduct, pHtmlName, pHtmlPrice, pImage, pButton){
        document.getElementById(pHtmlName).innerHTML = pProduct.ProductName;
        document.getElementById(pHtmlPrice).innerHTML = "$" + pProduct.Price;  
        document.getElementById(pImage).src = "images/products/" + pProduct.ProductName + ".jpg";
        document.getElementById(pButton).addEventListener("click", function(){ addToCartFirst(pProduct)});
    }

    //displayProduct method used on page1
    displayProduct(productList[0], "productName0", "productPrice0", "productImg0", "btnCart0");
    displayProduct(productList[1], "productName1", "productPrice1", "productImg1", "btnCart1");
    displayProduct(productList[2], "productName2", "productPrice2", "productImg2", "btnCart2");

    //inflexible display cart method
    function displayCart(){
        document.getElementById("stereoAmt").innerHTML = userCart[0];
        document.getElementById("speakerAmt").innerHTML = userCart[1];
        document.getElementById("remoteAmt").innerHTML = userCart[2];
    }

    //flexible add and subtract from cart methods
    function addToCart(productInt){
        userCart[productInt]++;
        displayCart();
    }
    function subtractFromCart(productInt){
        if (userCart[productInt] == 0){
            alert("There are no items to remove!");
        } else {
            userCart[productInt]--;
            displayCart();
        }
    }

    //get price total of all items in cart
    function getTotal() {
        let total = 0;
        for(var i = 0; i < userCart.length; i++){
            total += (productList[i].Price * userCart[i]);
        }
        return total;
    }

    //show the current total on the purchase page
    function displayPurchase(){
        let cartTotal = getTotal();
        if (cartTotal > 0){
            document.getElementById("cartMessage").innerHTML = "Your total is: " + cartTotal;
        } else {
            document.getElementById("cartMessage").innerHTML = "There's nothing in your cart! Please add something to it.";
        }
    }

    //purchase all items in cart when button is pressed
    function purchaseItems(){
        if (getTotal() > 0){
            alert("Thank you for your purchase! $" + getTotal() + " has been deducted from your account. See you soon!");
            emptyCart();
            displayPurchase();
        } else {
            alert("Nothing in cart!");
        }

    }

    //activate all buttons on the cart page
    document.getElementById("btnStereoMinus").addEventListener("click", function(){subtractFromCart(0)});
    document.getElementById("btnStereoPlus").addEventListener("click", function(){addToCart(0)});
    document.getElementById("btnSpeakerMinus").addEventListener("click", function(){subtractFromCart(1)});
    document.getElementById("btnSpeakerPlus").addEventListener("click", function(){addToCart(1)});
    document.getElementById("btnRemoteMinus").addEventListener("click", function(){subtractFromCart(2)});
    document.getElementById("btnRemotePlus").addEventListener("click", function(){addToCart(2)});
    document.getElementById("btnPurchase").addEventListener("click", function(){purchaseItems()});

    //load up amounts on the cart page and purchase page
    $(document).on("pagebeforeshow", "#page2", function(){
        displayCart();
    });
    $(document).on("pagebeforeshow", "#page3", function(){
        displayPurchase();
    });

});