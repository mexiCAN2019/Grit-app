const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./database.sqlite');

db.serialize(() => {
    // db.run(`DROP TABLE IF EXISTS Years;`);
    db.run(`CREATE TABLE IF NOT EXISTS Years (
        id INTEGER NOT NULL,
        year INTEGER NOT NULL,
        PRIMARY KEY ('id')
    );`);
    // db.run(`DROP TABLE IF EXISTS Months;`);
    db.run(`CREATE TABLE IF NOT EXISTS Months (
        id INTEGER NOT NULL,
        month TEXT NOT NULL,
        yearFK INTEGER NOT NULL,
        PRIMARY KEY ('id'),
        FOREIGN KEY ('yearFK') REFERENCES Years('year')
    );`)
    // db.run(`DROP TABLE IF EXISTS Weeks;`);
    db.run(`CREATE TABLE IF NOT EXISTS Weeks (
        id INTEGER NOT NULL,
        week TEXT NOT NULL,
        yearFK INTEGER NOT NULL,
        monthId INTEGER NOT NULL,
        PRIMARY KEY('id'),
        FOREIGN KEY('yearFK') REFERENCES Years('year'),
        FOREIGN KEY ('monthId') REFERENCES Months('id')
    );`);
    // db.run(`DROP TABLE IF EXISTS TimeLogger;`);
    db.run(`CREATE TABLE IF NOT EXISTS TimeLogger (
        id INTEGER NOT NULL,
        weekId INTEGER NOT NULL,
        monthId INTEGER NOT NULL,
        yearFK INTEGER NOT NULL,
        skillName TEXT NOT NULL,
        learningMondayHours INTEGER,
        learningMondayMinutes INTEGER,
        learningTuesdayHours INTEGER,
        learningTuesdayMinutes INTEGER,
        learningWednesdayHours INTEGER,
        learningWednesdayMinutes INTEGER,
        learningThursdayHours INTEGER,
        learningThursdayMinutes INTEGER,
        learningFridayHours INTEGER,
        learningFridayMinutes INTEGER,
        learningSaturdayHours INTEGER,
        learningSaturdayMinutes INTEGER,
        learningSundayHours INTEGER,
        learningSundayMinutes INTEGER,
        learningActualHours INTEGER,
        learningActualMinutes INTEGER,
        learningGoalHours INTEGER,
        learningGoalMinutes INTEGER,

        practicingMondayHours INTEGER,
        practicingMondayMinutes INTEGER,
        practicingTuesdayHours INTEGER,
        practicingTuesdayMinutes INTEGER,
        practicingWednesdayHours INTEGER,
        practicingWednesdayMinutes INTEGER,
        practicingThursdayHours INTEGER,
        practicingThursdayMinutes INTEGER,
        practicingFridayHours INTEGER,
        practicingFridayMinutes INTEGER,
        practicingSaturdayHours INTEGER,
        practicingSaturdayMinutes INTEGER,
        practicingSundayHours INTEGER,
        practicingSundayMinutes INTEGER,
        practicingActualHours INTEGER,
        practicingActualMinutes INTEGER,
        practicingGoalHours INTEGER,
        practicingGoalMinutes INTEGER,

        performingMondayHours INTEGER,
        performingMondayMinutes INTEGER,
        performingTuesdayHours INTEGER,
        performingTuesdayMinutes INTEGER,
        performingWednesdayHours INTEGER,
        performingWednesdayMinutes INTEGER,
        performingThursdayHours INTEGER,
        performingThursdayMinutes INTEGER,
        performingFridayHours INTEGER,
        performingFridayMinutes INTEGER,
        performingSaturdayHours INTEGER,
        performingSaturdayMinutes INTEGER,
        performingSundayHours INTEGER,
        performingSundayMinutes INTEGER,
        performingActualHours INTEGER,
        performingActualMinutes INTEGER,
        performingGoalHours INTEGER,
        performingGoalMinutes INTEGER,

        totalActualHours INTEGER,
        totalActualMinutes INTEGER,
        totalGoalHours INTEGER,
        totalGoalMinutes INTEGER,
        PRIMARY KEY('id'),
        FOREIGN KEY('weekId') REFERENCES Weeks('id'),
        FOREIGN KEY('monthId') REFERENCES Months('id'),
        FOREIGN KEY('yearFK') REFERENCES Years('year')
    );`);
    // db.run(`DROP TABLE IF EXISTS Checkbox`);
    db.run(`CREATE TABLE IF NOT EXISTS Checkbox (
        id INTEGER NOT NULL,
        skillName TEXT NOT NULL,
        monthId INTEGER NOT NULL,
        yearFK INTEGER NOT NULL,
        monday TEXT,
        tuesday TEXT,
        wednesday TEXT,
        thursday TEXT,
        friday TEXT,
        saturday TEXT,
        sunday TEXT,
        weekId INTEGER NOT NULL,
        PRIMARY KEY('id'),
        FOREIGN KEY('monthId') REFERENCES Months('id'),
        FOREIGN KEY('weekId') REFERENCES Weeks('id'),
        FOREIGN KEY('yearFK') REFERENCES Years('year')
    );`);
    // db.run(`DROP TABLE IF EXISTS Subjective;`);
    db.run(`CREATE TABLE IF NOT EXISTS Subjective (
        id INTEGER NOT NULL,
        weekId INTEGER,
        monthId INTEGER,
        yearFK INTEGER,
        skillName TEXT NOT NULL,
        text TEXT NOT NULL,
        PRIMARY KEY('id'),
        FOREIGN KEY('weekId') REFERENCES Weeks('id'),
        FOREIGN KEY('monthId') REFERENCES Months('id'),
        FOREIGN KEY('yearFK') REFERENCES Years('year')
    );`);
});
