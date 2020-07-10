const express = require('express');
const checkboxRouter = express.Router();
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite');

checkboxRouter.get('/', (req,res,next) => {
    db.all(`SELECT * FROM Checkbox WHERE weekId = $id;`, {$id: req.query.weekId}, (err, rows) => {
        if(err) {
            next(err);
        } else {
            res.status(200).json({checkboxes: rows});
        }
    });
});

checkboxRouter.post('/', (req,res,next) => {
    const newCheckbox = req.body.checkbox
    if(!newCheckbox.skillName) {
        res.sendStatus(400);
    } else {
        db.run(`INSERT INTO Checkbox (skillName, monthId, yearFK, monday, tuesday, wednesday, thursday, friday, saturday, sunday, weekId)
        VALUES ($skillName, $monthId, $yearFK, $monday, $tuesday, $wednesday, $thursday, $friday, $saturday, $sunday, $weekId);`, {
            $skillName: newCheckbox.skillName,
            $monthId: newCheckbox.monthId,
            $yearFK: newCheckbox.yearFK,
            $monday: newCheckbox.monday,
            $tuesday: newCheckbox.tuesday,
            $wednesday: newCheckbox.wednesday,
            $thursday: newCheckbox.thursday,
            $friday: newCheckbox.friday,
            $saturday: newCheckbox.saturday,
            $sunday: newCheckbox.sunday,
            $weekId: newCheckbox.weekId
        }, function(err) {
            if(err) {
                next(err);
            } else {
                db.get(`SELECT * FROM Checkbox WHERE id = $id;`, {$id: this.lastID}, (err, row) => {
                    res.status(201).json({checkbox: row});
                });
            }
        });
    }
});

checkboxRouter.put('/', (req,res,next) => {
    const updatedCheckbox = req.body.checkbox;
    console.log(updatedCheckbox);
    if(!updatedCheckbox.skillName) {
        res.sendStatus(400);
    }  else {
        db.run(`UPDATE Checkbox SET 
            skillName = $skillName,
            monday = $monday,
            tuesday = $tuesday,
            wednesday = $wednesday,
            thursday = $thursday,
            friday = $friday, 
            saturday = $saturday,
            sunday = $sunday
            WHERE id = $id;`, {
                $skillName: updatedCheckbox.skillName,
                $monday: updatedCheckbox.monday,
                $tuesday: updatedCheckbox.tuesday,
                $wednesday: updatedCheckbox.wednesday,
                $thursday: updatedCheckbox.thursday,
                $friday: updatedCheckbox.friday,
                $saturday: updatedCheckbox.saturday,
                $sunday: updatedCheckbox.sunday,
                $id: updatedCheckbox.id
            }, (err) => {
                if(err) {
                    next(err);
                } else{
                    db.get(`SELECT * FROM Checkbox WHERE id = $id;`, {$id: updatedCheckbox.id}, (err, row) => {
                        res.status(200).json({checkbox: row});
                    });
                }
            });
    }
});

checkboxRouter.delete('/', (req,res,next) => {
    db.run(`DELETE FROM Checkbox WHERE id = $id;`, {$id: req.query.id}, (err) => {
        if(err) {
            next(err);
        }else {
            res.sendStatus(200);
        }
    });
});


module.exports = checkboxRouter;