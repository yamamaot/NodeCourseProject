document.addEventListener("DOMContentLoaded", function(event){

var ProductObject = function (pProductName, pPrice) {
  this.ProductName = pProductName;
  this.Price = pPrice;
}

let productList = [];
let userCart = [];
let recommended = document.getElementById("recommended");

let product0 = new ProductObject("Stereo", 200);
let product1 = new ProductObject("Speakers", 150);
let product2 = new ProductObject("Remote control", 20);

productList.push(product0);
productList.push(product1);
productList.push(product2);


console.log(productList);

document.getElementById("btnRecommend").addEventListener("click", displayRandomProduct);

function displayRandomProduct(){
    let rnd = Math.floor((Math.random() * productList.length));
    //let rnd = 0;
    recommended.innerHTML = "Try the " + productList[rnd].ProductName + " for only " + productList[rnd].Price + " yollars today!";
}

displayRandomProduct();

function displayAllProducts(){
    
}

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