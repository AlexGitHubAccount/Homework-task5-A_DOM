'use strict';

//Main array with pizzas
const pizzas = [
    {name: "Немецкая", price: "135  $", ingredients: {olives: "оливки", mozzarella: "сыр моцарелла",parsley: "петрушка"} , image: "img/1.jpg", calorie: "268 кал."},
    {name: "Новинка", price: "145 $", ingredients: {champignon: "шампиньоны", pork: "свинина",mozzarella: "сыр моцарелла"}, image: "img/2.jpg", calorie: "266 кал."},
    {name: "Карбонара", price: "144 $",  ingredients: {mozzarella: "сыр моцарелла"}, image: "img/3.jpg", calorie: "270 кал."},
    {name: "Свит чили со свининой", price: "143 $", ingredients: {mozzarella: "сыр моцарелла"}, image: "img/4.jpg", calorie: "277 кал."},
    {name: "Беконная", price: "119 $", ingredients: {mozzarella: "сыр моцарелла",parsley: "петрушка" }, image: "img/5.jpg", calorie: "257 кал."},
    {name: "Куриная", price: "140 $", ingredients: {mozzarella: "сыр моцарелла"}, image: "img/6.jpg", calorie: "259 кал."},
    {name: "Крутая", price: "139 $", ingredients: {mozzarella: "сыр моцарелла",parsley: "петрушка" }, image: "img/7.jpg", calorie: "279 кал."},
    {name: "Филона", price: "135 $", ingredients: {mozzarella: "сыр моцарелла", olives: "оливки", parsley: "петрушка" }, image: "img/8.jpg", calorie: "275 кал."},
    {name: "Ананасная", price: "142 $", ingredients: {mozzarella: "сыр моцарелла", olives: "оливки"}, image: "img/9.jpg", calorie: "254 кал."},
    {name: "Итальянская", price: "165 $", ingredients: { mozzarella: "сыр моцарелла", champignon: "шампиньоны", parsley: "петрушка" }, image: "img/10.jpg", calorie: "281 кал."},
    {name: "Маргарита", price: "95 $", ingredients: {mozzarella: "сыр моцарелла",champignon: "шампиньоны"}, image: "img/11.jpg", calorie: "261 кал."},
    {name: "Вкуснейшая", price: "135 $", ingredients: {mozzarella: "сыр моцарелла", parsley: "петрушка" }, image: "img/12.jpg", calorie: "284 кал."},
    {name: "Убойная", price: "136 $", ingredients: { mozzarella: "сыр моцарелла",parsley: "петрушка" }, image: "img/13.jpg", calorie: "262 кал."},
    {name: "Китайская", price: "129 $", ingredients: {champignon: "шампиньоны", mozzarella: "сыр моцарелла"}, image: "img/14.jpg", calorie: "273 кал."},
    {name: "Ветчинная", price: "118 $", ingredients: {mozzarella: "сыр моцарелла",parsley: "петрушка" }, image: "img/15.jpg", calorie: "278 кал."},
    ];
let overlay = document.querySelector('.overlay');
let modal = document.querySelector('.pop-up');
let productsView = '';
modal.addEventListener('click', function(e){
    e.preventDefault();
    if(e.target.closest('.pop-up__button--grid')){
        productsView = 'grid';
        overlay.classList.remove('visible');
        renderProducts(pizzas, productsView);
    } else if(e.target.closest('.pop-up__button--list')){
        productsView = 'list';
        overlay.classList.remove('visible');
        renderProducts(pizzas, productsView);
    }

});
function sortNamesToLow(pizzas){
    pizzas.sort((a, b) => a.name.replace(/ /g, "") > b.name.replace(/ /g, "") ? 1 : -1);
}
function sortNamesToHigh(pizzas){
    pizzas.sort((a, b) => a.name.replace(/ /g, "") < b.name.replace(/ /g, "") ? 1 : -1);
}
function sortPricesToHigh(pizzas){
    pizzas.sort(function (a, b) {
        return +a.price.replace(/\D/g, "") > +b.price.replace(/\D/g, "") ? 1 : -1});
}

function sortPricesToLow(pizzas){
    pizzas.sort(function (a, b) {
        return +a.price.replace(/\D/g, "") > +b.price.replace(/\D/g, "") ? -1 : 1});
}
let filteredPizzas = [];
function filterIngredients(checkedIngredientes, pizzas){
    filteredPizzas = [];
    for(let i = 0; i < pizzas.length; i++){
        if(checkIncludesIngredients(checkedIngredientes, pizzas[i].ingredients)){
            filteredPizzas.push(pizzas[i]);
        }
    }
}
function checkIncludesIngredients(checkedIngredientes, pizzaObj){
    let counter = 0;
    for(let i = 0; i < checkedIngredientes.length; i++){
        if(checkedIngredientes[i] in pizzaObj){
            counter++;
        }
    }
    return counter === checkedIngredientes.length;
}

