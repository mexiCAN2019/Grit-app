import React from 'react';

const underline = {
    textDecoration: "underline"
}

function MonthTableReview( {skill} ) {
    const { skillName, totalActualHours, totalActualMinutes, learningActualHours, learningActualMinutes, practicingActualHours, practicingActualMinutes, performingActualHours, performingActualMinutes } = skill;

    const renderTime = (hours, minutes) => {
        if(minutes >= 60) {
            const hoursToAdd = Math.floor(minutes / 60);
            const minutesRemainder = Math.round(minutes % 60);
            return <p style={{color: "white"}}>{hours + hoursToAdd}Hrs {minutesRemainder}Mins</p>;
        } 
        return <p style={{color: "white"}}>{hours}Hrs {minutes}Mins</p>;
    };

    return (
        <div style={{marginTop: "50px"}}>
            <h3 style={{width: "50%", margin: "auto"}}>{skillName}</h3>
                <h4>Total Time: {renderTime(totalActualHours, totalActualMinutes)}</h4>
                

                <p style={underline}>Total Time Practicing: </p>
                {renderTime(practicingActualHours, practicingActualMinutes)}

                <p style={underline}>Total Time Learning: </p>
                {renderTime(learningActualHours, learningActualMinutes)}

                <p style={underline}>Total Time Performing: </p>
                {renderTime(performingActualHours, performingActualMinutes)}
        </div>
    );
};

export default MonthTableReview;