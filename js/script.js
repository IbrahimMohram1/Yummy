
let rowData = document.getElementById('rowData')
let Categories = document.getElementById('Categories')
let Area = document.getElementById('Area')
let Ingredients = document.getElementById('Ingredients')
let Search = document.getElementById('Search')
let contact = document.getElementById('ContactUs')
let btn;
function ShowLoading(){
  $(document).ready(()=>{
        $('.inner-lodaing').fadeIn(500)
        $('#content').css('display' , 'none' , function(){
        $('body').css('overflow' , 'hidden')
 })
})
}
function displayLoading(){
  $(document).ready(()=>{
        $('.inner-lodaing').fadeOut(500 , function(){
        $('body').css('overflow' , 'visible')
        $('#content').css('display' , 'block')
        })
  })
}
 $(document).ready(()=>{
  getMeals('').then(()=>{
  $('.lodaing').fadeOut(1000 , function(){
  $('#content').css('display' , 'block')
  $('body').css('overflow' , 'visible')
  $('.inner-lodaing').fadeOut(500)
  })
  })

 })

$(".side-nav i.open-icon").on("click", function () {
  if ($(".nav-tab").css("width") == '0px') {
        openSide();
        console.log('hi');
  } else {
    closeSide();
    console.log('hello');
  }
});
    let width = $(".nav-tab").outerWidth(true);
function openSide() {
  $(".nav-tab").animate({ width: width }, 500);
  $(".open-icon").removeClass("fa-align-justify");
  $(".open-icon").addClass("fa-x");
  for (let i = 0; i < 5; i++) {
    $(".anchor-links li")
      .eq(i)
      .animate({ top: 0 }, (i + 5) * 150);
  }

}
function closeSide() {
  $(".nav-tab").animate({ width: '0px' }, 500);
  $(".open-icon").addClass("fa-align-justify");
  $(".open-icon").removeClass("fa-x");
  for (let i = 0; i < 5; i++) {
    $(".anchor-links li")
      .eq(i)
      .animate({ top: 300 }, (i + 5) * 100);
  }

}
closeSide()
$(".anchor-links li").on('click' , function(){
  closeSide();
})

async function getMeals(term){
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
    response = await response.json()
  displayMeal(response.meals)
}
getMeals('');


function displayMeal(data){
  let dataBox = ''
  for (let i = 0; i < data.length; i++) {
    dataBox += `  
    
        <div class="col-lg-3 col-md-6 col-sm-12">
          <div onclick="getMealDetails('${data[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2">
            <img src="${data[i].strMealThumb}" alt="" class="w-100" />
            <div
              class="meal-layer position-absolute d-flex align-items-center justify-content-center text-black"
            >
              <h6>${data[i].strMeal}</h6>
            </div>
          </div>
        </div>
    `
  }
  rowData.innerHTML = dataBox
}

async function getAllCat(){
ShowLoading()
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
  response = await response.json()
  console.log(response.categories);
  displayLoading()
displayAllCat(response.categories)
}
function displayAllCat(data){
  let dataBox = ''
  for (let i = 0; i < data.length; i++) {
    dataBox += `
         <div class="col-lg-3 col-md-6 col-sm-12">
          <div onclick="getMealByCat('${data[i].strCategory}')" class="meal category position-relative overflow-hidden rounded-2">
            <img src="${data[i].strCategoryThumb}" alt="" class="w-100" />
            <div
              class="meal-layer position-absolute text-black d-flex text-center flex-column align-items-center justify-content-center "
            >
              <h6>${data[i].strCategory}</h6>
              <p>${data[i].strCategoryDescription.split(' ').slice(0,15).join(' ')}</p>
            </div>
          </div>
        </div>
    `
  }
    rowData.innerHTML = dataBox
}
Categories.addEventListener('click' , function(){
getAllCat()

})

