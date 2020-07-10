import React from 'react';

function MonthCheckboxReview({ skill }) {
    const {skillName, mondayTotal, tuesdayTotal, wednesdayTotal, thursdayTotal, fridayTotal, saturdayTotal, sundayTotal} = skill;

    const addTotal = () => {
        return mondayTotal + tuesdayTotal + wednesdayTotal + thursdayTotal + fridayTotal + saturdayTotal + sundayTotal;
    }

    return (
        <div className="checkbox">
            <h3>{skillName}</h3>
            <p>Total: {addTotal()}</p>
        </div>
    );
};

export default MonthCheckboxReview;