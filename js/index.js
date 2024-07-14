$(document).ready(function() {
    let openNav = document.getElementById('openNav');
    let closeNav = document.getElementById('closeNav');

    function openSideNav() {
        $('.sideNav').animate({
            left: '0'
        }, 100, function() {
            $('.sideNav li').each(function(index) {
                $(this).delay(150 * index).animate({opacity: 1, top: 0}, 500);
            });
        });
        $('.sideBar').animate({
            left: '200px'
        }, 100);
        $('#openNav').addClass('d-none');
        $('#closeNav').removeClass('d-none');
    }

    function closeSideNav() {
        $('.sideNav').animate({
            left: '-200px'
        }, 100, function() {
            $('.sideNav li').css({top: '200px', opacity: 0}); 
        });
        $('.sideBar').animate({
            left: '0'
        }, 100);
        $('#openNav').removeClass('d-none');
        $('#closeNav').addClass('d-none');
    }

    function closeSideNavOnClick() {
        $('.sideNav').animate({
            left: '-200px'
        }, 100, function() {
            $('.sideNav li').css({top: '200px', opacity: 0});
        });
        $('.sideBar').animate({
            left: '0'
        }, 100);
        $('#openNav').removeClass('d-none');
        $('#closeNav').addClass('d-none');
    }

    $('.sideNav a').on('click', function() {
        closeSideNavOnClick();
    });

    openNav.addEventListener('click', openSideNav);
    closeNav.addEventListener('click', closeSideNav);
});




$(document).ready(() => {
    searchByName(" ").then(() => {
        $('body').css({"overflow": "visible"});
    });
});



let rowData = document.getElementById("rowData");
let searchContainer = document.getElementById("searchContainer");

async function getCategories() {
  
    rowData.innerHTML=`
    <div class="loading " id="loadingScreen">
     <span class="loader"></span>
    </div>
`;
   
    searchContainer.innerHTML = ``
    try {
     
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        let data = await response.json();
        console.log(data);
    
        displayCategories(data.categories);
    } catch (error) {
        console.error('Error fetching data:', error);
    } 
}

async function getArea() {
    rowData.innerHTML=`
    <div class="loading " id="loadingScreen">
        <span class="loader"></span>
    </div>
`;
  
     searchContainer.innerHTML = ``
    try {
 
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        let data = await response.json();
        console.log(data.meals);
        displayArea(data.meals);
    } catch (error) {
        console.error('Error fetching data:', error);
    } 
}

