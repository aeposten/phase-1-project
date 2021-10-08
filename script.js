////////// PRIORITIES 

// cart needs work 


// we need to decide on a store name 
// and go over elements on the page to make sure it functions 



// retrevives data for  the store page
fetch('https://fakestoreapi.com/products')
.then(res=>res.json())
.then(e=>storeImage(e))

// general purpose counter to be used in functions
let num = 0 
let x = 0
let total = 0 
let numCounter = 0
let cartArray 


// here we specify where the search bar is and add a event listener to catch the keystrokes
let searchLoc = document.querySelector(".search")
console.log(searchLoc)
 searchLoc.addEventListener("keydown",  (e) =>
 {if (e.key === "Enter"){ search(e.target.value)}})
let searchButton = document.querySelector(".search-button")
searchButton.addEventListener("click", (e)=> search(e.target.parentNode.firstChild.value))
console.log(searchLoc)





// storeImage is what displays all the items for the store
function storeImage (e){
    // we use a for loop to seperate the object into individual products 
   
console.log(e)
    for(let pro of e){


/// defining locations of elements using querySelectorAll and [num] allows us append each product to a new div node 
let nameLoc = document.querySelectorAll(".product-name")[num]
let imgLoc = document.querySelectorAll("#product-image")[num]
let pricLoc = document.querySelectorAll("#price")[num]
let cartLoc = document.querySelectorAll("#to-cart")[num]
let descLoc = document.querySelectorAll(".descbutton")[num]


// appending the products to their elements
nameLoc.innerHTML = pro.title
imgLoc.src = pro.image
imgLoc.style.height = "200px"
imgLoc.style.width = "200px"
// descLoc.setAttribute("style", "width:250px");
pricLoc.innerHTML = `$${pro.price.toFixed(2)}`
descLoc.innerHTML = pro.description


// counting up for the queryselectorAlls earlier in the loop
num = num +1

//here we select the node we want to copy it and append it below the original node
let proLoc = document.querySelector(".items")
let proloc1= proLoc.cloneNode(true)
let body = document.querySelector("body")
body.append(proloc1);




/// SHOPPING CART GOES HERE

// This will look for a click event on the add to cart button 
cartLoc.addEventListener('click', ()=> {

  let numLoc = document.querySelectorAll(".num")[1]
  numCounter = numCounter +1
 numLoc.innerHTML = numCounter
  // this works like the store image function does. 
// it will append the item to the shoping cart node, then clone that node and move on to the next node


// the counter allows us to move to the next cart node
  let cartnum = 0

  /// decalring variables for locatiosjn 
  const cartName = document.querySelectorAll('#cartname')[cartnum]
  const cartImage = document.querySelectorAll('#cartimg')[cartnum]
  const cartPrice = document.querySelectorAll(".item-price")[cartnum]
const  cartTotal = document.querySelector(".shopping-cart-total")
const cartAmount = document.querySelector(".quantity")
let cartNode = document.querySelectorAll(".dropdown")[cartnum]
let shopp = document.querySelector(".shopping-cart-items")
let shopCartLoc = cartNode.cloneNode(true) /// this makes a new node. Once the click event happens again it will be used for the next item
let checkout = document.querySelector(".button")



// this is just to make things cleaner
let priceOfItem = pricLoc.innerHTML.slice(1)
let nameOfItem = nameLoc.innerHTML

// Parse float just makes sure that total is formated correctly. 
total = parseFloat(total,10) + parseFloat(priceOfItem, 10)
total = total.toFixed(2)

/// Cart object this is just a placeholder that will be replaced below 
let cartObjTrue = {
  name:1,
  image:1,
  price:1,
  quantity:1
  
  }

  console.log
  // this is used to determain if this is the first time if this has been fun. 
  if(cartArray == undefined){
cartArray = []

  
  /// here we assin the keys to the cart object and add the cart ocject to the cart array 
    cartObjTrue.name = nameOfItem
cartObjTrue.image=imgLoc.src
cartObjTrue.price=priceOfItem
cartArray.unshift(cartObjTrue)


// here we append the item to a node 
cartPrice.innerHTML = `$${priceOfItem}`
cartName.innerHTML = nameOfItem
cartImage.src = imgLoc.src
cartTotal.innerHTML = `Total: $${total}`
cartAmount.innerHTML = 1
cartImage.prepend(imgLoc.src)
cartnum= cartnum + 1

}

else {

  /////////////////////////////////// below for loop/ if statement will check to see if an item is on the shopping cart already if it is it will
  ////////////////////////////////// update that item instead of creat a new one /////////// doesnt work lol 
// //for (let i = 0; i< counter ;i++){

// if (nameLoc.innerHTML == cartArray[i].name){
//   let  cartamounttrue = document.querySelectorAll(".quantity")

//  cartArray[i].quantity = cartArray[i].quantity + 1

// // console.log(cartamounttrue[i].innerHTML)
// cartamounttrue[i].innerHTML =  cartArray[i].quantity
// //console.log("item is in cart")
// console.log("if")

// }else  
// {



cartObjTrue.name = nameOfItem
cartObjTrue.image=imgLoc.src
cartObjTrue.price=priceOfItem



// here we append the item to a node 
cartPrice.innerHTML = `$${priceOfItem}`
cartName.innerHTML = nameOfItem
cartImage.src = imgLoc.src
cartTotal.innerHTML = `Total: $${parseFloat(total,10)}`
cartImage.prepend(imgLoc.src)
cartArray.unshift(cartObjTrue)
cartnum= cartnum + 1


shopp.append(shopCartLoc)
//}




}
console.log(cartTotal)
console.log(cartArray)
checkout.addEventListener("click",()=>
fetch('https://fakestoreapi.com/carts',{
            method:"POST",
            body:JSON.stringify(
             cartArray
            )
        })
            .then(res=>res.json())
            .then(json=>console.log(json),location.reload())



)









})  
}






// making a variable to make this cleaner
let i = document.querySelectorAll('.items').length
//  The first node and last node are repated. This checks to see if there is more than one node 
// if there is it will delete the first one so that it isn't repated
if (i > 1){
  document.querySelector(".items").remove()
}

}



