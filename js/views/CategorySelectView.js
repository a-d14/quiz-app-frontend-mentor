import View from "./View.js";

class CategorySelectView extends View {
    _data;
    _parentElement = document.querySelector('main');

    addClickHandler(action) {
        this._parentElement.addEventListener('click', (e) => {            
            if(e.target.closest('ul') && e.target.closest('ul').classList.contains('category-list'))
                action(e.target.closest('li').dataset.title);
        });
    }

    _generateMarkup() {
        return `
            <section class="category-select">
                <section class="category-select__welcome-message">
                    <h1 class="category-select__welcome-message-heading">
                        <span class="heading-large-regular">Welcome to the</span>
                        <span class="heading-large-bold">Frontend Quiz!</span>
                    </h1>
                    <p class="category-select__welcome-message-subheading  body-italic">Pick a subject to get started.</p>
                </section>
                <ul class="category-list">
                    ${this._data.map(el => `
                        <li data-title='${el.title}'>
                            <div class="svg-container" data-title="${el.title}">
                                <img src=${el.icon}>
                            </div>
                            <span class="heading-small">${el.title}</span>
                        </li>
                    `).join('')}
                </ul>
            </section>
            
        `;
    }
}

export default new CategorySelectView();