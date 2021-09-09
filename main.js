const inputs = document.querySelectorAll("input");
const resetBtn = document.querySelector(".reset-button");
const nextBtn = document.querySelector(".next-button");
const filtersImg = document.querySelectorAll(".small-img-wrapper");
const img = document.querySelector(".main-img");
const filterImages = document.querySelectorAll(".filter-img");

let index = 1;

const defaultFilters = [
  "#342849",
  "700",
  "0",
  "0",
  "0",
  "100",
  "3",
  "100",
  "100",
  "0",
];

const filters = {
  filter_1977: {
    sepia: 50,
    hue: -30,
    saturate: 140,
    blur: 0,
    invert: 0,
    contrast: 100,
    brightness: 100,
  },
  filter_brannan: {
    sepia: 40,
    contrast: 125,
    brightness: 110,
    saturate: 90,
    hue: -2,
    blur: 0,
    invert: 0,
  },
  filter_lark: {
    sepia: 25,
    contrast: 120,
    brightness: 130,
    saturate: 125,
    hue: 0,
    blur: 0,
    invert: 0,
  },
  filter_lofi: {
    saturate: 110,
    contrast: 150,
    sepia: 0,
    brightness: 100,
    hue: 0,
    blur: 0,
    invert: 0,
  },
  filter_reyes: {
    sepia: 75,
    contrast: 75,
    brightness: 125,
    saturate: 140,
    hue: 0,
    blur: 0,
    invert: 0,
  },
  filter_skyline: {
    sepia: 15,
    contrast: 125,
    brightness: 125,
    saturate: 120,
    hue: 0,
    blur: 0,
    invert: 0,
  },
};

const changeFilterProperty = (input) => {
  if (input.dataset.filter === "size") {
    document.documentElement.style.setProperty(
      `--${input.dataset.filter}Width`,
      `${input.value}${input.dataset.sizing}`
    );
    document.documentElement.style.setProperty(
      `--${input.dataset.filter}Height`,
      `${(input.value * 7) / 10}${input.dataset.sizing}`
    );
  } else {
    document.documentElement.style.setProperty(
      `--${input.dataset.filter}`,
      `${input.value}${input.dataset.sizing}`
    );
  }
};

const changeFilterSizing = (input) => {
  input.parentNode.childNodes[5].textContent = `${input.value}${input.dataset.sizing}`;
};

const changeInput = (e) => {
  let target = e.target;
  changeFilterProperty(target);
  changeFilterSizing(target);
};

const resetFilters = () => {
  let index = 0;

  inputs.forEach((input) => {
    input.value = defaultFilters[index];
    changeFilterSizing(input);
    index++;
    changeFilterProperty(input);
  });
};

const changeFilters = (e) => {
  let target = e.target;
  if (target.classList.contains("filter-img")) {
    let filterName = String(target.classList).split(" ")[1];
    for (filter in filters) {
      if (filter === filterName) {
        inputs.forEach((input) => {
          for (key in filters[filter]) {
            if (key === input.dataset.filter) {
              input.value = filters[filter][key];
              document.documentElement.style.setProperty(
                `--${input.dataset.filter}`,
                `${filters[filter][key]}${input.dataset.sizing}`
              );
              changeFilterSizing(input);
            }
          }
        });
      }
    }
  }
};

const changeImage = () => {
  resetFilters();

  index++;
  img.style.backgroundImage = `url("./img/big-images/${index}.jpg")`;

  filterImages.forEach((image) => {
    image.style.backgroundImage = `url("./img/big-images/${index}.jpg")`;
  });

  if (index === 8) {
    index = 1;
  }
};

inputs.forEach((input) => {
  input.addEventListener("input", changeInput);
});

filtersImg.forEach((img) => {
  img.addEventListener("click", changeFilters);
});

resetBtn.addEventListener("click", resetFilters);
nextBtn.addEventListener("click", changeImage);

console.log(`Score: 30 / 30
Разобраться в коде чужого проекта, понять его, воспроизвести исходное приложение. Правки и изменения допускаются и приветствуются, если они не ухудшают внешний вид и функционал исходного проекта (10 баллов)
Дополнить исходный проект обязательным дополнительным функционалом, указанным в описании задания. Обязательный дополнительный функционал включает в себя дополнительные фильтры и пресеты - фото, к которым применён наборы фильтров. При выборе миниатюры пресета такие же фильтры применяются к основному фото. (10 баллов)
Дополнить исходный проект дополнительным функционалом на выбор из тех, которые перечислены в описании задания, или придуманным вами самостоятельно. В качестве дополнительного функционала реализован сброс фильтров кликом на кнопку и перелистывание фото (10 баллов)`);
