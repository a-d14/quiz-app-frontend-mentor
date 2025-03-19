import View from "./View.js";

class ResultView extends View {
    _data;
    _parentElement = document.querySelector('main');

    addClickHandler(action) {
        this._parentElement.addEventListener('click', (e) => {
            if(e.target.id === 'restart-quiz') {
                action();
            }
        })
    }

    _generateMarkup() {
        return `
            <section>
                <div>
                    <img src="${this._data.icon}" />
                    <span>${this._data.quizTitle}</span>
                </div>
                <h2>${this._data.correctAnswers}</h2>
                <span>out of ${this._data.totalQuestions}</span>
            </section>
            <button id="restart-quiz">Play Again</button>
        `;
    }

}

export default new ResultView();