
const sliderImages = [
  {images:"url(/images/waiter.jpg)"},
  {images:"url(/images/dogfetch.jpg)"},
  {images:"url(/images/resturant1.jpg)"}
]
let sliderbackground = document.querySelector(".starterArea--template").style
imgCounter = 0
function sliderRight(){
  sliderbackground.backgroundImage = sliderImages[imgCounter].images
  imgCounter++
  if(imgCounter > sliderImages.length-1){
    imgCounter = 0
  }
}
function sliderLeft(){
  if(imgCounter == 0){
    imgCounter = 2
    console.log("2")
    sliderbackground.backgroundImage = sliderImages[1].images
  }else if(imgCounter == 2){
    console.log("1")
    imgCounter = 1
    sliderbackground.backgroundImage = sliderImages[0].images
  }else if(imgCounter == 1){
    console.log("0")
    imgCounter = 0
    sliderbackground.backgroundImage = sliderImages[2].images
  }
}
setInterval(()=>{
  sliderRight()
},5000)

slideRightButton = document.querySelector(".fa-long-arrow-alt-right")
slideRightButton.addEventListener("click",()=>{
  console.log("yeah clicked")
  if(imgCounter == 3){
    imgCounter=0
    sliderRight()
  }else{
    sliderRight()}
})
slideLeftButton = document.querySelector(".fa-long-arrow-alt-left")
slideLeftButton.addEventListener("click",()=>{
  sliderLeft()
  
})

// above is just for the slider menu ----

// Goal to build a timer that counts down from 5mins
// 0. start with a function
// 1. build timer outline 00.02.00
// 2. use set interval 
// 3. minues each number
let getMiddleNumber = document.getElementById("middle-Counter")
let getRightNumber = document.getElementById("right-Counter")
let MiddleCountDown = 4
let RightCountDown = 60

let CountDownTimer = setInterval(()=>{
  getMiddleNumber.innerText = `0${MiddleCountDown}.`
  RightCountDown = Math.floor(RightCountDown-1)
  getRightNumber.innerText = RightCountDown
  if(MiddleCountDown == 0 && RightCountDown == 0){
    clearInterval(CountDownTimer)
  }
  if(RightCountDown == 0){
    RightCountDown = 59
    MiddleCountDown-=1
  }
  
},1000)



// below is the api to search for foods
let foodToSearch = null;
const YOUR_APP_ID = "4f8a14de"
const YOUR_APP_KEY = "9b9c0fb4904a63e366b8342ca9279f97"
// 1 when you press enter get search value (e:g words typed) and get api
RecipeEnterKey = document.getElementById("food-input")
RecipeEnterKey.addEventListener("keydown",(event)=>{
  if(event.key == "Enter"){
    console.log("Enter key pressed")
    return handleFoodChange()
  }
})
// 2 when clicked get search value 
RecipeClick = document.getElementById("recipe-button")
RecipeClick.addEventListener("click",handleFoodChange)

