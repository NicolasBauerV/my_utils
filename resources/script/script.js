window.onload = () => {
    // Create a div after each click on button "Add tag"
    const btnToDo  = document.querySelector('#btn_todo');
    const listToDo = document.querySelector('#to_do_list');
    const listDone = document.querySelector('#done');
    const lists    = document.querySelectorAll('.list');
    const btnSave  = document.querySelector('#save');
    
    let id = 0;

    listToDo.addEventListener('mouseenter', () => {
        turnTaskToFinish(listDone);
    })

    btnToDo.addEventListener('click', () => {
        id++;
        listToDo.removeChild(btnToDo);
        const divInputs = createForm(id);

        listToDo.appendChild(divInputs);

        const inputText = document.querySelector(`#task_${id}`);

        const buttonValid = divInputs.childNodes[1];
        buttonValid.addEventListener('click', () => {
            const task = inputText.value;
            if (task != "") {
                const newTask = createDivToDo(id, task)
                listToDo.appendChild(newTask);
                divInputs.style.display = 'none';
                listToDo.appendChild(btnToDo);
            }
        });
    });

    btnSave.addEventListener('click', () => {
        const taskText = [];
        const taskId = [];
        document.querySelectorAll('.tag').forEach(element => {
            taskId.push(element.id);
            taskText.push((element.childNodes)[1].textContent);
        });
        
        const taskData = {
            id: taskId,
            text: taskText
        }

        sendInfo(taskData);
    });
    
    
};

const createDivToDo = (id, task) => {
    const containerDiv     = document.createElement('div');
    containerDiv.className = 'tag';
    containerDiv.setAttribute('id', `to_do_${id}`);

    const borderDiv = document.createElement('div');
    borderDiv.setAttribute('id', 'border_todo');

    const pElement = document.createElement('p');
    pElement.textContent = task;

    const btnDel = createBtnDel();

    containerDiv.appendChild(borderDiv);
    containerDiv.appendChild(pElement);
    containerDiv.appendChild(btnDel);
    return containerDiv;
}

const createForm = (id) => {
    const divInputs = document.createElement('div');
    const inputText = document.createElement('input');
    inputText.type  = 'text';
    inputText.className = 'task';
    inputText.setAttribute('id', `task_${id}`);

    const buttonValid = document.createElement('button');
    buttonValid.textContent = 'Add';

    divInputs.appendChild(inputText);
    divInputs.appendChild(buttonValid);
    return divInputs;
}

const turnTaskToFinish = (listDone) => {
    const divsTask = document.querySelectorAll('.tag');
    let parent = "";
    divsTask.forEach(element => {
        element.childNodes[2].addEventListener('click', () => {
            element.remove();
        })
        element.addEventListener('dblclick', () => {
            listDone.appendChild(element);
            element.childNodes[0].setAttribute('id', 'border_done');
        });
    });
}

const createBtnDel = () => {
    const btnDel = document.createElement('button');
    btnDel.textContent = 'Delete';
    btnDel.className = 'btn_del';
    return btnDel;
}

//Ajax function (trying with fetch api)
// const sendInfoF = async taskData => {
//     //Ajax function
//     const url = `./resources/server/user.php`;
//     try {
//         const response = await fetch(url, {
//             method: 'POST',
//             headers: {
//                 'Content-type': 'application/json'
//             },
//             body: JSON.stringify(taskData)
//         })
//         throw new Error('Request failed!');
//     } catch (error) {
//         console.log(error);
//     }
// }

const sendInfo = taskData => {
    $.ajax({
        type: "POST",
        url: "./resources/server/user.php",
        dataType: 'application/json',
        data: {
            save: JSON.stringify(taskData)
        },
        success: function (response) {
            console.log(response);
        }
    });
}