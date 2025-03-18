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
            <ul class="select-choice">
                ${this._data.map(el => `
                    <li>
                        <div>
                            <img src=${el.icon}>
                        </div>
                        ${el.title}
                    </li>
                `).join('')}
            </ul>
        `;
    }
}

export default new StartPageView();