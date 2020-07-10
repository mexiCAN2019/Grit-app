import React from 'react';

function MonthTableReview( {skill} ) {
    const { skillName, totalActualHours, totalActualMinutes, learningActualHours, learningActualMinutes, practicingActualHours, practicingActualMinutes, performingActualHours, performingActualMinutes } = skill;

    const renderTime = (hours, minutes) => {
        if(minutes >= 60) {
            const hoursToAdd = Math.floor(minutes / 60);
            const minutesRemainder = Math.round(minutes % 60);
            return <p>{hours + hoursToAdd}Hrs {minutesRemainder}Mins</p>;
        } 
        return <p>{hours}Hrs {minutes}Mins</p>;
    };

    return (
        <div>
            <h3>{skillName}</h3>
                <p>Total Time: {renderTime(totalActualHours, totalActualMinutes)}</p>
                <p>Total Time Practicing: {renderTime(practicingActualHours, practicingActualMinutes)}</p>
                <p>Total Time Learning: {renderTime(learningActualHours, learningActualMinutes)}</p>
                <p>Total Time Performing: {renderTime(performingActualHours, performingActualMinutes)}</p>
        </div>
    );
};

export default MonthTableReview;