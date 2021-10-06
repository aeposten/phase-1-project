// retrevives data for
fetch("https://fakestoreapi.com/products")
  .then((res) => res.json())
  .then((e) => storeImage(e));

// general purpose counter to be used in functions
let num = 0;
let x = 0;

// here we specify where the search bar is and add a event listener to catch the keystrokes
let searchLoc = document.querySelector(".search");
searchLoc.addEventListener("keydown", (e) => search(e.target.value));

// storeImage is what displays all the items for the store
function storeImage(e) {
  // we use a for loop to seperate the object into individual products
  for (let pro of e) {
    /// defining locations of elements using querySelectorAll and [num] allows us append each product to a new div node
    let nameLoc = document.querySelectorAll(".product-name")[num];
    let imgLoc = document.querySelectorAll("#product-image")[num];
    let pricLoc = document.querySelectorAll("#price")[num];
    let cartLoc = document.querySelectorAll("#to-cart")[num];
    let descLoc = document.querySelectorAll("#description")[num];

    // appending the products to their elements
    nameLoc.innerHTML = pro.title;
    imgLoc.src = pro.image;
    imgLoc.style.height = "200px";
    imgLoc.style.width = "200px";
    descLoc.setAttribute("style", "width:250px");
    pricLoc.innerHTML = pro.price;
    descLoc.innerHTML = pro.description;

    // counting up for the queryselectorAlls earlier in the loop
    num = num + 1;

    //here we select the node we want to copy and copy it and append it below the original node
    let proLoc = document.querySelector(".items");
    let proloc1 = proLoc.cloneNode(true);
    let body = document.querySelector("body");
    body.append(proloc1);
  }
  console.log(e.length);

  /// we need all of the div nodes that are more than e.length for the search to work properly.
  // using e.length and queryselectorall we can find the last node, maybe that and a couinter can remove all the nodes > than that ??????
  // an if statement might work best

  let numOfDiv = document.querySelectorAll(".items").length;
  let numofDivsToDsiplay = e.length;
  console.log(numOfDiv);
  for (let x = 0; x < numOfDiv; x++) {
    if (x > numofDivsToDsiplay) {
      document.querySelectorAll(".items")[x].remove();
      console.log(x);
      console.log(numOfDiv);
    }
  }
}

///What the user searches goes here
function search(search) {
  // we reset the counter here so that the search results append over the top nodes
  num = 0;

  fetch(`https://fakestoreapi.com/products/category/${search}`)
    .then((res) => res.json())
    .then((e) => storeImage(e)); // we callback the storeImage function to display the data
}

// (function () {
//   $("#cart").on("click", function () {
//     $(".shopping-cart").fadeToggle("fast");
//   });
// })();
