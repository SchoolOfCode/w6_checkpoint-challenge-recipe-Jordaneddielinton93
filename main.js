
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
  console.log("myhead")
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

// above is just for the slider menu 





let foodToSearch = null;
const YOUR_APP_ID = "4f8a14de"
const YOUR_APP_KEY = "9b9c0fb4904a63e366b8342ca9279f97"

// const requestUrl = `https://api.edamam.com/search?q=kale&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}`



RecipeEnterKey = document.getElementById("food-input")
RecipeEnterKey.addEventListener("keydown",(event)=>{
  if(event.key == "Enter"){
    console.log("Enter key pressed")
    return handleRecipeClick()
  }
})
RecipeClick = document.getElementById("recipe-button")
RecipeClick.addEventListener("click",handleRecipeClick)
function handleRecipeClick() {
  handleFoodChange()
  foodFoundObject = fetchRecipe(foodToSearch);
}



function handleFoodChange() {
  foodToSearch = document.getElementById("food-input").value;
  if(foodToSearch.length <= 1){
    return alert("type a word before pressing enter")
  }else{
    return foodToSearch
  }
}
async function fetchRecipe(food) {
  let response = await fetch(`https://api.edamam.com/search?q=${food}&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}`)
  responseData = await response.json()
  let randNum = Math.floor(Math.random()*responseData.hits.length)
  console.log(responseData)
  let randRecipe = responseData.hits[randNum].recipe
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


