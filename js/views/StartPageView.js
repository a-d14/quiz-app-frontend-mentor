import View from "./View.js";

class StartPageView extends View {
    _data;
    _parentElement = document.querySelector('main');

    _generateMarkup() {
        return `
            <section class="welcome-message">
                <h1>Welcome to the Frontend Quiz!</h1>
                <p>Pick a subject to get started.</p>
            </section>
            <ul class="category-list">
                ${this._data.map(el => `
                    <li>
                        <div data-title='${el.title}'>
                            <img src=${el.icon}>
                        </div>
                        <span>${el.title}</span>
                    </li>
                `).join('')}
            </ul>
        `;
    }
}

export default new StartPageView();