async function getIngredients() {
    rowData.innerHTML=`
    <div class="loading " id="loadingScreen">
        <span class="loader"></span>
    </div>
`;
  
     searchContainer.innerHTML = ``
    try {

        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        let data = await response.json();
        let first20meals = data.meals.slice(0, 20);
        console.log(data);
        displayIngredients(first20meals);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

async function displayCategories(arr) {

    let cartoona = ``;
    for (let i = 0; i < arr.length; i++) {
        cartoona += `
            <div class="col-lg-3">
                <div onclick="getCategoryMeals('${arr[i].strCategory}')" class="meal position-relative overflow-hidden rounded-3 m-2">
                    <img src="${arr[i].strCategoryThumb}" class="w-100">
                    <div class="meal-Layer position-absolute d-flex flex-column align-items-center justify-content-center  p-2 text-center">
                        <h3>${arr[i].strCategory}</h3>
                        <p>${arr[i].strCategoryDescription.split(" ").slice(0, 20).join(" ")}</p>
                    </div>
                </div>
            </div>`;
    }
    document.getElementById('rowData').innerHTML = cartoona;
}

async function displayArea(arr) {
    let cartoona = ``;
    for (let i = 0; i < arr.length; i++) {
        cartoona += `
            <div class="col-lg-3 g-2">
                <div onclick="getAreaMeals('${arr[i].strArea}')" class="meal position-relative overflow-hidden rounded-3 m-3 text-white text-center">
                    <i class="fa-solid fa-house-laptop fa-4x"></i>
                    <h3>${arr[i].strArea}</h3>
                </div>
            </div>`;
    }
    document.getElementById('rowData').innerHTML = cartoona;
}

async function displayIngredients(arr) {
    let cartoona = ``;
    for (let i = 0; i < arr.length; i++) {
        let description = arr[i].strDescription ? arr[i].strDescription.split(" ").slice(0, 20).join(" ") : "No description available";
        cartoona += `
            <div class="col-lg-3">
                <div onclick="getIngredientsMeals('${arr[i].strIngredient}')" class="rounded-2 text-center cursor-pointer text-white ingreDiv">
                    <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                    <h3>${arr[i].strIngredient}</h3>
                    <p>${description}</p>
                </div>
            </div>`;
    }
    document.getElementById('rowData').innerHTML = cartoona;
}

async function getCategoryMeals(category) {
    rowData.innerHTML=`
    <div class="loading " id="loadingScreen">
        <span class="loader"></span>
    </div>
`;
    try {
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        let data = await response.json();
        displayMeals(data.meals.slice(0, 20));
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

async function getAreaMeals(area) {
    rowData.innerHTML=`
    <div class="loading  " id="loadingScreen">
        <span class="loader"></span>
    </div>
`;
    try {
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        let data = await response.json();
        displayMeals(data.meals.slice(0, 20)); 
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

async function getIngredientsMeals(ingredients) {
    rowData.innerHTML=`
    <div class="loading  " id="loadingScreen">
        <span class="loader"></span>
    </div>
`;
    try {
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        let data = await response.json();
        displayMeals(data.meals.slice(0, 20));
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}
function displayMeals(arr) {
    let cartoona = ``;
    for (let i = 0; i < arr.length; i++) {
        cartoona += `
            <div class="col-lg-3 col-md-4 col-sm-6 mb-4">
                <div onclick="getMealDetails('${arr[i].idMeal}')" class="meal position-relative overflow-hidden rounded-3">
                    <img src="${arr[i].strMealThumb}" class="w-100">
                    <div class="meal-Layer position-absolute d-flex align-items-center justify-content-center p-2">
                        <h3>${arr[i].strMeal}</h3>
                    </div>
                </div>
            </div>`;
    }
    document.getElementById('rowData').innerHTML = cartoona;
}


async function getMealDetails(mealId) {
    rowData.innerHTML=`
    <div class="loading " id="loadingScreen">
        <span class="loader"></span>
    </div>
`;
  
    try {
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        let data = await response.json();
        console.log(data);
        displayMealDetails(data.meals[0]); 
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}function displayMealDetails(meal) {
    searchContainer.innerHTML = ``;

    let ingredients = ``;

    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients += `<li class="ingredient-item">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`;
        }
    }

    let tags = meal.strTags ? meal.strTags.split(",") : [];

    let tagsStr = '';
    for (let i = 0; i < tags.length; i++) {
        tagsStr += `<li class="tag">${tags[i]}</li>`;
    }

    let cartoona = `
    <div class="col-lg-12">
        <div class="text-white m-5 p-1">
            <div class="mealDetailsContainer row">
                <div class="col-lg-4">
                    <div class="mealPhotoName">
                        <img src="${meal.strMealThumb}" class="w-100 rounded-3">
                        <h3 class="py-3">${meal.strMeal}</h3>
                    </div>
                </div>
                <div class="col-lg-8">
                    <div class="mealDetails">
                        <h3>Instructions</h3>
                        <p class="h5 fs-6">${meal.strInstructions}</p>
                        <h3>Area: ${meal.strArea}</h3>
                        <h3>Category: ${meal.strCategory}</h3>
                        <h3>Ingredients:</h3>
                        <ul class="ingredient-list">
                            ${ingredients}
                        </ul>
                        <h3>Tags:</h3>
                        <ul class="tags-list">
                            ${tagsStr}
                        </ul>
                        <div class="">
                            <a class="btn btn-success text-white" target="_blank" href="${meal.strSource}">Source</a>
                            <a class="btn btn-danger text-white" target="_blank" href="${meal.strYoutube}">YouTube</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;

    rowData.innerHTML = cartoona;
}



function SearchInputs(){


    searchContainer.innerHTML=`     <div class="row py-2">
            <div class="col-lg-6">
                <input type="text" placeholder="Search By Name " class="w-100 p-2 rounded-2 bg-transparent text-light form-control text-capitalize"  onkeyup=searchByName(this.value)>
            </div>
            <div class="col-lg-6">
                <input type="text" placeholder="Search By First Letter " maxlength="1" class="w-100 p-2 rounded-2 bg-transparent text-white form-control text-capitalize" onkeyup=searchByFirstLetter(this.value)>
            </div>
         </div>
    `

    rowData.innerHTML=""


}

async function searchByName(word){
    rowData.innerHTML=`
    <div class="loading " id="loadingScreen">
        <span class="loader"></span>
    </div>
`;
  

    try{

        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${word}`)
        if(!response.ok){
            throw new Error ('Network response was not ok')
        }
        let data = await  response.json();
        console.log(data);
        data.meals? displayMeals(data.meals):displayMeals([])

    }
    catch(error){
        console.log('Error fetching data',error);

    }


}
async function searchByFirstLetter(word){
    rowData.innerHTML=`
    <div class="loading " id="loadingScreen">
        <span class="loader"></span>
    </div>
`;
  

    word == ""? word = "a": "";

    try{

        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${word}`)
        if(!response.ok){
            throw new Error ('Network response was not ok')
        }
        let data = await  response.json();
        console.log(data);
        data.meals? displayMeals(data.meals):displayMeals([])

    }
    catch(error){
        console.log('Error fetching data',error);

    }


}
let submitBtn;
let nameInputTouched = false;
let emailInputTouched = false;
let phoneInputTouched = false;
let ageInputTouched = false;
let passwordInputTouched = false;
let repasswordInputTouched = false;

function contactUs() {
     searchContainer.innerHTML = ``
    let rowData = document.getElementById('rowData');
    rowData.innerHTML = `
        <div class="container contact-us mx-auto d-flex justify-content-center align-items-center m-5 p-5">
            <div class="row p-5 gy-3">
                <div class="col-lg-6">
                    <input type="text" id="nameInput" class="rounded-2 bg-light w-100 p-2 m-2" placeholder="Enter Your Name" required onkeyup="inputsValidation()">
                    <p class="bg-danger-subtle border-danger border-2 text-danger text-center w-100 m-2 rounded-2 p-3 d-none">Special characters and numbers not allowed</p>
                </div>
                <div class="col-lg-6">
                    <input type="email" id="emailInput" class="rounded-2 bg-light w-100 p-2 m-2" placeholder="Enter Your Email" required onkeyup="inputsValidation()">
                    <p class="bg-danger-subtle border-danger border-2 text-danger text-center w-100 m-2 rounded-2 p-3 d-none">Email not valid (example@yyy.zzz)</p>
                </div>
                <div class="col-lg-6">
                    <input type="tel" id="phoneInput" class="rounded-2 bg-light w-100 p-2 m-2" placeholder="Enter Your Phone" required onkeyup="inputsValidation()">
                    <p class="bg-danger-subtle border-danger border-2 text-danger text-center w-100 m-2 rounded-2 p-3 d-none">Enter valid Phone Number</p>
                </div>
                <div class="col-lg-6">
                    <input type="number" id="ageInput" class="rounded-2 bg-light w-100 p-2 m-2" placeholder="Enter Your Age" required onkeyup="inputsValidation()">
                    <p class="bg-danger-subtle border-danger border-2 text-danger text-center w-100 m-2 rounded-2 p-3 d-none">Enter valid age</p>
                </div>
                <div class="col-lg-6">
                    <input type="password" id="passwordInput" class="rounded-2 bg-light w-100 p-2 m-2" placeholder="Enter Your Password" required onkeyup="inputsValidation()">
                    <p class="bg-danger-subtle border-danger border-2 text-danger text-center w-100 m-2 rounded-2 p-3 d-none">Enter valid password (Minimum eight characters, at least one letter and one number)</p>
                </div>
                <div class="col-lg-6">
                    <input type="password" id="repasswordInput" class="rounded-2 bg-light w-100 p-2 m-2" placeholder="Re-enter Password" required onkeyup="inputsValidation()">
                    <p class="bg-danger-subtle border-danger border-2 text-danger text-center w-100 m-2 rounded-2 p-3 d-none">Passwords do not match</p>
                </div>
                <div class="d-flex justify-content-center align-items-center m-3">
                    <button type="button" class="btn btn-outline-warning w-25" id="SubmitBtn" disabled>Submit</button>
                </div>
            </div>
        </div>`;


    document.getElementById('nameInput').addEventListener('focus', () => {
        nameInputTouched = true;
    });
    document.getElementById('emailInput').addEventListener('focus', () => {
        emailInputTouched = true;
    });
    document.getElementById('phoneInput').addEventListener('focus', () => {
        phoneInputTouched = true;
    });
    document.getElementById('ageInput').addEventListener('focus', () => {
        ageInputTouched = true;
    });
    document.getElementById('passwordInput').addEventListener('focus', () => {
        passwordInputTouched = true;
    });
    document.getElementById('repasswordInput').addEventListener('focus', () => {
        repasswordInputTouched = true;
    });

    submitBtn = document.getElementById('SubmitBtn');
}

function inputsValidation() {
    if (nameInputTouched) {
        if (!nameValidation()) {
            document.getElementById('nameInput').nextElementSibling.classList.remove('d-none');
        } else {
            document.getElementById('nameInput').nextElementSibling.classList.add('d-none');
        }
    }
    if (emailInputTouched) {
        if (!emailValidation()) {
            document.getElementById('emailInput').nextElementSibling.classList.remove('d-none');
        } else {
            document.getElementById('emailInput').nextElementSibling.classList.add('d-none');
        }
    }
    if (phoneInputTouched) {
        if (!phoneValidation()) {
            document.getElementById('phoneInput').nextElementSibling.classList.remove('d-none');
        } else {
            document.getElementById('phoneInput').nextElementSibling.classList.add('d-none');
        }
    }
    if (ageInputTouched) {
        if (!ageValidation()) {
            document.getElementById('ageInput').nextElementSibling.classList.remove('d-none');
        } else {
            document.getElementById('ageInput').nextElementSibling.classList.add('d-none');
        }
    }
    if (passwordInputTouched) {
        if (!passwordValidation()) {
            document.getElementById('passwordInput').nextElementSibling.classList.remove('d-none');
        } else {
            document.getElementById('passwordInput').nextElementSibling.classList.add('d-none');
        }
    }
    if (repasswordInputTouched) {
        if (!repasswordValidation()) {
            document.getElementById('repasswordInput').nextElementSibling.classList.remove('d-none');
        } else {
            document.getElementById('repasswordInput').nextElementSibling.classList.add('d-none');
        }
    }
    

    if (nameValidation() && emailValidation() && phoneValidation() && ageValidation() && passwordValidation() && repasswordValidation()) {
        submitBtn.removeAttribute('disabled');
    } else {
        submitBtn.setAttribute('disabled', 'true');
    }
}

function nameValidation() {
    return /^[a-zA-Z\s]{2,}$/.test(document.getElementById('nameInput').value);
}

function emailValidation() {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(document.getElementById('emailInput').value);
}

function phoneValidation() {
    return /^01[0-2,5]{1}[0-9]{8}$/.test(document.getElementById('phoneInput').value);
}

function ageValidation() {
    return /^(?:1[01][0-9]|120|[1-9][0-9]?|0)$/.test(document.getElementById('ageInput').value);
}

function passwordValidation() {
    return (/^(?=.*[a-zA-Z])(?=.*\d).{8,}$/.test(document.getElementById("passwordInput").value))
}


function repasswordValidation() {
    return document.getElementById('repasswordInput').value === document.getElementById('passwordInput').value;
}



$(function(){

    $('.loader').fadeOut(2000,function(){

        $('.loading').fadeOut(2000);
        $("body").css({'overflow':'auto'})
    })
})