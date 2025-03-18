export const state = {
    data: {}
}

export const getData = async (path) => {
    const response = await fetch(path);
    const data = await response.json();
    state.data = data;
}
