import menu from './menu.js'
const Jay = 'Hello my dear friend!';

const menuBody = document.getElementById('our-menu-dishes');
const filterContainer = document.getElementById('filter-buttons-container');

document.addEventListener('DOMContentLoaded', () => {
  const getMenuHTMLTemplate = getMenuTemplate(menu);
  menuBody.innerHTML = getMenuHTMLTemplate;

  const getFilterButtons = displayButtons();
  filterContainer.innerHTML = getFilterButtons;
});


function getMenuTemplate(data) {
  const menuItems = data
    .map(({ title, price, desc, img }) => {
      return `
      <article class="menu__item item-menu">
        <img src="${img}" alt="${title}" class="item-menu__photo" />
        <div class="item-menu__info">
          <header>
            <h4>${title}</h4>
            <h4 class="item-menu__price">$${price}</h4>
          </header>
          <p class="item-menu__text">
            ${desc}
          </p>
        </div>
      </article>
    `
    })
    .join('');

  return menuItems;
}

const displayFilteredMenu = (menuArr, action) => {
  const filtered = menuArr.filter(item => item.category === action ? item : null);
  const menuDataAction = action === 'all' ? menu : filtered;
  const filteredMenuItems = getMenuTemplate(menuDataAction);

  return filteredMenuItems;
};


function displayButtons() {
  const categoryButtons = menu
    .reduce((acc, { category }) => {
      acc.includes(category) ? acc : acc.push(category);
      return acc
    }, ['all'])
    .map(category => {
      return `
      <button type="button" class="menu__filter-btn ${category === 'all' ? 'active' : ''}" data-filter="${category}">${category}</button>
      `
    })
    .join('');

  return categoryButtons;
}


filterContainer.addEventListener('click', event => {
  const button = event.target;

  if (button.classList.contains('menu__filter-btn')) {
    const { filter } = button.dataset;
    const getFilteredMenuHTML = displayFilteredMenu(menu, filter);
    menuBody.innerHTML = getFilteredMenuHTML;

    const menuCategoryButtons = document.querySelectorAll('.menu__filter-btn');
    menuCategoryButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
  }
});



