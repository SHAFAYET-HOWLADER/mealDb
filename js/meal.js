
// get input value
const getButton = () =>{
  const input = document.getElementById("inputField");
  const inputValue = input.value;
  input.value = "";
  if(inputValue == ""){
    alert("please search your food by name")
  }
else{
    //load data
    fetch(` https://www.themealdb.com/api/json/v1/1/search.php?s=${inputValue}`)
    .then(res => res.json())
    .then(data => displayMeal(data))
}
}

const displayMeal = (meals) =>{
    console.log(meals.meals)
    const displayFood = document.getElementById("display_food");
    displayFood.textContent = "";
    const mealsItems = meals.meals;
      mealsItems.forEach(item => {
        const div = document.createElement("div");
        div.classList.add("food_details")
        div.innerHTML = `
            <img  src="${item.strMealThumb}" alt="image">
            <h3>${item.idMeal}</h3>
            <h4>${item.strArea}</h4>
            <p>
                 ${item.strInstructions.slice(0, 100)}            
            </p>
            <button onclick="seeDetails('${item.idMeal}')">More Info</button>
        `
        displayFood.appendChild(div)
      });
}

const seeDetails = async (details) =>{
    //get product id with async
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${details}`
    const res = await fetch(url)
    const data = await res.json()
    displayDetails(data.meals[0])

   //get product id with fetch response
   // const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${details}`
   // fetch(url)
   // .then(res => res.json())
   // .then(data => displayDetails(data.meals[0]))
}

//display product id details
const displayDetails = (info) =>{
  const detailsInfo = document.getElementById("display_details");
  detailsInfo.textContent = "";
  const div = document.createElement("div");
  div.classList.add("see_details")
  div.innerHTML = `
        <img  src="${info.strMealThumb}" alt="image">
        <h3>${info.idMeal}</h3>
        <h4>${info.strArea}</h4>
        <p>
            ${info.strInstructions.slice(0, 250)}         
        </p>
  `
  detailsInfo.appendChild(div);
}

