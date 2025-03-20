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
                <section class="welcome-message">
                    <h1>Welcome to the Frontend Quiz!</h1>
                    <p>Pick a subject to get started.</p>
                </section>
                <ul class="category-list">
                    ${this._data.map(el => `
                        <li data-title='${el.title}'>
                            <div>
                                <img src=${el.icon}>
                            </div>
                            <span>${el.title}</span>
                        </li>
                    `).join('')}
                </ul>
            </section>
            
        `;
    }
}

export default new CategorySelectView();