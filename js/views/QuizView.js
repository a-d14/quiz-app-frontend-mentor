import View from "./View.js";

class QuizView extends View {
    _data;
    _action;
    _parentElement = document.querySelector('main');

    _selectedOption;
    _answer;

    _invalidSubmission = false;
    _state = 'no selection';
    _numberOfCorrectAnswers = 0;

    _timeLimit = 10000;
    _timer;

    addClickHandler(action) {
        this._action = action;

        document.querySelector('.quiz__options').addEventListener('click', (e) => {
            if(this._state !== 'submitted') {
                this._state = 'option selected';
                this._invalidSubmission = false;
                this._displayOrHideError();
                this._selectedOption = e.target.closest('li').dataset.option;                
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
            this._generateOptionsHTML();
            this._generateSubmitButtonHTML();
            clearInterval(this._timer);
        } else if (this._state === 'submitted') {            
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
            // console.log(this._timeLeft);
            
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
                <div class="svg-container">
                    <span class="heading-small">${String.fromCharCode('A'.charCodeAt(0) + idx)}</span>
                </div>
                <span class="heading-small">${option.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}</span>
                ${this._state === 'submitted' && option === this._answer ? '<img src = "assets/images/icon-correct.svg" />' : ''}
                ${this._state === 'submitted' && this._selectedOption === option && option !== this._answer ? '<img src = "assets/images/icon-incorrect.svg" />' : ''}
            </li>
        `).join('');
    }

    _generateOptionsHTML() {
        const optionsList = document.querySelector('.quiz__options');
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
        return '<div class="error" id="error-msg"><img src = "assets/images/icon-error.svg" /><span class="body-regular">Please select an answer</span></div>';
    }

    _displayOrHideError() {
        const errorElement = document.getElementById('error-msg');
        if(this._invalidSubmission) {
            errorElement.classList.remove('hidden');
        } else {
            errorElement.classList.add('hidden');
        }
    }

    _generateMarkup() {
        return `
            <section class="quiz">
                <section class="quiz__question">
                    <span class="quiz__question-header body-italic">Question ${this._data.currentIndex + 1} of ${this._data.questions.length}</span>
                    <h2 class="heading-medium">${this._data.questions[this._data.currentIndex].question.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}</h2>
                    <progress class="quiz__countdown countdown-bar" style="display: block; width: 100%" id="countdown-bar" value="${this._timeLimit}" max="${this._timeLimit}"></progress>
                </section>
                <section class="quiz__body">
                    <ul class="quiz__options">
                        ${this._generateOptionsMarkup()}
                    </ul>
                </section>
                <section class="quiz__action">
                    <button id="submit-answer" class="btn-primary heading-small">Submit Answer</button>
                    <div class="error hidden" id="error-msg"><img src = "assets/images/icon-error.svg" /><span class="body-regular">Please select an answer</span></div>
                </section>
            </section>
        `;
    }

    render(data = this._data) {
        super.render(data);
        setTimeout(() => this._startTimer(), 0);
    }

}

export default new QuizView();