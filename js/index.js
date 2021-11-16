const fruitsList = document.querySelector('.fruits__list'); // список карточек
const shuffleButton = document.querySelector('.shuffle__btn'); // кнопка перемешивания
const filterButton = document.getElementById('btnFilter'); // кнопка фильтрации
const clearButton = document.getElementById('btnClear'); // кнопка сброса фильтра
const sortKindLabel = document.querySelector('.sort__kind'); // поле с названием сортировки
const sortTimeLabel = document.querySelector('.sort__time'); // поле с временем сортировки
const sortChangeButton = document.querySelector('.sort__change__btn'); // кнопка смены сортировки
const sortActionButton = document.querySelector('.sort__action__btn'); // кнопка сортировки
const kindInput = document.querySelector('.kind__input'); // поле с названием вида
const colorInput = document.querySelector('.color__input'); // поле с названием цвета
const weightInput = document.querySelector('.weight__input'); // поле с весом
const maxWeightInput = document.getElementById('maxWeight');
const minWeightInput = document.getElementById('minWeight');
const addActionButton = document.querySelector('.add__action__btn'); // кнопка добавления

let fruitsJSON = `[
  {"kind": "Мангустин", "color": "фиолетовый", "weight": 13},
  {"kind": "Дуриан", "color": "зеленый", "weight": 35},
  {"kind": "Личи", "color": "розово-красный", "weight": 17},
  {"kind": "Карамбола", "color": "желтый", "weight": 28},
  {"kind": "Тамаринд", "color": "светло-коричневый", "weight": 22}
]`;

let fruits = JSON.parse(fruitsJSON);
let savedFruitsList = fruits;

function saveFruitsList() {
  savedFruitsList = fruits
}

function loadFruitsList() {
  fruits = savedFruitsList
}

/*** ДИНАМИЧЕСКОЕ ОТОБРАЖЕНИЕ ***/

const display = () => {
  for (let i = (fruitsList.children.length - 1); i >= 0; i--) {
    // Удаление элементов со страницы 3 способами (ссылка на источник: http://shpargalkablog.ru/2013/08/appendchild-removechild-javascript.html)
    // Способ удаления № 1
    fruitsList.children[i].parentNode.removeChild(fruitsList.children[i]);
    // Способ удаления № 2
    // fruitsList.children[i].remove();
    // Способ удаления № 3
    // fruitsList.children[i].outerHTML = '';

    // Страховка от бесконечного цикла
    // if (i > 10 || i < -10) {
    //   console.log('break');
    //   break
    // }
  }
  for (let i = 0; i < fruits.length; i++) {
    const text = `<li class="fruit__item" id="fruit_${i}">
    <div class="fruit__info">
      <p>index: ${i}</p>
      <p>kind: ${fruits[i].kind}</p>
      <p>color: ${fruits[i].color}</p>
      <p>weight (кг): ${fruits[i].weight}</p>
    </div>
  </li>`;
    // Способы создания элементов на странице:
    // Способ № 1
    // Узнать почему не получается вставить элемент на страницу с помощью insertBefore
    // let fruitsListItem = document.createElement('li').innerHTML = text;
    // document.body.insertBefore(fruitsListItem, fruitsList);
    //  Способ № 2
    fruitsList.insertAdjacentHTML('beforeend', text);
    // Установка цвета для элементов списка
    let fruitsListItem = document.getElementById(`fruit_${i}`);
    let colorClass = findColorClass(`${fruits[i].color}`);
    fruitsListItem.classList.add(`${colorClass}`);
  }

  function findColorClass(colorName) {
    let colorClassName;
    switch (colorName) {
      case 'фиолетовый':
        colorClassName = 'fruit_violet';
        break;
      case 'зеленый':
        colorClassName = 'fruit_green';
        break;
      case 'розово-красный':
        colorClassName = 'fruit_carmazin';
        break;
      case 'желтый':
        colorClassName = 'fruit_yellow';
        break;
      case 'светло-коричневый':
        colorClassName = 'fruit_lightbrown';
        break;
      default:
        colorClassName = 'fruit_red';
    }
    return colorClassName
  }
};

display();

/*** SHUFFLE ***/

