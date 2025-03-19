export default class View {
    _clear() {
        this._parentElement.innerHTML = '';
    }

    removeClickHandler(action) {
        this._parentElement.removeEventListener('click', action);
    }

    render(data = this._data, render = true) {
        this._data = data;
        console.log(this._data);
        
        const markup = this._generateMarkup();
        
        if(!render) return markup;

        this._clear();

        this._parentElement.insertAdjacentHTML('afterBegin', markup);
    }
}