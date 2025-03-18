import * as model from './model.js';
import startPageView from './views/StartPageView.js';

async function init() {
    await model.getData('data.json');
    console.log(model.state.data);
    startPageView.render(model.state.data.quizzes.map(el => ({"title": el.title, "icon": el.icon})));
}

init();