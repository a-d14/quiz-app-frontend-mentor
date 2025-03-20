import View from "./View.js";

class QuizView extends View {
    _data;
    _parentElement = document.querySelector('main');

    _selectedOption;
    _answer;
    _invalidSubmission = false;
    _state = 'no selection';
    _numberOfCorrectAnswers = 0;

    _timeLimit = 10000;
    _timer;

    _action;

    addClickHandler(action) {
        this._action = action;

        document.querySelector('.options-list').addEventListener('click', (e) => {
            if(this._state !== 'submitted') {
                this._state = 'option selected';
                this._invalidSubmission = false;
                this._displayOrHideError();
                this._selectedOption = e.target.closest('li').dataset.option;
                console.log(this._selectedOption);
                
                this._generateOptionsHTML();
            }
        });

        document.getElementById('submit-answer').addEventListener('click', () => {
            this._handleSubmission(this._action);
        })

    }

    _handleSubmission(action) {
        if (this._state === 'no selection') {
            this._invalidSubmission = true;
            this._displayOrHideError();
        } else if (this._state === 'option selected') {
            this._state = 'submitted';
            this._answer = this._data.questions[this._data.currentIndex].answer;
            if(this._answer === this._selectedOption) {
                this._numberOfCorrectAnswers++;
            }
            console.log(this._numberOfCorrectAnswers);
            this._generateOptionsHTML();
            this._generateSubmitButtonHTML();
            clearInterval(this._timer);
        } else if (this._state === 'submitted') {
            console.log('here');
            
            this._selectedOption = null;
            this._answer = null;
            this._state = 'no selection';
            this._data.currentIndex++;
            this._timeLimit = 10000;

            if(this._data.currentIndex === this._data.questions.length) {
                clearInterval(this._timer);
                action(this._numberOfCorrectAnswers, this._data.questions.length);
                this._numberOfCorrectAnswers = 0;
                return;
            }
            clearInterval(this._timer);
            this.render();
            setTimeout(() => this.addClickHandler(this._action), 0);
        }
    }

    _startTimer() {
        this._timeLeft = this._timeLimit;
        const progressBar = document.querySelector("#countdown-bar");
        
        if (!progressBar) return;
        
        progressBar.value = this._timeLimit;

        this._timer = setInterval(() => {
            this._timeLeft -= 10;
            if (progressBar) progressBar.value = this._timeLeft;

            if (this._timeLeft <= 0) {
                clearInterval(this._timer);
                this._state = 'option selected';
                this._handleSubmission(this._action);
            }
        }, 10);
    }

    _generateOptionsMarkup() {
        return this._data.questions[this._data.currentIndex].options.map((option, idx) => `
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
        `).join('');
    }

    _generateOptionsHTML() {
        const optionsList = document.querySelector('.options-list');
        optionsList.innerHTML = '';
        optionsList.insertAdjacentHTML('afterbegin', this._generateOptionsMarkup());
    }

    _generateSubmitButtonHTML() {
        const submitButton = document.getElementById('submit-answer');
        if(this._state === 'submitted') {
            submitButton.textContent = 'Next Question'
        }
    }

    _generateErrorMarkup() {
        return '<div id="error-msg"><img src = "assets/images/icon-error.svg" /><span>Please select an answer</span></div>';
    }

    _displayOrHideError() {
        const parentElement = document.querySelector(".quiz");
        if(this._invalidSubmission) {
            parentElement.insertAdjacentHTML('beforeend', this._generateErrorMarkup());
        } else {
            document.getElementById('error-msg') && parentElement.removeChild(document.getElementById('error-msg'));
        }
    }

    _generateMarkup() {
        return `
            <section class="quiz">
                <span>Question ${this._data.currentIndex + 1} of ${this._data.questions.length}</span>
                <h2>${this._data.questions[this._data.currentIndex].question.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}</h2>
                <progress style="display: block; width: 100%" id="countdown-bar" value="${this._timeLimit}" max="${this._timeLimit}"></progress>
                <ul class="options-list">
                    ${this._generateOptionsMarkup()}
                </ul>
                <button id="submit-answer" class="submit-button">Submit Answer</button>
            </section>
        `;
    }

    render(data = this._data) {
        super.render(data);
        setTimeout(() => this._startTimer(), 0);
    }

}

export default new QuizView();