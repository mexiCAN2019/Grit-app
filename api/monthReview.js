const express = require('express');
const monthReviewRouter = express.Router();
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite');


// refresh yourself on sql commands
monthReviewRouter.get('/table/:monthId', (req,res,next) => {
    db.all(`SELECT skillName, id,
        SUM(learningActualHours) AS learningActualHours,  SUM(learningActualMinutes) AS learningActualMinutes, SUM(practicingActualHours) AS practicingActualHours, 
        SUM(practicingActualMinutes) AS practicingActualMinutes, SUM(performingActualHours) AS performingActualHours, SUM(performingActualMinutes) AS performingActualMinutes,
        SUM(totalActualHours) AS totalActualHours, SUM(totalActualMinutes) AS totalActualMinutes
        FROM TimeLogger WHERE monthId = $monthId 
        GROUP BY skillName;`, {$monthId: req.params.monthId}, (err, rows) => {
        if(err) {
            next(err);
        } else{
            res.status(200).json({tables: rows});
        }
    });
});

monthReviewRouter.get('/checkbox/:monthId', (req,res,next) => {
    db.all(`SELECT id, skillName, SUM(monday) AS mondayTotal, SUM(tuesday) AS tuesdayTotal, SUM(wednesday) AS wednesdayTotal, SUM(thursday) AS thursdayTotal, 
        SUM(friday) AS fridayTotal, SUM(saturday) AS saturdayTotal, SUM(sunday) AS sundayTotal FROM Checkbox
        WHERE monthId = $monthId
        GROUP BY skillName;`, {$monthId: req.params.monthId}, (err, rows) => {
            if(err) {
                next(err);
            } else{
                res.status(200).json({checkboxes: rows});
            }
        });
});

monthReviewRouter.get('/subjective/:monthId', (req,res,next) => {
    db.get(`SELECT * FROM Subjective WHERE monthId = $monthId;`, {$monthId: req.params.monthId}, (err, row) => {
        if(err) {
            next(err);
        } else{
            res.status(200).json({textbox: row});
        }
    });
});

monthReviewRouter.post('/subjective', (req,res,next) => {
    const newTextbox = req.body.textbox;
    db.run(`INSERT INTO Subjective (skillName, text, monthId)
        VALUES ($skillName, $text, $monthId);`, {
            $skillName: newTextbox.skillName,
            $text: newTextbox.text,
            $monthId: newTextbox.monthId
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

monthReviewRouter.put('/subjective', (req,res,next) => {
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

module.exports = monthReviewRouter;