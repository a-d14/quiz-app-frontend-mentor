import * as model from './model.js';
import categorySelectView from './views/CategorySelectView.js';
import quizView from './views/QuizView.js';
import resultView from './views/ResultView.js';

const rootElement = document.documentElement;
const themeToggle = document.getElementById('theme-toggle');

rootElement.dataset.theme = localStorage.getItem('theme') ?? 'light';

themeToggle.addEventListener('change', (e) => {
    if(!e.target.checked) {
        rootElement.dataset.theme = 'light';
        localStorage.setItem('theme', 'light');
    } else {
        rootElement.dataset.theme = 'dark';
        localStorage.setItem('theme', 'dark');
    }
});

const quizHeader = document.getElementById('current-quiz-title');

const selectCategoryAndStartQuiz = (categoryName) => {    
    const currentQuizInfo = model.state.data.quizzes.find((q) => q.title === categoryName);
    const currentQuestions = model.state.data.quizzes.find((q) => q.title === categoryName).questions;
    model.state.selectedCategory = categoryName;
    model.state.categoryIcon = currentQuizInfo.icon;
    const data = {questions: currentQuestions, currentIndex: 0};

    quizHeader.insertAdjacentHTML('afterbegin', `
        <div class="svg-container" data-title="${model.state.selectedCategory}">
            <img src=${model.state.categoryIcon}>
        </div>
        <span class="heading-small">${model.state.selectedCategory}</span>
    `);

    quizView.render(data);
    setTimeout(() => quizView.addClickHandler(showResult), 0);
}

const showResult = (correctAnswers, totalQuestions) => {
    resultView.render({correctAnswers, totalQuestions, quizTitle: model.state.selectedCategory, icon: model.state.categoryIcon});
}

const returnToHome = () => {
    model.state.selectedCategory = '';
    model.state.categoryIcon = '';
    quizHeader.innerHTML = '';
    categorySelectView.render(model.state.data.quizzes.map(el => ({"title": el.title, "icon": el.icon})));
}

async function init() {
    await model.getData('data.json');
    categorySelectView.addClickHandler(selectCategoryAndStartQuiz);
    // quizView.addClickHandler(showResult);
    resultView.addClickHandler(returnToHome);
    categorySelectView.render(model.state.data.quizzes.map(el => ({"title": el.title, "icon": el.icon})));
}

init();