// 3. check if there is a value typed and call api
function handleFoodChange() {
  foodToSearch = document.getElementById("food-input").value;
  if(foodToSearch.length <= 1){
    return alert("type a word before pressing enter")
  }else{
    return fetchRecipe(foodToSearch)
  }
}
// 4 get recipe searched for and fill in the info on screen (e:g images, ingrediants)
async function fetchRecipe(food) {
  let response = await fetch(`https://api.edamam.com/search?q=${food}&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}`)
  let data = await response.json()
  let randNum = Math.floor(Math.random()*data.hits.length)
  console.log(data.hits[2].recipe.image)
  let randRecipe = data.hits[randNum].recipe
  getImagesURL(randRecipe.image)
  getfoodLabel(randRecipe.label)
  getDishType(randRecipe.dishType)
  getCuisineType(randRecipe.cuisineType)
  getCalories(randRecipe.calories)
  getTotalWeight(randRecipe.totalWeight)
  getIngredients(randRecipe.ingredientLines)
  getIngredientslist(randRecipe.ingredients)
  getsavedRecipes(randRecipe.label,randRecipe.url)
}
function getImagesURL(url){
  document.querySelector("#apiImage").src = url
}
function getfoodLabel(label){
  document.querySelector(".FoodArea--box--topright--label").innerText = label 
}
function getDishType(dishtype){
  document.querySelector(".dishtype").innerText = dishtype
}
function getCuisineType(cuisine){
  document.querySelector(".cuisinetype").innerText = cuisine
}
function getCalories(cal){
  document.querySelector(".calories").innerText = cal
}
function getTotalWeight(weight){
  document.querySelector(".totalweight").innerText = weight
}
function getIngredients(ingr){
  document.querySelector(".FoodArea--box--bottomright-ingrediants").innerText = ingr
}
let ingrediantsList = document.querySelector(".FoodArea--box--bottomright-ingrediantslist")
function getIngredientslist(ingri){
  ingrediantsList.innerHTML = ""
  ingri.forEach((item)=>{
    CreatedLi = document.createElement("li")
    CreatedLi.innerText = item.text
    ingrediantsList.append(CreatedLi)
  })
}
let savedRecipe = document.querySelector(".FoodArea--box--bottomleft-table")
function getsavedRecipes(label,url){
  let createTR = document.createElement("tr")
  let createTD1 = document.createElement("td")
  let createTD2 = document.createElement("td")
  let createA = document.createElement("a")
  createTD1.innerText = label
  createA.href = url
  createA.target = "_blank"
  createA.innerText = label
  createTD2.append(createA)
  createTR.append(createTD1,createTD2)
  savedRecipe.append(createTR)
}

async function returnFoodAPI(food,callback){
  let response = await fetch(`https://api.edamam.com/search?q=${food}&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}`)
  data = await response.json()
  callback(data.hits)
}

// 1. grab the object from the fetch
// 2. call the object and use the data to change background of each box
// 3. must be a call back since we are waiting for the fetch and u need practice
function getBoxNumberIMG(numb){
  let getbox = document.querySelector(`.selectionArea--grid--box${numb}`)
  return getbox.style
}
function getInnerPTag(numb){
  let getP = document.querySelector(`.selectionArea--grid--box${numb} p`)
  return getP
}
  // this was me just practising callback functions i understand there outdated an are bad practice
function getSelectionImages(){
  returnFoodAPI("pizza",(data)=>{
    let backgroundImage = `URL(${data[2].recipe.image})`
    getBoxNumberIMG(1).backgroundImage = backgroundImage
    getInnerPTag(1).innerText = data[2].recipe.label
  })
  returnFoodAPI("pasta",(data)=>{
    let backgroundImage = `URL(${data[2].recipe.image})`
    getBoxNumberIMG(2).backgroundImage = backgroundImage
    getInnerPTag(2).innerText = data[2].recipe.label
  })
  returnFoodAPI("burger",(data)=>{
    let backgroundImage = `URL(${data[2].recipe.image})`
    getBoxNumberIMG(3).backgroundImage = backgroundImage
    getInnerPTag(3).innerText = data[2].recipe.label
  })
  returnFoodAPI("soup",(data)=>{
    let backgroundImage = `URL(${data[2].recipe.image})`
    getBoxNumberIMG(4).backgroundImage = backgroundImage
    getInnerPTag(4).innerText = data[2].recipe.label
  })
  returnFoodAPI("salad",(data)=>{
    let backgroundImage = `URL(${data[4].recipe.image})`
    getBoxNumberIMG(5).backgroundImage = backgroundImage
    getInnerPTag(5).innerText = data[2].recipe.label
  })
  returnFoodAPI("bread",(data)=>{
    let backgroundImage = `URL(${data[2].recipe.image})`
    getBoxNumberIMG(6).backgroundImage = backgroundImage
    getInnerPTag(6).innerText = data[2].recipe.label
  })

}
getSelectionImages()