async function getArea(){
ShowLoading()
   let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
  response = await response.json()
  displayLoading()
  displayArea(response.meals)
}
function displayArea(data){
  let dataBox = ''
  for (let i = 0; i < data.length; i++) {
    dataBox += `  
    
        <div class="col-lg-3 col-md-6 col-sm-12">
          <div onclick="getMealByArea('${data[i].strArea}')" class="Area rounded-2 text-center">
          <i class="fa-solid fa-house text-white text-center"></i>
            <h6>${data[i].strArea}</h6>
          </div> 
        </div>
    `
  }
  rowData.innerHTML = dataBox
}
Area.addEventListener('click' , function(){
getArea()
})

async function getIngredients(){
ShowLoading()
   let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
  response = await response.json()
  console.log(response.meals);
  displayLoading()
  displayIngredients(response.meals.slice(0,20))
}
function displayIngredients(data){
  let dataBox = ''
  for (let i = 0; i < data.length; i++) {
    dataBox += `  
    
        <div class="col-lg-3 col-md-6 col-sm-12 mt-3">
          <div onclick="getMealByIngredient('${data[i].strIngredient}')" class="Area rounded-2 text-center">
          <i class="fa-brands fa-bity fa-3x my-3"></i>
            <h6>${data[i].strIngredient}</h6>
            <p>${data[i].strDescription ?.split(' ').slice(0,15).join(' ')}</p>
          </div> 
        </div>
    `
  }
  rowData.innerHTML = dataBox
}
Ingredients.addEventListener('click' , function(){
getIngredients()
})

async function getMealByCat(categorie){
  ShowLoading()
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categorie}`)
  response = await response.json()
  displayLoading()
  displayMeal(response.meals)
}


async function getMealByArea(location){
ShowLoading()
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${location}`)
  response = await response.json()
  console.log(response.meals);
  displayLoading()
  displayMeal(response.meals)
}

async function getMealByIngredient(ingredients){
ShowLoading()
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`)
  response = await response.json()
  console.log(response);
  displayLoading()
  displayMeal(response.meals)

}
async function getMealDetails(Id){
  closeSide()
ShowLoading()
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${Id}`)
  response = await response.json()
  displayLoading()
  displayDetails(response.meals[0])

}

function displayDetails(data){
    let ingredient = ''
 
  for(let i = 1 ; i <= 20 ; i++){
    if(data[`strIngredient${i}`] && data[`strIngredient${i}`] ){
      ingredient +=`
                  <li class="alert alert-info m-3 p-2"> ${data[`strMeasure${i}`]} ${data[`strIngredient${i}`]}</li>

      `
    }
  }
     let tags = data.strTags?.split(',')
     if(!tags) tags = []
    tagsStr = ''
     for(let i = 0 ; i < tags.length ;i++){
      tagsStr +=`
                        <li class="alert alert-danger m-3 p-2"> ${tags[i]}</li>

      `
     }

  let dataBox = `
        <div class="col-md-4 col-sm-12">
          <img
            class="w-100 rounded-2"
            src="${data.strMealThumb}"
            alt="${data.strMeal}"
          />
          <h2 class="mt-3">${data.strMeal}</h2>
        </div>
        <div class="col-md-8 col-sm-12">
          <h2>institution</h2>
          <p>
            ${data.strInstructions}
          </p>
          <h3><span class="fw-bolder small text-success">Area : </span>${data.strArea}</h3>
          <h3><span class="fw-bolder small text-info">Category : </span> ${data.strCategory}</h3>
          <h3>Repices :</h3>
          <ul class="list-unstyled d-flex g-4 flex-wrap">
         ${ingredient}
          </ul>

          <h3 class='tags'>Tags :</h3>
          <ul class="list-unstyled d-flex g-4 flex-wrap">
          ${tagsStr}
          </ul>
          <a href="${data.strSource}" target="_blank" class="btn btn-outline-success mx-2">Source</a>
          <a href="${data.strYoutube}" target="_blank" class="btn btn-outline-danger mx-2">Youtube</a>
        </div>
  `
  rowData.innerHTML = dataBox
}


