const items = 
[{
    title: "Клубника",
    description: "Вкусная и полезная клубника неспроста заслуживает звания «королева ягод».",
    tags: ["fruit"],
    price: 30,
    img: "./img/image1.jpg",
    rating: 4.4,
  },
  {
    title: "Голубика",
    description: "Поможет в развСладкая ягода!",
    tags: ["fruit"],
    price: 35,
    img: "./img/image2.jpg",
    rating: 3.1,
  },
  {
    title: "Ананас",
    description: "Особо любимый многими ананас сорта Gold собирают уже спелым, поэтому он такой сладкий и ароматный.",
    tags: ["fruit"],
    price: 20,
    img: "./img/image3.jpg",
    rating: 5.0,
  },
  {
    title: "Редис»",
    description: "Яркий, красный корнеплод с сочной, вкусной, слегка горьковатой белой мякотью.",
    tags: ["vegetable"],
    price: 7,
    img: "./img/image4.jpg",
    rating: 4.7,
  },
  {
    title: "Картофель молодой",
    description: "Крохотные плоды baby картофеля",
    tags: ["vegetable"],
    price: 4,
    img: "./img/image5.jpg",
    rating: 4.9,
  },
  {
    title: "Малиновый томат",
    description: "Малиновые томаты отличаются приятным вкусом.",
    tags: ["vegetable"],
    price: 20,
    img: "./img/image6.jpg",
    rating: 3.2,
  },
  {
    title: "Баклажан граффити",
    description: "Небольшой баклажан, крепкий и очень вкусный",
    tags: ["vegetable"],
    price: 25,
    img: "./img/image7.jpeg",
    rating: 2.9,
  },
  {
    title: "Черри сливка",
    description: "Маленькие, сочные и невероятно вкусные помидоры",
    tags: ["vegetable"],
    price: 45,
    img: "./img/image8.jpeg",
    rating: 3.4,
  },
  {
    title: "Морковь",
    description: "Яркая морковь используется человеком в кулинарии и не только уже не одно тысячелетие.",
    tags: ["vegetable"],
    price: 8,
    img: "./img/image9.jpg",
    rating: 4.8,
  },
  {
    title: "Капуста Савойская",
    description: "Капуста Савойская",
    tags: ["vegetable"],
    price: 25,
    img: "./img/image10.jpg",
    rating: 3.2,
  },
  {
    title: "Стебель сельдерея",
    description: "Сочные и невероятно полезные стебли сельдерея.",
    tags: ["vegetable"],
    price: 10,
    img: "./img/image11.jpg",
    rating: 3.7,
  },
  {
    title: "Лук белый",
    description: "Одной из древнейших культур, используемых человеком в кулинарии, является белый лук.",
    tags: ["vegetable"],
    price: 12,
    img: "./img/image12.jpg",
    rating: 4.1,
  },
];

let currentState = [...items];
const itemsContainer = document.querySelector("#shop-items");
const itemTemplate = document.querySelector("#item-template");
const nothingFound = document.querySelector("#nothing-found");

function renderItems(arr) {
  nothingFound.textContent = "";
  itemsContainer.innerHTML = "";
  arr.forEach((item) => {
    itemsContainer.append(prepareShopItem(item));
  });
  if (!arr.length) {
    nothingFound.textContent = "Ничего не найдено";
  }
}


function sortByAlphabet(a, b) {
  if (a.title > b.title) {
    return 1;
  }
  if (a.title < b.title) {
    return -1;
  }
  return 0;
}

renderItems(currentState.sort((a, b) => sortByAlphabet(a, b)));

function prepareShopItem(shopItem) {
  const { title, description, tags, img, price, rating } = shopItem;
  const item = itemTemplate.content.cloneNode(true);
  item.querySelector("h1").textContent = title;
  item.querySelector("p").textContent = description;
  item.querySelector("img").src = img;
  item.querySelector(".price").textContent = `${price}P`;

  const ratingContainer = item.querySelector(".rating");
  for (let i = 0; i < rating; i++) {
    const star = document.createElement("i");
    star.classList.add("fa", "fa-star");
    ratingContainer.append(star);
  }

  const tagsHolder = item.querySelector(".tags");
  tags.forEach((tag) => {
    const element = document.createElement("span");
    element.textContent = tag;
    element.classList.add("tag");
    tagsHolder.append(element);
  });

  return item;
}

const searchInput = document.querySelector("#search-input");
const searchButton = document.querySelector("#search-btn");

function applySearch() {
  const searchString = searchInput.value.trim().toLowerCase();
  currentState = items.filter((el) =>
    el.title.toLowerCase().includes(searchString)
  );
  if (currentState.length === 0) {
    renderItems([]);
    nothingFound.textContent = "Ни один товар не соответствует условиям поиска.";
  } else {
    currentState.sort((a, b) => sortByAlphabet(a, b));
    renderItems(currentState);
  }
  sortControl.selectedIndex = 0;
}

searchButton.addEventListener("click", applySearch);
searchInput.addEventListener("search", applySearch);



const sortControl = document.querySelector("#sort");
sortControl.addEventListener("change", (event) => {
  const selectedOption = event.target.value;
  switch (selectedOption) {
    case "expensive": {
      currentState.sort((a, b) => b.price - a.price);
      break;
    }
    case "cheap": {
      currentState.sort((a, b) => a.price - b.price);
      break;
    }
    case "rating": {
      currentState.sort((a, b) => b.rating - a.rating);
      break;
    }
    case "alphabet": {
      currentState.sort((a, b) => sortByAlphabet(a, b));
      break;
    }
  }
  renderItems(currentState);
});
