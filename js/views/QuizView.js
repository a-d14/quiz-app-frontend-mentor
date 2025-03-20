import View from "./View.js";

class QuizView extends View {
    _data;
    _parentElement = document.querySelector('main');

    _selectedOption;
    _answer;
    _invalidSubmission = false;
    _state = 'no selection';
    _numberOfCorrectAnswers = 0;

    addClickHandler(action) {
        this._parentElement.addEventListener('click', (e) => {

            if(e.target.id === 'submit-answer') {
                if (this._state === 'no selection') {
                    this._invalidSubmission = true;
                } else if (this._state === 'option selected') {
                    this._state = 'submitted';
                    this._answer = this._data.questions[this._data.currentIndex].answer;
                    if(this._answer === this._selectedOption) 
                        this._numberOfCorrectAnswers++;
                } else if (this._state === 'submitted') {
                    this._selectedOption = null;
                    this._answer = null;
                    this._state = 'no selection';
                    this._data.currentIndex++;

                    if(this._data.currentIndex === this._data.questions.length) {
                        action(this._numberOfCorrectAnswers, this._data.questions.length);
                        return;
                    }

                }
                this.render();
            } else if(e.target.closest('ul')?.classList.contains('options-list')) {
                console.log(e.target);
                
                if(this._state !== 'submitted') {
                    this._state = 'option selected';
                    this._invalidSubmission = false;
                    this._selectedOption = e.target.closest('li').dataset.option;
                    console.log(this._selectedOption);
                    
                    this.render();
                }
            }
        });
    }

    _generateMarkup() {
        return `
            <section class="quiz">
                <span>Question ${this._data.currentIndex + 1} of ${this._data.questions.length}</span>
                <h2>${this._data.questions[this._data.currentIndex].question.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}</h2>
                <span>Progress Here</span>
                <ul class="options-list">
                    ${this._data.questions[this._data.currentIndex].options.map((option, idx) => `
                        <li data-option="${option}" class="${(this._state === 'option selected' && this._selectedOption === option) ?
                                        'selected' : (this._state === 'submitted' && this._selectedOption === option && option !== this._answer) ? 
                                        'incorrect' : (this._state === 'submitted' && this._selectedOption === option && option === this._answer) ? 
                                        'correct' : ''}">
                            <div>
                                ${String.fromCharCode('A'.charCodeAt(0) + idx)}
                            </div>
                            ${option.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}
                            ${this._state === 'submitted' && option === this._answer ? '<img src = "assets/images/icon-correct.svg" />' : ''}
                            ${this._state === 'submitted' && this._selectedOption === option && option !== this._answer ? '<img src = "assets/images/icon-incorrect.svg" />' : ''}
                        </li>
                    `).join('')}
                </ul>
                <button id="submit-answer">${this._state === 'submitted' ? 'Next Question' : 'Submit Answer'}</button>
                ${this._invalidSubmission ? '<img src = "assets/images/icon-error.svg" /> <span>Please select an answer</span>' : ''}
            </section>
        `;
    }

}

export default new QuizView();