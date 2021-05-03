
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

RecipeClick = document.getElementById("recipe-button")
RecipeClick.addEventListener("click",handleRecipeClick)
function handleRecipeClick() {
  handleFoodChange()
  foodFoundObject = fetchRecipe(foodToSearch);
  
}

function handleFoodChange() {
  foodToSearch = document.getElementById("food-input").value;
  if(foodToSearch.length < 1){
    return("type a word")
  }else{
    return foodToSearch
  }
}

async function fetchRecipe(food) {
  let response = await fetch(`https://api.edamam.com/search?q=${food}&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}`)
  responseData = await response.json()
  console.log(responseData.hits[0].recipe)
  URLImage = responseData.hits[0].recipe.image
  document.querySelector("#apiImage").src = URLImage
  Label = responseData.hits[0].recipe.label
  document.querySelector(".label").innerText = Label
  
}




