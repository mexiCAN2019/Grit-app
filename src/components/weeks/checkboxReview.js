import React from 'react';


function MonthCheckboxReview({ skill }) {
    const {skillName, mondayTotal, tuesdayTotal, wednesdayTotal, thursdayTotal, fridayTotal, saturdayTotal, sundayTotal} = skill;

    const addTotal = () => {
        const total = mondayTotal + tuesdayTotal + wednesdayTotal + thursdayTotal + fridayTotal + saturdayTotal + sundayTotal;
        return <h4 style={{color: "white"}}>{total}</h4>
    }

    return (
        <div>
            <h3 style={{width: "50%", margin: "auto"}}>{skillName}</h3>
            <h4>Total: {addTotal()}</h4>
        </div>
    );
};

export default MonthCheckboxReview;