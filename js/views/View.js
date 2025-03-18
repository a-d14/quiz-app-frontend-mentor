export default class View {
    _clear() {
        this._parentElement.innerHTML = '';
    }

    render(data, render = true) {
        this._data = data;
        const markup = this._generateMarkup();
        if(!render) return markup;

        this._clear();
        this._parentElement.insertAdjacentHTML('afterBegin', markup);
    }
}