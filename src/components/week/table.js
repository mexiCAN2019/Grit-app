import React, {useState} from 'react';
import Express from '../../fetchExpress';

// *** DO NOT USE THIS ONE ***

// *idea* create another module that sets all fetched data to state, that way add"""Time updates as hours/minutes are inputted. 

// display error 400, both total goal hours and minutes must have a value, find way to make add time repeatable without having to refresh to add new time changes
const Table = ({ activity, onRemove, formType, year }) => {
    const [totalLearningHours, setTotalLearningHours] = useState(0);
    const [totalLearningMinutes, setTotalLearningMinutes] = useState(0);
    const [totalPracticingHours, setTotalPracticingHours] = useState(0);
    const [totalPracticingMinutes, setTotalPracticingMinutes] = useState(0);
    const [totalPerformingHours, setTotalPerformingHours] = useState(0);
    const [totalPerformingMinutes, setTotalPerformingMinutes] = useState(0);
    const [overallHours, setOverallHours] = useState(0);
    const [overallMinutes, setOverallMinutes] = useState(0);

    const handleRemove = () => {
        onRemove(formType, activity);
    }

    const addLearningTime = (mondayHours, tuesdayHours, wednesdayHours, thursdayHours, fridayHours, saturdayHours, sundayHours,
                            mondayMinutes, tuesdayMinutes, wednesdayMinutes, thursdayMinutes, fridayMinutes, saturdayMinutes, sundayMinutes) => {

        const totalHours = mondayHours + tuesdayHours + wednesdayHours + thursdayHours + fridayHours + saturdayHours + sundayHours;
        const totalMinutes = mondayMinutes + tuesdayMinutes + wednesdayMinutes + thursdayMinutes + fridayMinutes + saturdayMinutes + sundayMinutes;
        if(totalMinutes >= 60){
            const hoursToAdd = Math.floor(totalMinutes / 60);
            const minutesRemainder = Math.round(totalMinutes % 60);
            setTotalLearningHours(totalHours + hoursToAdd)
            setTotalLearningMinutes(minutesRemainder);
        } else {
            setTotalLearningHours(totalHours);
            setTotalLearningMinutes(totalMinutes);
        }
    }

    const addPracticingTime = (mondayHours, tuesdayHours, wednesdayHours, thursdayHours, fridayHours, saturdayHours, sundayHours,
                            mondayMinutes, tuesdayMinutes, wednesdayMinutes, thursdayMinutes, fridayMinutes, saturdayMinutes, sundayMinutes) => {

        const totalHours = mondayHours + tuesdayHours + wednesdayHours + thursdayHours + fridayHours + saturdayHours + sundayHours;
        const totalMinutes = mondayMinutes + tuesdayMinutes + wednesdayMinutes + thursdayMinutes + fridayMinutes + saturdayMinutes + sundayMinutes;
        let hoursToAdd;
        let minutesRemainder;
        if(totalMinutes >= 60){
            hoursToAdd = Math.floor(totalMinutes / 60);
            minutesRemainder = Math.round(totalMinutes % 60);
            setTotalPracticingHours(totalHours + hoursToAdd)
            setTotalPracticingMinutes(minutesRemainder);
        } else {
            setTotalPracticingHours(totalHours);
            setTotalPracticingMinutes(totalMinutes);
        }
    }

    const addPerformingTime = (mondayHours, tuesdayHours, wednesdayHours, thursdayHours, fridayHours, saturdayHours, sundayHours,
                              mondayMinutes, tuesdayMinutes, wednesdayMinutes, thursdayMinutes, fridayMinutes, saturdayMinutes, sundayMinutes) => {

        const totalHours = mondayHours + tuesdayHours + wednesdayHours + thursdayHours + fridayHours + saturdayHours + sundayHours;
        const totalMinutes = mondayMinutes + tuesdayMinutes + wednesdayMinutes + thursdayMinutes + fridayMinutes + saturdayMinutes + sundayMinutes;
        let hoursToAdd;
        let minutesRemainder;
        if(totalMinutes >= 60){
            hoursToAdd = Math.floor(totalMinutes / 60);
            minutesRemainder = Math.round(totalMinutes % 60);
            setTotalPerformingHours(totalHours + hoursToAdd)
            setTotalPerformingMinutes(minutesRemainder);
        } else {
            setTotalPerformingHours(totalHours);
            setTotalPerformingMinutes(totalMinutes);
        }
    }

    const addOverallTime = (learningHourTime, learningMinuteTime, practicingHourTime, practicingMinuteTime, performingHourTime, performingMinuteTime) => {
        const totalHours = learningHourTime + practicingHourTime + performingHourTime;
        const totalMinutes = learningMinuteTime + practicingMinuteTime + performingMinuteTime;
        setOverallHours(totalHours);
        setOverallMinutes(totalMinutes);
    };

    const chooseCategoryToAddTime = (category) => {
        switch(category) {
            case "learning":
                addLearningTime(activity.learningMondayHours, activity.learningTuesdayHours, activity.learningWednesdayHours, activity.learningThursdayHours, activity.learningFridayHours, activity.learningSaturdayHours, activity.learningSundayHours,
                    activity.learningMondayMinutes, activity.learningTuesdayMinutes, activity.learningWednesdayMinutes, activity.learningThursdayMinutes, activity.learningFridayMinutes, activity.learningSaturdayMinutes, activity.learningSundayMinutes)
                break;
            case "practicing":
                addPracticingTime(activity.practicingMondayHours, activity.practicingTuesdayHours, activity.practicingWednesdayHours, activity.practicingThursdayHours, activity.practicingFridayHours, activity.practicingSaturdayHours, activity.practicingSundayHours,
                    activity.practicingMondayMinutes, activity.practicingTuesdayMinutes, activity.practicingWednesdayMinutes, activity.practicingThursdayMinutes, activity.practicingFridayMinutes, activity.practicingSaturdayMinutes, activity.practicingSundayMinutes);
                break;
            case "performing":
                addPerformingTime(activity.performingMondayHours, activity.performingTuesdayHours, activity.performingWednesdayHours, activity.performingThursdayHours, activity.performingFridayHours, activity.performingSaturdayHours, activity.performingSundayHours,
                    activity.performingMondayMinutes, activity.performingTuesdayMinutes, activity.performingWednesdayMinutes, activity.performingThursdayMinutes, activity.performingFridayMinutes, activity.performingSaturdayMinutes, activity.performingSundayMinutes);
                break;
        }
        addOverallTime(totalLearningHours, totalLearningMinutes, totalPracticingHours, totalPracticingMinutes, totalPerformingHours, totalPerformingMinutes);
    }

    const handleAddTime = () => {
        chooseCategoryToAddTime("learning");
        chooseCategoryToAddTime("practicing");
        chooseCategoryToAddTime("performing");
    }

        
    // console.log(totalHours);
    // console.log(totalMinutes);
    // console.log(hoursToAdd);
    // console.log(minutesRemainder);
    
    

    return (
        <div>
        <input type="text" defaultValue={activity.skillName}></input>
        <button onClick={handleAddTime}>Add Time</button> {/* have to double click to add total time */}
        <button onClick={() => Express.deleteTable(year, activity.id)}>Delete</button>
        <button onClick={() => Express.updateTable(year, activity.skillName, activity.id)}>Save Changes</button>
        <table>
            <thead>
                <tr>
                    <th></th>
                    <th>Monday</th>
                    <th>Tuesday</th>
                    <th>Wednesday</th>
                    <th>Thursday</th>
                    <th>Friday</th>
                    <th>Saturday</th>
                    <th>Sunday</th>
                    <th>Actual</th>
                    <th>Goal</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th>Learning</th>
                    <td id="monday">
                        <input type="number" defaultValue={activity.learningMondayHours}></input>hrs
                        <input type="number" defaultValue={activity.learningMondayMinutes}></input>min
                    </td>
                    <td id="tuesday">
                        <input type="number" defaultValue={activity.learningTuesdayHours}></input>hrs
                        <input type="number" defaultValue={activity.learningTuesdayMinutes}></input>min
                    </td>
                    <td id="wednesday">
                        <input type="number" defaultValue={activity.learningWednesdayHours}></input>hrs
                        <input type="number" defaultValue={activity.learningWednesdayMinutes}></input>min
                    </td>
                    <td id="thursday">
                        <input type="number" defaultValue={activity.learningThursdayHours}></input>hrs
                        <input type="number" defaultValue={activity.learningThursdayMinutes}></input>min
                    </td>
                    <td id="friday">
                        <input type="number" defaultValue={activity.learningFridayHours}></input>hrs
                        <input type="number" defaultValue={activity.learningFridayMinutes}></input>min
                    </td>
                    <td id="saturday">
                        <input type="number" defaultValue={activity.learningSaturdayHours}></input>hrs
                        <input type="number" defaultValue={activity.learningSaturdayMinutes}></input>min
                    </td>
                    <td id="sunday">
                        <input type="number" defaultValue={activity.learningSundayHours}></input>hrs
                        <input type="number" defaultValue={activity.learningSundayMinutes}></input>min
                    </td>
                    <td id="actual">
                        <p>{totalLearningHours}</p>hrs
                        <p>{totalLearningMinutes}</p>min
                    </td>
                    <td id="goal">
                        <input type="number" defaultValue={activity.learningGoalHours}></input>hrs
                        <input type="number" defaultValue={activity.learningGoalMinutes}></input>min
                    </td>
                </tr>
                <tr>
                    <th>Practicing</th>
                    <td id="monday">
                        <input type="number" defaultValue={activity.practicingMondayHours}></input>hrs
                        <input type="number" defaultValue={activity.practicingMondayMinutes}></input>min
                    </td>
                    <td id="tuesday">
                        <input type="number" defaultValue={activity.practicingTuesdayHours}></input>hrs
                        <input type="number" defaultValue={activity.practicingTuesdayMinutes}></input>min
                    </td>
                    <td id="wednesday">
                        <input type="number" defaultValue={activity.practicingWednesdayHours}></input>hrs
                        <input type="number" defaultValue={activity.practicingWednesdayMinutes}></input>min
                    </td>
                    <td id="thursday">
                        <input type="number" defaultValue={activity.practicingThursdayHours}></input>hrs
                        <input type="number" defaultValue={activity.practicingThursdayMinutes}></input>min
                    </td>
                    <td id="friday">
                        <input type="number" defaultValue={activity.practicingFridayHours}></input>hrs
                        <input type="number" defaultValue={activity.practicingFridayMinutes}></input>min
                    </td>
                    <td id="saturday">
                        <input type="number" defaultValue={activity.practicingSaturdayHours}></input>hrs
                        <input type="number" defaultValue={activity.practicingSaturdayMinutes}></input>min
                    </td>
                    <td id="sunday">
                        <input type="number" defaultValue={activity.practicingSundayHours}></input>hrs
                        <input type="number" defaultValue={activity.practicingSundayMinutes}></input>min
                    </td>
                    <td id="actual">
                        <p>{totalPracticingHours}</p>hrs
                        <p>{totalPracticingMinutes}</p>min
                    </td>
                    <td id="goal">
                        <input type="number" defaultValue={activity.practicingGoalHours}></input>hrs
                        <input type="number" defaultValue={activity.practicingGoalMinutes}></input>min
                    </td>
                </tr>
                <tr>
                    <th>Performing</th>
                    <td id="monday">
                        <input type="number" defaultValue={activity.performingMondayHours}></input>hrs
                        <input type="number" defaultValue={activity.performingMondayMinutes}></input>min
                    </td>
                    <td id="tuesday">
                        <input type="number" defaultValue={activity.performingTuesdayHours}></input>hrs
                        <input type="number" defaultValue={activity.performingTuesdayMinutes}></input>min
                    </td>
                    <td id="wednesday">
                        <input type="number" defaultValue={activity.performingWednesdayHours}></input>hrs
                        <input type="number" defaultValue={activity.performingWednesdayMinutes}></input>min
                    </td>
                    <td id="thursday">
                        <input type="number" defaultValue={activity.performingThurdayHours}></input>hrs
                        <input type="number" defaultValue={activity.performingThursdayMinutes}></input>min
                    </td>
                    <td id="friday">
                        <input type="number" defaultValue={activity.performingFridayHours}></input>hrs
                        <input type="number" defaultValue={activity.performingFridayMinutes}></input>min
                    </td>
                    <td id="saturday">
                        <input type="number" defaultValue={activity.performingSaturdayHours}></input>hrs
                        <input type="number" defaultValue={activity.performingSaturdayMinutes}></input>min
                    </td>
                    <td id="sunday">
                        <input type="number" defaultValue={activity.performingSundayHours}></input>hrs
                        <input type="number" defaultValue={activity.performingSundayMinutes}></input>min
                    </td>
                    <td id="actual">
                        <p>{totalPerformingHours}</p>hrs
                        <p>{totalPerformingMinutes}</p>min
                    </td>
                    <td id="goal">
                        <input type="number" defaultValue={activity.performingGoalHours}></input>hrs
                        <input type="number" defaultValue={activity.performingGoalMinutes}></input>min
                    </td>
                </tr>
                <tr>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th>Total</th>
                    <td>
                        <p>{overallHours}</p>hrs
                        <p>{overallMinutes}</p>min 
                    </td>
                    <td>
                        <input type="number" defaultValue={activity.totalGoalHours}></input>hrs
                        <input type="number" defaultValue={activity.totalGoalMinutes}></input>min 
                    </td>
                </tr>
            </tbody>
        </table>
        </div>
    )
}

export default Table;