function displaySreach(){
  rowData.innerHTML =`
  <div class="container w-75">
      <div class="row py-4">
        <div class="col-md-6">
          <input
            oninput="searchByName(this.value)"
            class="form-control bg-transparent text-white"
            type="text"
            placeholder="Search By Name"
          />
        </div>
        <div class="col-md-6">
          <input
            oninput="searchByFirstLetter(this.value)"
            maxlength="1"
            class="form-control bg-transparent text-white"
            type="text"
            placeholder="Search By First Litter"
          />
        </div>
      </div>
    </div> 
  `

}
Search.addEventListener('click'  , function(){
  displaySreach()
})

async function searchByName(value){
  ShowLoading()
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`)
  let data = await response.json() 
  console.log(data.meals)
  displayLoading()
  setTimeout(() => {
      displayMeal(data.meals)
  }, 1500);
}

async function searchByFirstLetter(value){
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${value}`)
  console.log(data.meals)
  let data = await response.json() 
  setTimeout(() => {
       displayMeal(data.meals)
  }, 500000);

}

function displayError(){
  rowData.innerHTML =`
              <h6 class="alert alert-danger text-center p-3">No Found Data Please Enter A Valid Value</h6>
`

}

function contactUs(){

  rowData.innerHTML = `
   <div
          class="contact min-vh-100 d-flex justify-content-center align-items-center"
        >
          <div class="container w-75">
            <div class="row g-3">
              <div class="col-md-6">
                <input
                  oninput="validationAllInputs()"
                  id="userName"
                  class="form-control"
                  placeholder="Enter Your Name"
                  type="text"
                />
           
              </div>
              <div class="col-md-6">
                <input
                  oninput="validationAllInputs()"
                  id="userMail"
                  class="form-control"
                  placeholder="Enter Your Email"
                  type="email"
                />
         
              </div>
              <div class="col-md-6">
                <input
                  oninput="validationAllInputs()"
                  id="userPhone"
                  class="form-control"
                  placeholder="Enter Your Phone"
                  type="text"
                />
          
              </div>
              <div class="col-md-6">
                <input
                  oninput="validationAllInputs()"
                  id="userAge"
                  class="form-control"
                  placeholder="Enter Your Age"
                  type="number"
                />
        
              </div>
              <div class="col-md-6">
                <input
                  oninput="validationAllInputs()"
                  id="userPass"
                  class="form-control"
                  placeholder="Enter Your Password"
                  type="password"
                />
           
              </div>
              <div class="col-md-6">
                <input
                  oninput="validationAllInputs()"
                  id="userRePass"
                  class="form-control"
                  placeholder="RePassword"
                  type="password"
                />
              </div>
            </div>
            <button
              id="btnSubmit"
              disabled
              class="btn btn-outline-danger px-3 mt-3"
            >
              Submit
            </button>
          </div>
        </div>`
       btn = document.getElementById('btnSubmit')

}
contact.addEventListener('click' , function(){
  contactUs()

})

function validationAllInputs( ){
  if(userNameValidation() && userMailValidation() && userAgeValidation()&&userPhoneValidation()&& userPassValidation()&& userRePassValidation() == true){
    btn.removeAttribute('disabled')
    console.log('valid');
  }
  else{
        btn.setAttribute('disabled' , true)

        console.log('Novalid');

  }
 
}

function userNameValidation(){
  return ( /^[A-Za-z 0-9]{3,15}$/.test(document.getElementById('userName').value))
}

function userMailValidation(){
  return ( /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(document.getElementById('userMail').value))
}
function userPhoneValidation(){
  return ( /^01[0125][0-9]{8}$/.test(document.getElementById('userPhone').value))
}

function userAgeValidation(){
  return ( /^(1[89]|[2-9]\d)$/.test(document.getElementById('userAge').value))
}
function userPassValidation(){
  return ( /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/.test(document.getElementById('userPass').value))
}
function userRePassValidation(){
  return document.getElementById('userRePass').value == document.getElementById('userPass').value
}



//     name
// email

//   userPhone
//  age
//  pass



 //   let userName = document.getElementById('userName')
  // let userMail = document.getElementById('userMail')
  // let userPhone = document.getElementById('userPhone')
  // let userAge = document.getElementById('userAge')
  // let userPass = document.getElementById('userPass')
  // let userRePass = document.getElementById('userRePass')