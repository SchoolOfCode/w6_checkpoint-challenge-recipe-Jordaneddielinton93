const sliderImages = []

function sliderMenu(){

}





























let foodToSearch = null;

const YOUR_APP_ID = "4f8a14de"
const YOUR_APP_KEY = "9b9c0fb4904a63e366b8342ca9279f97"

const requestUrl = `https://api.edamam.com/search?q=kale&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}`


function handleRecipeClick() {
  fetchRecipe(foodToSearch);
}

function handleFoodChange() {
  foodToSearch = document.querySelector("#food-input").value;
}

async function fetchRecipe(food) {
  fetch(requestUrl)
  .then((response)=>response.json())
  .then((data)=>{
    let randint =Math.floor(Math.random()*data.hits.length)
    return console.log( data.hits[randint].recipe)
 
  })

}

fetchRecipe()
