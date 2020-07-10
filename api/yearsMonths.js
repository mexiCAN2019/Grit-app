const express = require('express');
const yearsMonthsRouter = express.Router();
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite');

const weeksRouter = require('./weeks');
yearsMonthsRouter.use('/:year/month', weeksRouter);

const yearReviewRouter = require('./yearReview');
yearsMonthsRouter.use('/:year/yearReview', yearReviewRouter);


yearsMonthsRouter.get(`/`, (req, res, next) => {
    db.all(`SELECT * FROM Years ORDER BY year DESC;`, (err, rows) => {
        if(err) {
            next(err);
        } else {
            res.status(200).json({years: rows});
        }
    });
});

yearsMonthsRouter.post('/', (req,res,next) => { /* Can i add more than one year at a time? For right now, this will only be for adding one at a time */
    const newYear = req.body.year
    db.run(`INSERT INTO Years (year) VALUES ($year);`, {$year: newYear}, function(err) {
        if(err) {
            next(err);
        } else {
            db.get(`SELECT * FROM Years WHERE year = $year;`, {$year: newYear}, (err, row) => {
                if(err) {
                    next(err);
                } else {
                    res.status(201).json({year: row});
                }
            });
        }
    });
});

yearsMonthsRouter.delete('/', (req,res,next) => {
    db.all(`SELECT * FROM Months WHERE yearFK = $yearFK;`, {$yearFK: req.query.year}, (err,rows) => {
        if(err){
            next(err);
        } else if(rows.length){
            res.sendStatus(400);
        } else{
            db.run(`DELETE FROM Years WHERE year = $year;`, {$year: req.query.year}, (err) => {
                if(err) {
                    next(err);
                } else {
                    res.sendStatus(204);
                }
            });
        }
    });
});

yearsMonthsRouter.get(`/:year`, (req, res, next) => {
    db.all(`SELECT * FROM Months WHERE yearFK = $year;`, {$year: req.params.year}, (err, rows) => {
        if(err) {
            next(err);
        } else {
            res.status(200).json({months: rows});
        }
    });
});

yearsMonthsRouter.post('/:year', (req,res,next) => { 
    const newMonth = req.query.month
    db.run(`INSERT INTO Months (month, yearFK) VALUES ($month, $yearFK);`, {
        $month: newMonth,
        $yearFK: req.params.year
    }, function(err) {
        if(err) {
            next(err);
        } else {
            db.get(`SELECT * FROM Months WHERE id = $id;`, {$id: this.lastID}, (err, row) => {
                if(err) {
                    next(err);
                } else {
                    res.status(201).json({month: row});
                }
            });
        }
    });
});

yearsMonthsRouter.delete('/:year', (req,res,next) => {
    db.all(`SELECT * FROM Weeks WHERE monthId = $monthId;`, {$monthId: req.query.monthId}, (err, rows) => {
        if(err) {
            next(err);
        } else if(rows.length){
            res.sendStatus(400);
        } else {
            db.run(`DELETE FROM Months WHERE id = $id;`, {$id: req.query.monthId}, (err) => {
                if(err) {
                    next(err);
                } else {
                    res.sendStatus(204);
                }
            });
        }
    });
});




module.exports = yearsMonthsRouter;