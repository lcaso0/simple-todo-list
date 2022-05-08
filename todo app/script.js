
function gettasks() {
    const fetchdata = Array.from( JSON.parse(localStorage.getItem("todo_app_test") || "[]") );

    document.getElementById("tasks").innerHTML = ""; //to empty container first

    fetchdata.forEach(data => {
        document.getElementById("tasks").innerHTML += `
            <style>
                .completed {
                    text-decoration: line-through;
                }
                h4:hover {
                    cursor: pointer;
                }
            </style>
            <div class="taskcontainer" id="taskcontainer${data.task}">
                <h4 style="padding-left: 30px;" id="task${data.task}">${data.task}</h4>
                <div>
                    <button id="delete${data.task}" style="border-radius: 50%; width: 25px; height: 25px; background: transparent; color: white; border: 2px solid white; font-weight: bold; margin-right: 10px;">X</button>
                </div>
            </div>
        `

        if (data.completed == true) {
            document.getElementById("task"+data.task).classList.add('completed');
        }
    })

    /* delete task */
    fetchdata.forEach(data => {
        document.getElementById("delete"+data.task).onclick = function() {
            fetchdata.splice(fetchdata.indexOf(data), 1);
            localStorage.setItem("todo_app_test", JSON.stringify(fetchdata));
            gettasks();
        }
    })

    /* Update task to completed */
    fetchdata.forEach(data => {
        document.getElementById("taskcontainer"+data.task).onclick = function() {
            const elementsIndex = fetchdata.findIndex(element => element.task == data.task );
            const newdata = Array.from( JSON.parse(localStorage.getItem("todo_app_test") || "[]") );
            newdata[elementsIndex] = {...newdata[elementsIndex], completed: !newdata[elementsIndex].completed}
            localStorage.setItem("todo_app_test", JSON.stringify(newdata));
            gettasks();
        }
    })
}

gettasks() //get tasks

document.getElementById("submit").onclick = function() {
    const task = document.getElementById("todoinput").value;

    if (task.length > 1) {
        const data = {
            "task": task,
            "completed": false
        }

        const fetchdata = JSON.parse(localStorage.getItem("todo_app_test") || "[]");

        localStorage.setItem("todo_app_test", JSON.stringify([...fetchdata, data]))

        gettasks()

        document.getElementById("todoinput").value = "" //set input value to null
    }
    else {
        alert("type anything...")
    }
}