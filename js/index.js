const fruitsList = document.querySelector('.fruits__list'); // список карточек
const shuffleButton = document.querySelector('.shuffle__btn'); // кнопка перемешивания
const filterButton = document.querySelector('.filter__btn'); // кнопка фильтрации
const sortKindLabel = document.querySelector('.sort__kind'); // поле с названием сортировки
const sortTimeLabel = document.querySelector('.sort__time'); // поле с временем сортировки
const sortChangeButton = document.querySelector('.sort__change__btn'); // кнопка смены сортировки
const sortActionButton = document.querySelector('.sort__action__btn'); // кнопка сортировки
const kindInput = document.querySelector('.kind__input'); // поле с названием вида
const colorInput = document.querySelector('.color__input'); // поле с названием цвета
const weightInput = document.querySelector('.weight__input'); // поле с весом
const addActionButton = document.querySelector('.add__action__btn'); // кнопка добавления

let fruitsJSON = `[
  {"kind": "Мангустин", "color": "фиолетовый", "weight": 13},
  {"kind": "Дуриан", "color": "зеленый", "weight": 35},
  {"kind": "Личи", "color": "розово-красный", "weight": 17},
  {"kind": "Карамбола", "color": "желтый", "weight": 28},
  {"kind": "Тамаринд", "color": "светло-коричневый", "weight": 22}
]`;

let fruits = JSON.parse(fruitsJSON);

const display = () => {
  // console.log(fruitsList, fruitsList.children);
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
};

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

display();

/*** ПЕРЕМЕШИВАНИЕ ***/

// генерация случайного числа в заданном диапазоне
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// перемешивание массива
const shuffleFruits = () => {
  let result = [];

  // ATTENTION: сейчас при клике вы запустите бесконечный цикл и браузер зависнет
  while (fruits.length > 0) {
    // TODO: допишите функцию перемешивания массива
    //
    // Подсказка: находим случайный элемент из fruits, используя getRandomInt
    // вырезаем его из fruits и вставляем в result.
    // ex.: [1, 2, 3], [] => [1, 3], [2] => [3], [2, 1] => [], [2, 1, 3]
    // (массив fruits будет уменьшатся, а result заполняться)
  }

  fruits = result;
};

shuffleButton.addEventListener('click', () => {
  shuffleFruits();
  display();
});

/*** ФИЛЬТРАЦИЯ ***/

// фильтрация массива
const filterFruits = () => {
  fruits.filter((item) => {
    // TODO: допишите функцию
  });
};

filterButton.addEventListener('click', () => {
  filterFruits();
  display();
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