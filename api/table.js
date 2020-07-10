const express = require('express');
const tableRouter = express.Router();
const sqlite3 = require('sqlite3');
const weeksRouter = require('./weeks');
const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite');

tableRouter.get('/', (req,res,next) => {
    db.all(`SELECT * FROM TimeLogger WHERE weekId = $id;`, {$id: req.query.weekId}, (err, rows) => {
        if(err) {
            next(err);
        } else {
            res.status(200).json({tables: rows});
        }
    });
});

tableRouter.post('/', (req,res,next) => {
    const newTable = req.body.table;
    if(!newTable.skillName || !newTable.weekId) {
        res.sendStatus(400);
    } else {
        db.run(`INSERT INTO TimeLogger (skillName, weekId, monthId, yearFK,
            learningMondayHours, learningMondayMinutes, learningTuesdayHours, learningTuesdayMinutes, learningWednesdayHours, 
            learningWednesdayMinutes, learningThursdayHours, learningThursdayMinutes, learningFridayHours, learningFridayMinutes, 
            learningSaturdayHours, learningSaturdayMinutes, learningSundayHours, learningSundayMinutes, learningGoalHours, 
            learningGoalMinutes,
            practicingMondayHours, practicingMondayMinutes, practicingTuesdayHours, practicingTuesdayMinutes, practicingWednesdayHours, 
            practicingWednesdayMinutes, practicingThursdayHours, practicingThursdayMinutes, practicingFridayHours, practicingFridayMinutes, 
            practicingSaturdayHours, practicingSaturdayMinutes, practicingSundayHours, practicingSundayMinutes, practicingGoalHours, 
            practicingGoalMinutes,  
            performingMondayHours, performingMondayMinutes, performingTuesdayHours, performingTuesdayMinutes, performingWednesdayHours,
            performingWednesdayMinutes, performingThursdayHours, performingThursdayMinutes, performingFridayHours, performingFridayMinutes,
            performingSaturdayHours, performingSaturdayMinutes, performingSundayHours, performingSundayMinutes, performingGoalHours, 
            performingGoalMinutes,
            totalGoalHours, totalGoalMinutes)
                VALUES ($skillName, $weekId, $monthId, $yearFK,
                    $learningMondayHours, $learningMondayMinutes, $learningTuesdayHours, $learningTuesdayMinutes,$learningWednesdayHours, 
                    $learningWednesdayMinutes, $learningThursdayHours, $learningThursdayMinutes, $learningFridayHours, $learningFridayMinutes, 
                    $learningSaturdayHours, $learningSaturdayMinutes, $learningSundayHours, $learningSundayMinutes, $learningGoalHours, 
                    $learningGoalMinutes,
                    $practicingMondayHours, $practicingMondayMinutes, $practicingTuesdayHours, $practicingTuesdayMinutes, $practicingWednesdayHours,
                    $practicingWednesdayMinutes, $practicingThursdayHours, $practicingThursdayMinutes, $practicingFridayHours, $practicingFridayMinutes,
                    $practicingSaturdayHours, $practicingSaturdayMinutes, $practicingSundayHours, $practicingSundayMinutes, $practicingGoalHours, 
                    $practicingGoalMinutes,
                    $performingMondayHours, $performingMondayMinutes, $performingTuesdayHours, $performingTuesdayMinutes, $performingWednesdayHours,
                    $performingWednesdayMinutes, $performingThursdayHours, $performingThursdayMinutes, $performingFridayHours, $performingFridayMinutes,
                    $performingSaturdayHours, $performingSaturdayMinutes, $performingSundayHours, $performingSundayMinutes, $performingGoalHours, 
                    $performingGoalMinutes,
                    $totalGoalHours, $totalGoalMinutes);`, {
                        $skillName: newTable.skillName,                                  //skillname
                        $weekId: newTable.weekId,                                        //WeekID
                        $monthId: newTable.monthId,                                      //MonthId
                        $yearFK: newTable.yearFK,                                        // year foreign key
                        $learningMondayHours: newTable.learning.monday.hours,            //this starts learning row of table
                        $learningMondayMinutes: newTable.learning.monday.minutes, 
                        $learningTuesdayHours: newTable.learning.tuesday.hours, 
                        $learningTuesdayMinutes: newTable.learning.tuesday.minutes,
                        $learningWednesdayHours: newTable.learning.wednesday.hours, 
                        $learningWednesdayMinutes: newTable.learning.wednesday.minutes, 
                        $learningThursdayHours: newTable.learning.thursday.hours, 
                        $learningThursdayMinutes: newTable.learning.thursday.minutes, 
                        $learningFridayHours: newTable.learning.friday.hours, 
                        $learningFridayMinutes: newTable.learning.friday.minutes, 
                        $learningSaturdayHours: newTable.learning.saturday.hours, 
                        $learningSaturdayMinutes: newTable.learning.saturday.minutes,
                        $learningSundayHours: newTable.learning.sunday.hours,  
                        $learningSundayMinutes: newTable.learning.sunday.minutes, 
                        $learningGoalHours: newTable.learning.goal.hours, 
                        $learningGoalMinutes: newTable.learning.goal.minutes,
                        $practicingMondayHours: newTable.practicing.monday.hours,       //this starts practicing row of table
                        $practicingMondayMinutes: newTable.practicing.monday.minutes,
                        $practicingTuesdayHours: newTable.practicing.tuesday.hours,
                        $practicingTuesdayMinutes: newTable.practicing.tuesday.minutes,
                        $practicingWednesdayHours: newTable.practicing.wednesday.hours,
                        $practicingWednesdayMinutes: newTable.practicing.wednesday.minutes,
                        $practicingThursdayHours: newTable.practicing.thursday.hours,
                        $practicingThursdayMinutes: newTable.practicing.thursday.minutes,
                        $practicingFridayHours: newTable.practicing.friday.hours,
                        $practicingFridayMinutes: newTable.practicing.friday.minutes,
                        $practicingSaturdayHours: newTable.practicing.saturday.hours,
                        $practicingSaturdayMinutes: newTable.practicing.saturday.minutes,
                        $practicingSundayHours: newTable.practicing.sunday.hours,
                        $practicingSundayMinutes: newTable.practicing.sunday.minutes,
                        $practicingGoalHours: newTable.practicing.goal.hours,
                        $practicingGoalMinutes: newTable.practicing.goal.minutes,          
                        $performingMondayHours: newTable.performing.monday.hours,          //this starts performing row of table
                        $performingMondayMinutes: newTable.performing.monday.minutes,
                        $performingTuesdayHours: newTable.performing.tuesday.hours,
                        $performingTuesdayMinutes: newTable.performing.tuesday.minutes,
                        $performingWednesdayHours: newTable.performing.wednesday.hours,
                        $performingWednesdayMinutes: newTable.performing.wednesday.minutes,
                        $performingThursdayHours: newTable.performing.thursday.hours,
                        $performingThursdayMinutes: newTable.performing.thursday.minutes,
                        $performingFridayHours: newTable.performing.friday.hours,
                        $performingFridayMinutes: newTable.performing.friday.minutes,
                        $performingSaturdayHours: newTable.performing.saturday.hours,
                        $performingSaturdayMinutes: newTable.performing.saturday.minutes,
                        $performingSundayHours: newTable.performing.sunday.hours,
                        $performingSundayMinutes: newTable.performing.sunday.minutes,
                        $performingGoalHours: newTable.performing.goal.hours,
                        $performingGoalMinutes: newTable.performing.goal.minutes,
                        $totalGoalHours: newTable.total.goal.hours, 
                        $totalGoalMinutes: newTable.total.goal.minutes
                    }, function(err) {
                        if(err) {
                            next(err);
                        } else {
                            db.get(`SELECT * FROM TimeLogger WHERE id = $id;`, {$id: this.lastID}, (err,row) => {
                                res.status(201).json({table: row})
                            });
                        }
                    });
    }
});