function clearProducts(){
    let productsCont = document.querySelector('.products-list');
    productsCont.innerHTML = '';
}
function renderProducts(pizzas, productsView){
    let newHtml;
    let productCard;
    if(productsView === 'grid'){
        productCard = `<div class="product-card">
                        <div class="product-card__img" style='background-image: url("%product-image%")'></div>
                        <h4 class="product-card__name">%pizza-name%</h4>
                        <div class="product-card__ingredients"><span class="product-card__ingredients-title">Состав: </span>%ingredients%</div>
                        <div class="product-card__calorie"><span class="product-card__calorie-title">Калорийность: </span>%calorie%</div>
                        <h5 class="product-card-price-grid"><span class="product-card__price-title">Цена: <span class="product-card__price">%price%</h5>
                    </div>`;
    } else if (productsView === 'list'){
        productCard = `<div class="product-card--list">
                        <div class="product-card__logo"></div>
                        <div class="product-card__info">
                            <h4 class="product-card__name product-card__name--list">%pizza-name%</h4>
                            <h5 class="product-card-price-list">%price%</h5>
                        </div>
                    </div>`;
    }

    for(let i = 0; i < pizzas.length; i++){
        newHtml = productCard.replace('%product-image%', pizzas[i].image);
        newHtml = newHtml.replace('%pizza-name%', pizzas[i].name);
        newHtml = newHtml.replace('%ingredients%', Object.values(pizzas[i].ingredients).join(", "));
        newHtml = newHtml.replace('%calorie%', pizzas[i].calorie);
        newHtml = newHtml.replace('%price%', pizzas[i].price);
        document.querySelector('.products-list').insertAdjacentHTML("beforeend", newHtml);
    }
}
let namesSelect = document.querySelector('.names-select');
let priceSelect = document.querySelector('.price-select');


//sorting for name output
namesSelect.addEventListener('change', function(){
    if(priceSelect.value !== 'none'){
        priceSelect.value = 'none';
    }
    if (this.value === 'namesToLow'){
        if(filteredPizzas.length !== 0){
            sortNamesToLow(filteredPizzas);
            clearProducts();
            renderProducts(filteredPizzas, productsView);
        } else if (filteredPizzas.length === 0){
            sortNamesToLow(pizzas);
            clearProducts();
            renderProducts(pizzas, productsView);
        }
    } else if (this.value === 'namesToHigh'){
        if(filteredPizzas.length !== 0){
            sortNamesToHigh(filteredPizzas);
            clearProducts();
            renderProducts(filteredPizzas, productsView);
        } else if (filteredPizzas.length === 0){
            sortNamesToHigh(pizzas);
            clearProducts();
            renderProducts(pizzas, productsView);
        }
    }
});
//sorting for price output
priceSelect.addEventListener('change', function(){
    if(namesSelect.value !== 'none'){
        namesSelect.value = 'none';
    }
    if (this.value === 'priceToHigh'){
        if(filteredPizzas.length !== 0){
            sortPricesToHigh(filteredPizzas);
            clearProducts();
            renderProducts(filteredPizzas, productsView);
        } else if (filteredPizzas.length === 0){
            sortPricesToHigh(pizzas);
            clearProducts();
            renderProducts(pizzas, productsView);
        }

    } else if (this.value === 'priceToLow'){
        if(filteredPizzas.length !== 0){
            sortPricesToLow(filteredPizzas);
            clearProducts();
            renderProducts(filteredPizzas, productsView);
        } else if (filteredPizzas.length === 0){
            sortPricesToLow(pizzas);
            clearProducts();
            renderProducts(pizzas, productsView);
        }
    }
});

//filter for Ingredients
let checkedIngredientes = [];
let checkedIngredientesUl = document.querySelector('.products-filter__ingredients-list');
let checkedIngredientesLi = document.querySelectorAll('.products-filter__ingredients-item');
checkedIngredientesUl.addEventListener('click', function(e){
    if (e.target.classList == 'products-filter__checkbox'){
        for (let i = 0; i < checkedIngredientesLi.length; i++){
            if(checkedIngredientesLi[i].querySelector('input').checked){
                checkedIngredientes.push(checkedIngredientesLi[i].querySelector('input').name);
            }
        }
        clearProducts();
        if(namesSelect.value === 'namesToLow'){
            sortNamesToLow(pizzas);
        } else if (namesSelect.value === 'namesToHigh'){
            sortNamesToHigh(pizzas);
        } else if(priceSelect.value === 'priceToLow'){
            sortPricesToLow(pizzas);
        } else if (priceSelect.value === 'priceToHigh'){
            sortPricesToHigh(pizzas);
        }
        filterIngredients(checkedIngredientes, pizzas);
        renderProducts(filteredPizzas, productsView);
        checkedIngredientes = [];
    }
});

