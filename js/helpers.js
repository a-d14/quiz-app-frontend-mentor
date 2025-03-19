const addClickObserver = (targetElement, actionElement, action) => {

    let observer;

    if(actionElement === ".category-list") {
        observer = new MutationObserver(() => document.querySelector(actionElement).addEventListener('click', (e) => {        
            const category = e.target.textContent || e.target.parentElement.dataset.title;
            action(category);
        }));
    } else if(actionElement === ".options-list") {
        console.log('here');
        
        observer = new MutationObserver(() => document.querySelector(actionElement).addEventListener('click', (e) => {      
            action();
        }));
    }

    observer.observe(document.querySelector(targetElement), {childList: true, subtree: true, attributes: true});
    return observer;
}

export default addClickObserver;