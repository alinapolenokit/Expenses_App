// Объявление переменных строковых констант
const CURRENCY = 'руб.';
const STATUS_IN_LIMIT = 'всё хорошо';
const STATUS_OUT_OF_LIMIT = 'всё плохо';
const STATUS_OUT_OF_LIMIT_CLASSNAME = 'status_positive';
const CHANGE_LIMIT_POPUP_OPEN = "js-popup-open";

//Объявление переменых - ссылок на html элементы 

const inputNode = document.querySelector('.js-input');
const buttonNode = document.querySelector('.js-button');
const clearButtonNode = document.querySelector('.js-clearButton')
const historyNode = document.querySelector('.js-history');
const sumNode = document.querySelector('.js-sum');
const limitNode = document.querySelector('.js-limit');
const statusNode = document.querySelector('.js-status');
const categorySelectNode = document.querySelector('.js-category')
const changeLimitPopUpBtnOpenNode = document.querySelector(".js-editor-limit-popup-btn-open");
const changeLimitPopupNode = document.querySelector(".editor-limit-popup");
const changeLimitPopupCloseBtnNode = document.querySelector(".js-popup-btn-close");
const changeLimitBtnNode = document.querySelector(".js-popup-btn-change-limit");
const inputNewLimitNode = document.querySelector(".js-input-new-limit");

let expenses = [];
let LIMIT = 10000;

init();

limitNode.innerText=localStorage.getItem("LIMIT")

// ---Функции-----

buttonNode.addEventListener('click', function() {
    const expense = getExpanseFromUser();

    if (!expense) {
        return;
    }

    trackExpanse(expense);

    render(expenses);

})


function init() {
    limitNode.innerText = LIMIT;
    statusNode.innerText = STATUS_IN_LIMIT;
    sumNode.innerText = 0;
};

// Сохранение трату в список

function trackExpanse(expense) {
    const category = categorySelectNode.value
    
    expenses.push({expense, category});

};

// Получаем значение из поля ввода

function getExpanseFromUser() {
    if (!inputNode.value) {
        return null;
    }
     
    const expense = parseInt(inputNode.value);

    clearInput();

    return expense;

};

function clearInput() {
    inputNode.value = '';
};

// Посчитать сумму и вывести её


function calculateExpanses(expenses) {
    let sum = 0;

    expenses.forEach(element => {
       sum += element.expense;
   });

   return sum;
};

function render(expenses) {
    const sum = calculateExpanses(expenses);

    renderHistory(expenses);
    renderSum(sum);
    renderStatus(sum);
};

// Выведем новый список трат

function renderHistory(expenses) {
    let expensesListHTML = '';

    expenses.forEach(element => {
    expensesListHTML += `<li>${element.category} - ${element.expense} ${CURRENCY}</li>`;
    });
     
    historyNode.innerHTML = `<ol>${expensesListHTML}</ol>`;


};

function renderSum(sum) {
    sumNode.innerText = sum;
};

// Сравнение с лимитом и вывод статуса

function renderStatus(sum) {
    const total = calculateExpanses(expenses);
    

    if (sum <= LIMIT) {
        statusNode.innerText = `${STATUS_IN_LIMIT} (${LIMIT - total} ${CURRENCY})`;
        statusNode.className = 'status_positive'
    } else {
        statusNode.innerText = `${STATUS_OUT_OF_LIMIT} (${LIMIT - total} ${CURRENCY})`;
        statusNode.className = 'status_negative' 
    }
    
};
// функция кнопки Сбросить расходы

const clearButtonNandler = () => {
    expenses = [];
    render(expenses);
};

clearButtonNode.addEventListener("click", clearButtonNandler); 

// Функция кнопки изменения лимита

changeLimitPopUpBtnOpenNode.addEventListener("click", popupChangeLimitOpen);

function popupChangeLimitOpen() {
  changeLimitPopupNode.classList.add(CHANGE_LIMIT_POPUP_OPEN);
};

changeLimitPopupCloseBtnNode.addEventListener("click", popupChangeLimitClose);

function popupChangeLimitClose() {
  changeLimitPopupNode.classList.remove(CHANGE_LIMIT_POPUP_OPEN);
};

changeLimitBtnNode.addEventListener("click", getLimitFromUser);

inputNewLimitNode.addEventListener("keydown", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    changeLimitBtnNode.click();
  } if (event.key === "-" || event.key === "e") {
    event.preventDefault();
  }
});

function getLimitFromUser() {
  if (!inputNewLimitNode.value) {
    LIMIT = LIMIT;
  } else {
    LIMIT = parseInt(inputNewLimitNode.value);

    limitNode.innerText = LIMIT;
    localStorage.setItem("LIMIT", inputNewLimitNode.value)

    popupChangeLimitClose();

    render(expenses);
  }
};
  