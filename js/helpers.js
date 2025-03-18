const addClickObserver = (targetElement, actionElement, action) => {
    let observer = new MutationObserver(() => document.querySelector(actionElement).addEventListener('click', () => console.log("click")));
    observer.observe(document.querySelector(targetElement), {childList: true, subtree: true, attributes: true});
}

export default addClickObserver;