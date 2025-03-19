import * as model from './model.js';
import startPageView from './views/StartPageView.js';
import quizQuestionView from './views/QuizQuestionView.js';
import addClickObserver from './helpers.js';

let observer;

// window.addEventListener('click', (e) => {
//     console.log(e.target);
// })

const selectAnswer = () => {
    console.log('answer');
}

const selectCategoryAndStartQuiz = (categoryName) => {
    console.log(categoryName.trim());
    const data = {"data": model.state.data.quizzes.find((q) => q.title === categoryName), currentIndex: 0}
    observer.disconnect();
    observer = addClickObserver("main", ".options-list", selectAnswer);
    quizQuestionView.render(data);
}

async function init() {
    await model.getData('data.json');
    console.log(model.state.data);
    observer = addClickObserver("main", ".category-list", selectCategoryAndStartQuiz);
    startPageView.render(model.state.data.quizzes.map(el => ({"title": el.title, "icon": el.icon})));
}

init();