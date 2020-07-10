const express = require('express');
const subjectiveRouter = express.Router();
const sqlite3 = require('sqlite3');
const { updateTable } = require('../src/fetchExpress');
const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite');

subjectiveRouter.get('/', (req,res,next) => {
    db.all(`SELECT * FROM Subjective WHERE weekId = $id;`, {$id: req.query.weekId}, (err, rows) => {
        if(err) {
            next(err);
        } else{
            res.status(200).json({textboxes: rows});
        }
    });
});

subjectiveRouter.post('/', (req,res,next) => {
    const newTextbox = req.body.textbox;
    if(!newTextbox.skillName){
        res.sendStatus(400);
    } else {
        db.run(`INSERT INTO Subjective (text, skillName, weekId)
            VALUES ($text, $skillName, $weekId);`, {
                $text: newTextbox.text, 
                $skillName: newTextbox.skillName,
                $weekId: newTextbox.weekId
            }, function(err){
                if(err) {
                    next(err);
                } else{
                    db.get(`SELECT * FROM Subjective WHERE id = $id;`, {$id: this.lastID}, (err, row) => {
                        res.status(201).json({textbox: row});
                    });
                }
            });
    }
});

subjectiveRouter.put('/', (req,res,next) => {
    const updatedTextbox = req.body.textbox;
    if(!updatedTextbox.skillName) {
        res.sendStatus(400);
    } else{
        db.run(`UPDATE Subjective SET 
            skillName = $skillName,
            text = $text
            WHERE id = $id;`, {
                $skillName: updatedTextbox.skillName,
                $text: updatedTextbox.text,
                $id: updatedTextbox.id
            }, (err) => {
                if(err){
                    next(err);
                } else{
                    db.get(`SELECT * FROM Subjective WHERE id = $id;`, {$id: updatedTextbox.id}, (err, row) => {
                        res.status(200).json({textbox: row});
                    });
                }
            });
    }
});

// add param to this one for practice.
subjectiveRouter.delete('/', (req,res,next) => {
    db.run(`DELETE FROM Subjective WHERE id = $id;`, {$id: req.query.id}, (err) => {
        if(err) {
            next(err);
        } else{
            res.sendStatus(200);
        }
    });
});


module.exports = subjectiveRouter;