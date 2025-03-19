export const state = {
    data: {},
    selectedCategory: '',
    categoryIcon: ''
}

export const getData = async (path) => {
    const response = await fetch(path);
    const data = await response.json();
    state.data = data;
}
