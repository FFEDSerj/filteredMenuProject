import menu from './menu.js'

const Jay = 'Hello my dear friend!';

document.addEventListener('DOMContentLoaded', () => {
  getMenuTemplate(menu);
  displayButtons();
});

const menuBody = document.querySelector('.menu__section-center');

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
    .join('')

  menuBody.innerHTML = menuItems;
}

const displayFilteredMenu = (arr, action) => {
  const filtered = arr.filter(item => item.category === action ? item : null)
  action === 'all' ? getMenuTemplate(menu) : getMenuTemplate(filtered);
};

const filterContainer = document.querySelector('.menu__btn-container');

function displayButtons() {
  const categoryButtons = menu
    .reduce((acc, { category }) => {
      if (!acc.includes(category)) acc.push(category)
      return acc
    }, ['all'])
    .map(category => {
      if (category === 'all') {
        return `<button type="button" class="menu__filter-btn active" data-filter="${category}">${category}</button>`
      }
      return `<button type="button" class="menu__filter-btn" data-filter="${category}">${category}</button>`
    })
    .join('');

  filterContainer.innerHTML = categoryButtons;
}


filterContainer.addEventListener('click', (e) => {
  if (e.target.classList.contains('menu__filter-btn')) {
    const filter = e.target.dataset.filter;
    displayFilteredMenu(menu, filter);
    const buttons = document.querySelectorAll('.menu__filter-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active')
  }
})



