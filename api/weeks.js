const express = require('express');
const weeksRouter = express.Router();
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite');

const tableRouter = require('./table');
weeksRouter.use('/table', tableRouter);

const checkboxRouter = require('./checkbox');
weeksRouter.use('/checkbox', checkboxRouter);

const subjectiveRouter = require('./subjective');
weeksRouter.use('/subjective', subjectiveRouter);

const monthReviewRouter = require('./monthReview');
weeksRouter.use('/monthReview', monthReviewRouter);

weeksRouter.get('/', (req,res,next) => {
    const weeks = req.query;
    console.log(weeks.monthId);
    db.all(`SELECT * FROM Weeks WHERE yearFK = $yearFK AND monthId = $monthId;`, {
        $yearFK: weeks.year,
        $monthId: weeks.monthId
    }, (err, rows) => {
        if(err) {
            next(err);
        } else {
            res.status(200).send({weeks: rows});
        }
    });
});

weeksRouter.post('/', (req,res,next) => {
    const newWeek = req.query;
    db.run(`INSERT INTO Weeks (week, yearFK, monthId)
        VALUES ($week, $yearFK, $monthId);`, {
            $week: newWeek.week,
            $yearFK: newWeek.yearFK,
            $monthId: newWeek.monthId
        }, function(err) {
            if(err) {
                next(err);
            } else {
                db.get(`SELECT * FROM Weeks WHERE id = $id;`, {$id: this.lastID}, (err, row) => {
                    if(err) {
                        next(err);
                    } else{
                        res.status(201).json({week: row});
                    }
                });
            }
        });
});

weeksRouter.delete('/', (req,res,next) => {
    db.all(`SELECT * FROM TimeLogger WHERE weekId = $weekId;`, {$weekId: req.query.weekId}, (err, rows) => {
        if(err) {
            next(err);
        } else if(rows.length){
            res.sendStatus(400);
        } else {
            db.all(`SELECT * FROM Checkbox WHERE weekId = $weekId;`, {$weekId: req.query.weekId}, (err, rows) => {
                if(rows.length){
                    res.sendStatus(400);
                } else{
                    db.all(`SELECT * FROM Subjective WHERE weekId = $weekId;`, {$weekId: req.query.weekId}, (err, rows) => {
                        if(rows.length){
                            res.sendStatus(400);
                        } else{
                            db.run(`DELETE FROM Weeks WHERE id = $id;`, {$id: req.query.weekId}, (err) => {
                                    res.sendStatus(200);
                            });
                        }
                    });
                }
            });
        }
    });
});
// for some reason, even though rows returns an empty array when appropriate, else if statement runs the sendStatus(400). But issue resolved when adding .length to rows.          
    
    

module.exports = weeksRouter;