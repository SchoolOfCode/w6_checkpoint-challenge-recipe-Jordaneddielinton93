
// 1. get images
const sliderImages = [
  {images:"url(/images/waiter.jpg)"},
  {images:"url(/images/dogfetch.jpg)"},
  {images:"url(/images/resturant1.jpg)"}
]
// 2. slide to the right function
let sliderbackground = document.querySelector(".starterArea--template").style
imgCounter = 0
function sliderRight(){
  sliderbackground.backgroundImage = sliderImages[imgCounter].images
  imgCounter++
  if(imgCounter > sliderImages.length-1){
    imgCounter = 0
  }
}
// 3. slide to the left function
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
// 4. interval timer to change automatically slider right
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
// 1. build timer 00.02.00
// 2. use set interval 
// 3. minus each minute number at secounds interval 0
let getMinuteNumber = document.getElementById("middle-Counter")
let getRightNumber = document.getElementById("right-Counter")
// Minute number countdown
let MinuteCountDown = 4
// right number countdown
let RightCountDown = 60
// once both hit 0 stop the timer
let CountDownTimer = setInterval(()=>{
  getMinuteNumber.innerText = `0${MinuteCountDown}.`
  RightCountDown = Math.floor(RightCountDown-1)
  getRightNumber.innerText = RightCountDown
  if(MinuteCountDown == 0 && RightCountDown == 0){
    clearInterval(CountDownTimer)
  }
  if(RightCountDown == 0){
    RightCountDown = 59
    MinuteCountDown-=1
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

// 3. check if there is a value typed and call api if there is
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
  console.log(data.hits[2].recipe)
  let randRecipe = data.hits[randNum].recipe
  // get each value of api call with random selection
  const {
    image,
    label,
    dishType,
    cuisineType,
    calories,
    totalWeight,
    ingredientLines,
    ingredients,
    url} = randRecipe
  
  document.querySelector("#apiImage").src = image
  document.querySelector(".FoodArea--box--topright--label").innerText = label 
  document.querySelector(".dishtype").innerText = dishType
  document.querySelector(".cuisinetype").innerText = cuisineType
  document.querySelector(".calories").innerText = calories
  document.querySelector(".totalweight").innerText = totalWeight
  document.querySelector(".FoodArea--box--bottomright-ingrediants").innerText = ingredientLines
  getIngredientslist(ingredients)
  getsavedRecipes(label,url)
}
// i could have used a deconstructer above if i get time i will replace code ✔️REFACTORED✔️

let ingrediantsList = document.querySelector(".FoodArea--box--bottomright-ingrediantslist")
function getIngredientslist(ingri){
  ingrediantsList.innerHTML = ""
  ingri.forEach((item)=>{
    CreatedLi = document.createElement("li")
    CreatedLi.innerText = item.text
    ingrediantsList.append(CreatedLi)
  })
}
// creating a table with information on the searched food 
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

async function returnFoodAPI(food){
  let response = await fetch(`https://api.edamam.com/search?q=${food}&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}`)
  data = await response.json()
  return data.hits
}
// this was me just practising callback functions i understand they are outdated and bad practice✔️
// use aysnc func to refactor the callbacks ✔️
function getBoxNumberIMG(numb,food,numb2){
  let getbox = document.querySelector(`.selectionArea--grid--box${numb}`)
  return getbox.style.backgroundImage = `URL(${food[numb2].recipe.image})`
}
function getInnerPTag(numb,numb2,food){
  let getP = document.querySelector(`.selectionArea--grid--box${numb} p`)
  return getP.innerText = food[numb2].recipe.label
}
async function getImagesLabel(){
    let pizzaHits = await returnFoodAPI("pizza")
    let pastaHits = await returnFoodAPI("pasta")
    let burgerHits = await returnFoodAPI("burger")
    let soupHits = await returnFoodAPI("soup")
    let saladHits = await returnFoodAPI("salad")
    let breadHits = await returnFoodAPI("bread")

    getBoxNumberIMG(1,pizzaHits,2)
    getInnerPTag(1,2,pizzaHits)

    getBoxNumberIMG(2,pastaHits,2)
    getInnerPTag(2,2,pastaHits)

    getBoxNumberIMG(3,burgerHits,2)
    getInnerPTag(3,2,burgerHits)

    getBoxNumberIMG(4,soupHits,2)
    getInnerPTag(4,2,soupHits)

    getBoxNumberIMG(5,saladHits,3)
    getInnerPTag(5,3,saladHits)

    getBoxNumberIMG(6,breadHits,2)
    getInnerPTag(6,2,breadHits)

}
getImagesLabel()




