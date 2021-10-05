fetch("https://fakestoreapi.com/products")
  .then((res) => res.json())
  .then((e) => storeImage(e));
let num = 0;

function storeImage(e) {
  for (let pro of e) {
    console.log(e);
    let nameLoc = document.querySelectorAll("#product-name")[num];
    let imgLoc = document.querySelectorAll("#product-image")[num];
    let pricLoc = document.querySelectorAll("#price")[num];
    let cartLoc = document.querySelectorAll("#to-cart")[num];
    let descLoc = document.querySelectorAll("#description")[num];

    nameLoc.innerHTML = pro.title;
    imgLoc.src = pro.image;
    imgLoc.style.height = "200px";
    imgLoc.style.width = "200px";
    descLoc.setAttribute("style", "width:250px");
    pricLoc.innerHTML = pro.price;
    descLoc.innerHTML = pro.description;

    num = num + 1;
    let proLoc = document.querySelector(".items");
    let proloc1 = proLoc.cloneNode(true);

    let body = document.querySelector("body");
    body.append(proloc1);
  }
}
