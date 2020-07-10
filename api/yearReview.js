const express = require('express');
const yearReviewRouter = express.Router();
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite');


// refresh yourself on sql commands
yearReviewRouter.get('/table/:year', (req,res,next) => {
    db.all(`SELECT skillName, id,
        SUM(learningActualHours) AS learningActualHours,  SUM(learningActualMinutes) AS learningActualMinutes, SUM(practicingActualHours) AS practicingActualHours, 
        SUM(practicingActualMinutes) AS practicingActualMinutes, SUM(performingActualHours) AS performingActualHours, SUM(performingActualMinutes) AS performingActualMinutes,
        SUM(totalActualHours) AS totalActualHours, SUM(totalActualMinutes) AS totalActualMinutes
        FROM TimeLogger WHERE yearFK = $yearFK 
        GROUP BY skillName;`, {$yearFK: req.params.year}, (err, rows) => {
        if(err) {
            next(err);
        } else{
            res.status(200).json({tables: rows});
        }
    });
});

yearReviewRouter.get('/checkbox/:year', (req,res,next) => {
    db.all(`SELECT id, skillName, SUM(monday) AS mondayTotal, SUM(tuesday) AS tuesdayTotal, SUM(wednesday) AS wednesdayTotal, SUM(thursday) AS thursdayTotal, 
        SUM(friday) AS fridayTotal, SUM(saturday) AS saturdayTotal, SUM(sunday) AS sundayTotal FROM Checkbox
        WHERE yearFK = $yearFK
        GROUP BY skillName;`, {$yearFK: req.params.year}, (err, rows) => {
            if(err) {
                next(err);
            } else{
                res.status(200).json({checkboxes: rows});
            }
        });
});

yearReviewRouter.get('/subjective/:year', (req,res,next) => {
    db.get(`SELECT * FROM Subjective WHERE yearFK = $yearFK;`, {$yearFK: req.params.year}, (err, row) => {
        if(err) {
            next(err);
        } else{
            res.status(200).json({textbox: row});
        }
    });
});

yearReviewRouter.post('/subjective', (req,res,next) => {
    const newTextbox = req.body.textbox;
    db.run(`INSERT INTO Subjective (skillName, text, yearFK)
        VALUES ($skillName, $text, $yearFK);`, {
            $skillName: newTextbox.skillName,
            $text: newTextbox.text,
            $yearFK: newTextbox.yearFK
        }, function(err) {
            if(err) {
                next(err);
            } else{
                db.get(`SELECT FROM Subjective WHERE id = $id;`, {$id: this.lastID}, (err,row) => {
                    res.status(201).json({textbox: row});
                });
            }
        });
});

yearReviewRouter.put('/subjective', (req,res,next) => {
    const updatedTextbox = req.body.textbox;
    db.run(`UPDATE Subjective SET text = $text WHERE id = $id;`, {$text: updatedTextbox.text, $id: updatedTextbox.id}, (err) => {
        if(err){
            next(err);
        } else{
            db.get(`SELECT * FROM Subjective WHERE id = $id;`, {$id: updatedTextbox.id}, (err, row) => {
                res.status(200).json({textbox: row});
            });
        }
    });
});


module.exports = yearReviewRouter;