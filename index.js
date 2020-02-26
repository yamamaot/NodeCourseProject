document.addEventListener("DOMContentLoaded", function(event){

    var ProductObject = function (pProductName, pPrice) {
        this.ProductName = pProductName;
        this.Price = pPrice;
    }

    //productList array is full of actual product objects.
    //however, user cart is simply integers indicating how many of each [indexed product] is in cart.
    //protections for going under 0 should be in place when at the cart page.
    let productList = [];
    let priceList = [];
    let userCart = [];
    

    let product0 = new ProductObject("Stereo", 200);
    let product1 = new ProductObject("Speakers", 150);
    let product2 = new ProductObject("Remote control", 20);
    

    //push each product to the product list
    productList.push(product0);
    productList.push(product1);
    productList.push(product2);
    priceList.push(product0.Price);
    priceList.push(product1.Price);
    priceList.push(product2.Price);

    //fill cart with 0, as the cart is empty
    for (var i = 0; i < productList.length; i++){
        userCart.push(0);
    }


    //console.log(productList);

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

        //test displayProduct method on page1
        displayProduct(productList[0], "productName1", "productPrice1", "productImg1", "btnCart1");

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

    function getTotal() {
        let total = 0;
        for(var i = 0; i < priceList.length; i++){
            total += (priceList[i] * userCart[i]);
        }
        console.log(total);
    }

    document.getElementById("btnStereoMinus").addEventListener("click", function(){subtractFromCart(0)});
    document.getElementById("btnStereoPlus").addEventListener("click", function(){addToCart(0)});
    document.getElementById("btnSpeakerMinus").addEventListener("click", function(){subtractFromCart(1)});
    document.getElementById("btnSpeakerPlus").addEventListener("click", function(){addToCart(1)});
    document.getElementById("btnRemoteMinus").addEventListener("click", function(){subtractFromCart(2)});
    document.getElementById("btnRemotePlus").addEventListener("click", function(){addToCart(2)});

    $(document).on("pagebeforeshow", "#page2", function(){
        displayCart();
    });
    $(document).on("pagebeforeshow", "#page3", function(){
        getTotal();
    });

});


/*
$(document).on("pagebeforeshow", "#page2", function(event){
    document.getElementById("IDparmHere").innerHTML = "";
    createList();
});

function createList() {
  var divUserlist = document.getElementById("userlist");
  while (divUserlist.firstChild) {    // remove any old data so don't get duplicates
      divUserlist.removeChild(divUserlist.firstChild);
  };
  var ul = document.createElement('ul');
  userArray.forEach(function (element,) {   // use handy array forEach method
      var li = document.createElement('li');
      // add player names with an anchor to get to next "page"  #pickbet
      // use the html5 all purpose data-parm to set and pass along, the playerID for the li that is clicked
      li.innerHTML = "<a data-transition='pop' class='onePlayer' data-parm=" + element.PlayerID + " href='#pickbet'> Pick your bet size. </a> " + element.PlayerFirstName + " " + element.PlayerLastName;
      ul.appendChild(li);
  });
  //$("#notes").listview('refresh');  // maybe ?need this so jquery mobile will apply the styling to the newly added li's  
  divUserlist.appendChild(ul);

  // set up an event for each new li item, if user clicks any, it writes >>that<< items data-parm into the hidden html 
  var classname = document.getElementsByClassName("onePlayer");
  Array.from(classname).forEach(function (element) {
      element.addEventListener('click', function(){
          var parm = this.getAttribute("data-parm");  // passing in the record.Id
          //do something here with parameter on  pickbet page
          document.getElementById("IDparmHere").innerHTML = parm;
          document.location.href = "index.html#pickbet";
      });
  });
}; */