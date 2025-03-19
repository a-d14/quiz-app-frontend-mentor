import View from "./View.js";

class QuizQuestionView extends View {
    _data;
    _parentElement = document.querySelector('main');

    _generateMarkup() {
        return `
            <span>Question ${this._data.currentIndex + 1} of ${this._data.data.questions.length}</span>
            <h2>${this._data.data.questions[this._data.currentIndex].question}</h2>
            <span>Progress Here</span>
            <ul class="options-list">
                ${this._data.data.questions[this._data.currentIndex].options.map(option => `
                    <li>${option}</li>
                `).join('')}
            </ul>
        `;
    }

}

export default new QuizQuestionView;