tableRouter.put('/', (req,res,next) => {
    const updatedTable = req.body.table;
    if(!updatedTable.total.goal.hours || !updatedTable.skillName) {
        res.sendStatus(400);
    } else {
        db.run(`UPDATE TimeLogger SET
            skillName = $skillName,
            learningMondayHours =$learningMondayHours, learningMondayMinutes =$learningMondayMinutes, learningTuesdayHours =$learningTuesdayHours, 
            learningTuesdayMinutes =$learningTuesdayMinutes, learningWednesdayHours =$learningWednesdayHours, learningWednesdayMinutes =$learningWednesdayMinutes, 
            learningThursdayHours =$learningThursdayHours, learningThursdayMinutes =$learningThursdayMinutes, learningFridayHours =$learningFridayHours, 
            learningFridayMinutes =$learningFridayMinutes, learningSaturdayHours =$learningSaturdayHours, learningSaturdayMinutes =$learningSaturdayMinutes, 
            learningSundayHours =$learningSundayHours, learningSundayMinutes =$learningSundayMinutes, learningActualHours =$learningActualHours, learningActualMinutes = $learningActualMinutes,
            learningGoalHours =$learningGoalHours, learningGoalMinutes =$learningGoalMinutes,
            practicingMondayHours =$practicingMondayHours, practicingMondayMinutes =$practicingMondayMinutes, practicingTuesdayHours =$practicingTuesdayHours, 
            practicingTuesdayMinutes =$practicingTuesdayMinutes, practicingWednesdayHours =$practicingWednesdayHours, practicingWednesdayMinutes =$practicingWednesdayMinutes, 
            practicingThursdayHours =$practicingThursdayHours, practicingThursdayMinutes =$practicingThursdayMinutes, practicingFridayHours =$practicingFridayHours, 
            practicingFridayMinutes =$practicingFridayMinutes, practicingSaturdayHours =$practicingSaturdayHours, practicingSaturdayMinutes =$practicingSaturdayMinutes, 
            practicingSundayHours =$practicingSundayHours, practicingSundayMinutes =$practicingSundayMinutes, practicingActualHours =$practicingActualHours, practicingActualMinutes =$practicingActualMinutes, 
            practicingGoalHours =$practicingGoalHours, practicingGoalMinutes =$practicingGoalMinutes,  
            performingMondayHours =$performingMondayHours, performingMondayMinutes =$performingMondayMinutes, performingTuesdayHours =$performingTuesdayHours, 
            performingTuesdayMinutes =$performingTuesdayMinutes, performingWednesdayHours =$performingWednesdayHours, performingWednesdayMinutes =$performingWednesdayMinutes, 
            performingThursdayHours =$performingThursdayHours, performingThursdayMinutes =$performingThursdayMinutes, performingFridayHours =$performingFridayHours, 
            performingFridayMinutes =$performingFridayMinutes, performingSaturdayHours =$performingSaturdayHours, performingSaturdayMinutes =$performingSaturdayMinutes, 
            performingSundayHours =$performingSundayHours, performingSundayMinutes =$performingSundayMinutes, performingActualHours =$performingActualHours, performingActualMinutes =$performingActualMinutes,
            performingGoalHours =$performingGoalHours, performingGoalMinutes =$performingGoalMinutes,
            totalActualHours =$totalActualHours, totalActualMinutes =$totalActualMinutes, totalGoalHours =$totalGoalHours, totalGoalMinutes =$totalGoalMinutes
            WHERE id = $id;`, {
                $skillName: updatedTable.skillName,                                  //skillname
                $learningMondayHours: updatedTable.learning.monday.hours,            //this starts learning row of table
                $learningMondayMinutes: updatedTable.learning.monday.minutes, 
                $learningTuesdayHours: updatedTable.learning.tuesday.hours, 
                $learningTuesdayMinutes: updatedTable.learning.tuesday.minutes,
                $learningWednesdayHours: updatedTable.learning.wednesday.hours, 
                $learningWednesdayMinutes: updatedTable.learning.wednesday.minutes, 
                $learningThursdayHours: updatedTable.learning.thursday.hours, 
                $learningThursdayMinutes: updatedTable.learning.thursday.minutes, 
                $learningFridayHours: updatedTable.learning.friday.hours, 
                $learningFridayMinutes: updatedTable.learning.friday.minutes, 
                $learningSaturdayHours: updatedTable.learning.saturday.hours, 
                $learningSaturdayMinutes: updatedTable.learning.saturday.minutes,
                $learningSundayHours: updatedTable.learning.sunday.hours,  
                $learningSundayMinutes: updatedTable.learning.sunday.minutes, 
                $learningActualHours: updatedTable.learning.actual.hours,
                $learningActualMinutes: updatedTable.learning.actual.minutes,
                $learningGoalHours: updatedTable.learning.goal.hours, 
                $learningGoalMinutes: updatedTable.learning.goal.minutes,
                $practicingMondayHours: updatedTable.practicing.monday.hours,       //this starts practicing row of table
                $practicingMondayMinutes: updatedTable.practicing.monday.minutes,
                $practicingTuesdayHours: updatedTable.practicing.tuesday.hours,
                $practicingTuesdayMinutes: updatedTable.practicing.tuesday.minutes,
                $practicingWednesdayHours: updatedTable.practicing.wednesday.hours,
                $practicingWednesdayMinutes: updatedTable.practicing.wednesday.minutes,
                $practicingThursdayHours: updatedTable.practicing.thursday.hours,
                $practicingThursdayMinutes: updatedTable.practicing.thursday.minutes,
                $practicingFridayHours: updatedTable.practicing.friday.hours,
                $practicingFridayMinutes: updatedTable.practicing.friday.minutes,
                $practicingSaturdayHours: updatedTable.practicing.saturday.hours,
                $practicingSaturdayMinutes: updatedTable.practicing.saturday.minutes,
                $practicingSundayHours: updatedTable.practicing.sunday.hours,
                $practicingSundayMinutes: updatedTable.practicing.sunday.minutes,
                $practicingActualHours: updatedTable.practicing.actual.hours,
                $practicingActualMinutes: updatedTable.practicing.actual.minutes,
                $practicingGoalHours: updatedTable.practicing.goal.hours,
                $practicingGoalMinutes: updatedTable.practicing.goal.minutes,          
                $performingMondayHours: updatedTable.performing.monday.hours,          //this starts performing row of table
                $performingMondayMinutes: updatedTable.performing.monday.minutes,
                $performingTuesdayHours: updatedTable.performing.tuesday.hours,
                $performingTuesdayMinutes: updatedTable.performing.tuesday.minutes,
                $performingWednesdayHours: updatedTable.performing.wednesday.hours,
                $performingWednesdayMinutes: updatedTable.performing.wednesday.minutes,
                $performingThursdayHours: updatedTable.performing.thursday.hours,
                $performingThursdayMinutes: updatedTable.performing.thursday.minutes,
                $performingFridayHours: updatedTable.performing.friday.hours,
                $performingFridayMinutes: updatedTable.performing.friday.minutes,
                $performingSaturdayHours: updatedTable.performing.saturday.hours,
                $performingSaturdayMinutes: updatedTable.performing.saturday.minutes,
                $performingSundayHours: updatedTable.performing.sunday.hours,
                $performingSundayMinutes: updatedTable.performing.sunday.minutes,
                $performingActualHours: updatedTable.performing.actual.hours,
                $performingActualMinutes: updatedTable.performing.actual.minutes,
                $performingGoalHours: updatedTable.performing.goal.hours,
                $performingGoalMinutes: updatedTable.performing.goal.minutes,
                $totalActualHours: updatedTable.total.actual.hours,
                $totalActualMinutes: updatedTable.total.actual.minutes,
                $totalGoalHours: updatedTable.total.goal.hours, 
                $totalGoalMinutes: updatedTable.total.goal.minutes,
                $id: updatedTable.id
            }, (err) => {
                if(err) {
                    next(err);
                } else {
                    db.get(`SELECT * FROM TimeLogger WHERE id = $id;`, {$id: updatedTable.id}, (err, row) => {
                        res.status(200).json({table: row});
                    });
                }
            });
    }
});

tableRouter.delete('/', (req,res,next) => {
    db.run(`DELETE FROM TimeLogger WHERE id = $id;`, {$id: req.query.id}, (err) => {
        if(err) {
            next(err);
        } else {
            res.sendStatus(200)
        }
    });
});

module.exports = tableRouter;