document.addEventListener("DOMContentLoaded", function(){
    var modals = document.querySelectorAll(".modal");
    M.Modal.init(modals);

    var items = document.querySelectorAll(".collapsible");
    M.Collapsible.init(items);
});

const recipes = document.querySelector(".recipes");
const loggedOutLinks = document.querySelectorAll(".logged-out");
const loggedInLinks = document.querySelectorAll(".logged-in");

const setupUI = (user) => {
    if (user) {
        loggedOutLinks.forEach((item) => (item.style.display = "none"));
        loggedInLinks.forEach((item) => (item.style.display = "block"));
    } else {
        loggedOutLinks.forEach((item) => (item.style.display = "block"));
        loggedInLinks.forEach((item) => (item.style.display = "none"));
    }
};

document.addEventListener("DOMContentLoaded", function () {
  //Nav Menu
  const menus = document.querySelectorAll(".side-menu");
  M.Sidenav.init(menus, { edge: "right" });
  // Add Tasks
  const forms = document.querySelectorAll(".side-form");
  M.Sidenav.init(forms, { edge: "left" });
});

//Populate the Data
const setupRecipes = (data) => {
    let html = "";
data.forEach((doc) => {
    const recipe = doc.data();
    const li = `
    <div class="card-panel recipe grey row" data-id ="${recipe.id}">
              <img src="/img/recipe.png" class="responsive-img materialboxed" alt="">
              <div class="recipe-detail">
                  <div class="recipe-title">${recipe.title}</div>
                  <div class="recipe-description">${recipe.description}</div>
              </div>
              <div class="recipe-delete">
                  <i class="material-icons" data-id ="${recipe.id}">delete_outline</i>
              </div>
          </div>
    `;
    html += li;
});

recipes.innerHTML = html;
};

const renderRecipe = (data, id) => {
  const html = `
  <div class="card-panel recipe grey row" data-id ="${id}">
            <img src="/img/recipe.png" class="responsive-img materialboxed" alt="">
            <div class="recipe-detail">
                <div class="recipe-title">${data.title}</div>
                <div class="recipe-description">${data.description}</div>
            </div>
            <div class="recipe-delete">
                <i class="material-icons" data-id ="${id}">delete_outline</i>
            </div>
        </div>
  `;

  recipes.innerHTML += html;
};

const removeRecipe = (id) => {
    const recipe = document.querySelector(`.recipe[data-id = ${id}]`);
    recipe.remove();
};