///What the user searches goes here 
function search(search){
    // we reset the counter here so that the search results append over the top nodes
    num = 0
    



/// here we grab all the categories 
  fetch('https://fakestoreapi.com/products/categories')
  .then(res=>res.json())
  .then(function (categories) {
    
  /// here we ensure that the category being searched is a correct one. 
if (categories.includes(search))
{ 
// Makes a variable to make this cleaner
let itemsToBeRemoved = document.querySelectorAll(".items").length
// This loop for every single .item in the dom except for the last one and remove them
//we do this as otherwise it will create too many  nodes
for (let i = 0; i < itemsToBeRemoved-1; i++){
  
document.querySelector(".items").remove()
}
    fetch(`https://fakestoreapi.com/products/category/${search}`) // here we grab all the results for selected category 
    .then(res=>res.json())
    .then((e)=> storeImage(e)) // we callback the storeImage function to display the data  
}
// This else statement will alert the user if they have searched an incorrect category 
 else { alert(`Please search one of the following categories: ${categories}`) }
  })}


  

  let modal = document.querySelector(".box");
  let show = document.querySelector(".descbutton");
  let closeButton = document.querySelector(".closedesc");
  
  function toggleModal() {
    console.log("hi")
      modal.classList.toggle("show-modal");
  
  }
  function windowOnClick(event) {
console.log(event.target)
console.log(modal.parentNode.childNodes[5])
     if (event.target === modal.parentNode) {
        console.log("hi")
          toggleModal();
  
     }
  
  }



  let storeNameLoc = document.querySelector("h1")
  let storeNameLoc2 = document.querySelector(".navbar-left").children[0]
 
storeNameLoc.addEventListener("click", () =>{
console.log(storeNameLoc2)
let storeName = prompt("Please enter your store's name", "Store Name")
storeNameLoc.innerHTML = storeName
storeNameLoc2.innerHTML = storeName



})


  
  // show.addEventListener("click", toggleModal);
  // closeButton.addEventListener("click", toggleModal);
  // window.addEventListener("click", windowOnClick);
  