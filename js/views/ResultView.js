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
            <section class="result">
                <h1 class="result__completion-message">
                    <span class="heading-large-regular">Quiz Completed</span>
                    <span class="heading-large-bold">You Scored...</span>
                </h1>
                <section class="result__card">
                    <section class="result__card-header">
                        <div class="svg-container" data-title="${this._data.quizTitle}">
                            <img src="${this._data.icon}" />
                        </div>
                        <span class="heading-small">${this._data.quizTitle}</span>
                    </section>
                    <section class="result__card-body">
                        <h2 class="display">${this._data.correctAnswers}</h2>
                        <span class="body-regular">out of ${this._data.totalQuestions}</span>
                    </section>
                </section>
                <section class="result__actions">
                    <button id="restart-quiz" class="btn-primary heading-small">Play Again</button>
                </section>
            <section>
        `;
    }

}

export default new ResultView();