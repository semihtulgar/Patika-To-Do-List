function inputControl() {
    let inputValue = document.querySelector('#task').value;
    let isValid = false;
    if (inputValue !== "" && inputValue !== " ") {
        isValid = true;
        return {
            "isValid": isValid,
            "value": inputValue
        };
    } else {
        return isValid;
    }
}

// if localstorage has tasks, assign the tasks to the variable, if it doesn't return a empty array
let itemsArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];
localStorage.setItem('items', JSON.stringify(itemsArray));

let data = JSON.parse(localStorage.getItem('items'));

// Add New Element
function newElement(event) {
    // Add new task to list (if input value is valid)
    if (inputControl().isValid === true) {
        let listDom = document.querySelector('#list');
        let liElement = document.createElement('li');
        liElement.innerHTML = inputControl().value;
        listDom.appendChild(liElement);
        // show toast alert
        $('.success').toast('show');

        let spanElement = document.createElement('span');
        let icon = document.createTextNode("\u00D7");
        spanElement.className = 'close';
        spanElement.appendChild(icon);
        liElement.appendChild(spanElement);
        // add a new task to local storage
        itemsArray.push(inputControl().value);
        localStorage.setItem('items', JSON.stringify(itemsArray));
        document.querySelector('#task').value = "";
    } else {
        // toast alert here
        $('.error').toast('show');
    }
}

// show all tasks
data.forEach(element => {
    let listDom = document.querySelector('#list');
    let liElement = document.createElement('li');
    liElement.innerHTML = element;
    listDom.appendChild(liElement);
    let spanElement = document.createElement('span');
    let icon = document.createTextNode("\u00D7");
    spanElement.className = 'close';
    spanElement.appendChild(icon);
    liElement.appendChild(spanElement);
});


// Delete An Element
let listElement = document.querySelector('#list ');
listElement.addEventListener("click", function (event) {
    if (event.target.className === 'close') {
        event.target.parentElement.remove();
        let targetElement = event.target.parentNode.innerHTML.slice(0, event.target.parentNode.innerHTML.indexOf('<'));
        // removing task from local storage
        let tasks = JSON.parse(localStorage.getItem('items'));
        tasks.splice(tasks.indexOf(targetElement), 1);
        console.log(tasks);
        itemsArray = [];
        for (let i = 0; i < tasks.length; i++) {
            itemsArray.push(tasks[i]);
        }
        localStorage.setItem('items', JSON.stringify(itemsArray));

        
    } else if (event.target.tagName === 'LI') {
        event.target.classList.toggle('checked') // checked an event listener
    }
});