const getRandomInt = (min = 0, max = 10) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const shuffleFruits = () => {
  let startFruitsList = getFruitsList(fruits);
  let result = [];
  while (fruits.length > 0) {
    let randomInt = getRandomInt(0, fruits.length);
    let randomFruit = fruits.slice((randomInt - 1), randomInt);
    if ((randomInt - 1) >= 0) {
      let item = randomFruit[0];
      result.push(item);
      fruits.splice((randomInt - 1), 1, );
    }
  }
  let endFruitsList = getFruitsList(result);
  if (isEqual(startFruitsList, endFruitsList)) alert('Перемешивания списка фруктов не произошло.');
  fruits = result;

  function getFruitsList(arr) {
    let fruitsList = [];
    arr.forEach(el => {
      let kind = el.kind;
      fruitsList.push(kind);
    });
    return fruitsList
  }

  function isEqual(arr1, arr2) {
    let compareArr = [];
    for (let i = 0; i < arr1.length || i < arr2.length; i++) {
      compareArr.push((arr1[i] == arr2[i]));
    }
    let equal = (compareArr.includes(true) && compareArr.every(el => el == true));
    return equal
  }
};

shuffleButton.addEventListener('click', () => {
  shuffleFruits();
  saveFruitsList();
  display();
});

/*** ФИЛЬТРАЦИЯ ***/


// Фильтрация массива
const filterFruits = () => {
  saveFruitsList();
  let maxWeight = parseInt(maxWeightInput.value);
  let minWeight = parseInt(minWeightInput.value);
  if (checkWeightInput()) {
    // console.log('min: ', minWeight, '/ max: ', maxWeight);
    let filteredFruits = fruits.filter((item) => {
      let weight = item.weight;
      // console.log(`${item.kind} ${item.weight} КГ\nmin: ${item.weight} >= ${minWeight}? ${weight >= minWeight}\nmax: ${item.weight} <= ${maxWeight}? ${weight <= maxWeight}\nПрошел через фильтр? ${(weight >= minWeight) && (weight <= maxWeight)}`);
      return (weight >= minWeight) && (weight <= maxWeight)
    });
    fruits = filteredFruits;
  }

  function checkWeightInput() {
    if (checkValue(minWeight) == false || checkValue(maxWeight) == false) {
      maxWeightInput.value = 100;
      minWeightInput.value = 0;
      return false
    } else return true

    function checkValue(value) {
      if (value < 0) {
        error();
        return false
      } else if (value == null || '' || undefined) {
        error();
        return false
      } else if (isNaN(value)) {
        error();
        return false
      } else return true

      function error() {
        alert(`Ошибка ввода значений для весового фильтра: \n введите в полях MIN и MAX положительные числа.`);
      }
    }
  }
};

filterButton.addEventListener('click', () => {
  loadFruitsList();
  filterFruits();
  display();
});

function clearFilter() {
  loadFruitsList();
  display();
  maxWeightInput.value = 100;
  minWeightInput.value = 0;
}

clearButton.addEventListener('click', () => {
  clearFilter()
});

/*** СОРТИРОВКА ***/

let sortKind = 'bubbleSort'; // инициализация состояния вида сортировки
let sortTime = '-'; // инициализация состояния времени сортировки

const comparationColor = (a, b) => {
  // TODO: допишите функцию сравнения двух элементов по цвету
};

const sortAPI = {
  bubbleSort(arr, comparation) {
    // TODO: допишите функцию сортировки пузырьком
  },

  quickSort(arr, comparation) {
    // TODO: допишите функцию быстрой сортировки
  },

  // выполняет сортировку и производит замер времени
  startSort(sort, arr, comparation) {
    const start = new Date().getTime();
    sort(arr, comparation);
    const end = new Date().getTime();
    sortTime = `${end - start} ms`;
  },
};

// инициализация полей
sortKindLabel.textContent = sortKind;
sortTimeLabel.textContent = sortTime;

sortChangeButton.addEventListener('click', () => {
  // TODO: переключать значение sortKind между 'bubbleSort' / 'quickSort'
});

sortActionButton.addEventListener('click', () => {
  // TODO: вывести в sortTimeLabel значение 'sorting...'
  const sort = sortAPI[sortKind];
  sortAPI.startSort(sort, fruits, comparationColor);
  display();
  // TODO: вывести в sortTimeLabel значение sortTime
});

/*** ДОБАВИТЬ ФРУКТ ***/

addActionButton.addEventListener('click', () => {
  // TODO: создание и добавление нового фрукта в массив fruits
  // необходимые значения берем из kindInput, colorInput, weightInput
  display();
});