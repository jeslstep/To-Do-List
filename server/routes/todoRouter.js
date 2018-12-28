const express = require('express');
const todoRouter = express.Router();
const pg = require('pg');

// DB CONNECTION
const config = {
    database: 'weekend-to-do-app',
    host: 'localhost',
    port: 5432,
    max: 10,
    idleTimeoutMillis: 30000
};
const pool = new pg.Pool(config);

pool.on("connect", () => {
    console.log('connected');
});

pool.on("error", (err) => {
    console.log('not connected', err);
});

// GET
todoRouter.get('/', (req, res) => {
    let sqlText = 'SELECT * FROM "tasks";'
    pool.query(sqlText)
        .then((result) => {
            res.send(result.rows);
        })
        .catch((error) => {
            console.log('error', error);
            res.sendStatus(500);
        })
});

// POST
todoRouter.post('/', (req, res) => {
    let taskObj = req.body;
    console.log(taskObj);
    let sqlText = `INSERT INTO tasks (task_name, complete_not_complete) 
    VALUES ($1, $2);`
    pool.query(sqlText, [taskObj.name, taskObj.status])
        .then((result) => {
            console.log(result);
            res.send(taskObj);
        })
        .catch((error) => {
            console.log(error);
            res.sendStatus(500);
        })
})

// PUT
todoRouter.put('/:id', (req, res) => {
    let reqId = req.params.id;
    console.log('changed status to', reqId);
    let sqlText = `UPDATE tasks SET complete_not_complete ='Y' WHERE id=$1;`;
    console.log(sqlText);

    pool.query(sqlText, [reqId])
        .then((result) => {
            console.log('Task\'s status changed');
            res.sendStatus(200);
        })
        .catch((error) => {
            console.log(`Error in changing status ${sqlText}`, error);
            res.sendStatus(500);
        })
})

// DELETE
todoRouter.delete('/:id', (req, res) => {
    let reqId = req.params.id;
    console.log('Delete request for id', reqId);
    let sqlText = `DELETE FROM tasks WHERE id=$1;`;
    console.log(sqlText);
    
    pool.query(sqlText, [reqId])
        .then((result) => {
            console.log('Task deleted');
            res.sendStatus(200);
        })
        .catch((error) => {
            console.log(`Error in deleting ${sqlText}`, error);
            res.sendStatus(500); 
        })
})



module.exports = todoRouter;