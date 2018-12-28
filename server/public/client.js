console.log('js');

// bringing in JQ
$(document).ready(onReady);

function onReady() {
    console.log('JQ');
    getTasks();
    btnHandlers();
}

// global varible defining tasks as incomplete to start
const status = 'N'

// function handles the buttons
function btnHandlers() {
    $('#addTaskBtn').on('click', addTasksToDatabase);
    $('#appendTasks').on('click', '.completeBtn', completeBtnFun);
    $('#appendTasks').on('click', '.deleteBtn', deleteBtnFun);
}

// ajax GET request to server to get tasks
function getTasks() {
    console.log('in getTasks');
    $.ajax({
        method: 'GET',
        url: '/tasks',
    }).then(function (response) {
        console.log('From server', response);
        $('#appendTasks').empty();
// appends tasks from database to the dom
        for (let task of response) {
            console.log('the task is',task);
// added id data in order to delete
        let newTask = $(`<li><input class="checkBox" type="checkbox" required> 
        ${task.task_name}<button class="completeBtn btn btn-outline-success btn">Complete</button>
        <button class = "deleteBtn btn btn-outline-danger btn-xs">Delete</button></li>`);
            $('#appendTasks').append(newTask)
            newTask.data('id', task.id);
            console.log('the task.id is ', task.id);
// adds the correct color to indicate complete tasks from the database
        if (task.complete_not_complete == 'Y') {
         $('li').css("color", "green");
            }  
        }
    }).catch(function (response) {
        console.log('Error getting data from server');
    })
}

// delete btn DELETE request to server
function deleteBtnFun(){
    console.log('clicked delete');
    let taskId = $(this).closest('li').data('id');
    console.log('the taskId being sent is', taskId);
    
$.ajax({
    method: 'DELETE',
    url: `/tasks/${taskId}`
}).then(function (response) {
    console.log('Deleted it!');
    getTasks();
}).catch(function (error) {
    console.log('Error in delete', error);
    res.sendStatus(500);
}) 
}

// POST request to server adds tasks to the database 
function addTasksToDatabase() {
    console.log('in addTasksToDatabase');
    let addTask = $('#taskToBeAdded').val();
    $.ajax({
        method: 'POST',
        url: '/tasks',
        data: {
            name: addTask,
            status: status
        }
    }).then(function (response) {
        console.log(`saved task, ${response}`);
        // re-display tasks
        getTasks();
        //clears input
        $('#taskToBeAdded').val('');
    }).catch(function (error) {
        alert(`error saving task: ${error}`);
        res.sendStatus(500);
    })
}

// complete btn PUT request
function completeBtnFun() {
    console.log('clicked complete');
    $(this).closest('input').attr('checked', true);
    
    $(this).parent().css("color", "green");
    let taskId = $(this).closest('li').data('id');
 $.ajax({
     method: 'PUT',
     url: `/tasks/${taskId}`,
     data: {
         status: status
     }
 }).then(function (response) {
    console.log('changed status');
    
 }).catch(function (error) {
     alert('Error in changing status', error);
 })
}