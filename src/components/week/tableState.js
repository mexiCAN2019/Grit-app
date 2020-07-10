import React, {useState} from 'react';
import Express from '../../fetchExpress';

// *idea* create another module that sets all fetched data to state, that way add"""Time updates as hours/minutes are inputted. 

const Table = ({ activity, onRemove, year }) => {
    const [skillName, setSkillName] = useState(activity.skillName);

    const [learningMondayHours, setLearningMondayHours] = useState(activity.learningMondayHours);
    const [learningMondayMinutes, setLearningMondayMinutes] = useState(activity.learningMondayMinutes);
    const [learningTuesdayHours, setLearningTuesdayHours] = useState(activity.learningTuesdayHours);
    const [learningTuesdayMinutes, setLearningTuesdayMinutes] = useState(activity.learningTuesdayMinutes);
    const [learningWednesdayHours, setLearningWednesdayHours] = useState(activity.learningWednesdayHours);
    const [learningWednesdayMinutes, setLearningWednesdayMinutes] = useState(activity.learningWednesdayMinutes);
    const [learningThursdayHours, setLearningThursdayHours] = useState(activity.learningThursdayHours);
    const [learningThursdayMinutes, setLearningThursdayMinutes] = useState(activity.learningThursdayMinutes);
    const [learningFridayHours, setLearningFridayHours] = useState(activity.learningFridayHours);
    const [learningFridayMinutes, setLearningFridayMinutes] = useState(activity.learningFridayMinutes);
    const [learningSaturdayHours, setLearningSaturdayHours] = useState(activity.learningSaturdayHours);
    const [learningSaturdayMinutes, setLearningSaturdayMinutes] = useState(activity.learningSaturdayMinutes);
    const [learningSundayHours, setLearningSundayHours] = useState(activity.learningSundayHours);
    const [learningSundayMinutes, setLearningSundayMinutes] = useState(activity.learningSundayMinutes);
    const [learningGoalHours, setLearningGoalHours] = useState(activity.learningGoalHours);
    const [learningGoalMinutes, setLearningGoalMinutes] = useState(activity.learningGoalMinutes);

    const [practicingMondayHours, setPracticingMondayHours] = useState(activity.practicingMondayHours);
    const [practicingMondayMinutes, setPracticingMondayMinutes] = useState(activity.practicingMondayMinutes);
    const [practicingTuesdayHours, setPracticingTuesdayHours] = useState(activity.practicingTuesdayHours);
    const [practicingTuesdayMinutes, setPracticingTuesdayMinutes] = useState(activity.practicingTuesdayMinutes);
    const [practicingWednesdayHours, setPracticingWednesdayHours] = useState(activity.practicingWednesdayHours);
    const [practicingWednesdayMinutes, setPracticingWednesdayMinutes] = useState(activity.practicingWednesdayMinutes);
    const [practicingThursdayHours, setPracticingThursdayHours] = useState(activity.practicingThursdayHours);
    const [practicingThursdayMinutes, setPracticingThursdayMinutes] = useState(activity.practicingThursdayMinutes);
    const [practicingFridayHours, setPracticingFridayHours] = useState(activity.practicingFridayHours);
    const [practicingFridayMinutes, setPracticingFridayMinutes] = useState(activity.practicingFridayMinutes);
    const [practicingSaturdayHours, setPracticingSaturdayHours] = useState(activity.practicingSaturdayHours);
    const [practicingSaturdayMinutes, setPracticingSaturdayMinutes] = useState(activity.practicingSaturdayMinutes);
    const [practicingSundayHours, setPracticingSundayHours] = useState(activity.practicingSundayHours);
    const [practicingSundayMinutes, setPracticingSundayMinutes] = useState(activity.practicingSundayMinutes);
    const [practicingGoalHours, setPracticingGoalHours] = useState(activity.practicingGoalHours);
    const [practicingGoalMinutes, setPracticingGoalMinutes] = useState(activity.practicingGoalMinutes);

    const [performingMondayHours, setPerformingMondayHours] = useState(activity.performingMondayHours);
    const [performingMondayMinutes, setPerformingMondayMinutes] = useState(activity.performingMondayMinutes);
    const [performingTuesdayHours, setPerformingTuesdayHours] = useState(activity.performingTuesdayHours);
    const [performingTuesdayMinutes, setPerformingTuesdayMinutes] = useState(activity.performingTuesdayMinutes);
    const [performingWednesdayHours, setPerformingWednesdayHours] = useState(activity.performingWednesdayHours);
    const [performingWednesdayMinutes, setPerformingWednesdayMinutes] = useState(activity.performingWednesdayMinutes);
    const [performingThursdayHours, setPerformingThursdayHours] = useState(activity.performingThursdayHours);
    const [performingThursdayMinutes, setPerformingThursdayMinutes] = useState(activity.performingThursdayMinutes);
    const [performingFridayHours, setPerformingFridayHours] = useState(activity.performingFridayHours);
    const [performingFridayMinutes, setPerformingFridayMinutes] = useState(activity.performingFridayMinutes);
    const [performingSaturdayHours, setPerformingSaturdayHours] = useState(activity.performingSaturdayHours);
    const [performingSaturdayMinutes, setPerformingSaturdayMinutes] = useState(activity.performingSaturdayMinutes);
    const [performingSundayHours, setPerformingSundayHours] = useState(activity.performingSundayHours);
    const [performingSundayMinutes, setPerformingSundayMinutes] = useState(activity.performingSundayMinutes);
    const [performingGoalHours, setPerformingGoalHours] = useState(activity.performingGoalHours);
    const [performingGoalMinutes, setPerformingGoalMinutes] = useState(activity.performingGoalMinutes);

    const [totalGoalHours, setTotalGoalHours] = useState(activity.totalGoalHours);
    const [totalGoalMinutes, setTotalGoalMinutes] = useState(activity.totalGoalMinutes);

    const [totalLearningHours, setTotalLearningHours] = useState(0);
    const [totalLearningMinutes, setTotalLearningMinutes] = useState(0);
    const [totalPracticingHours, setTotalPracticingHours] = useState(0);
    const [totalPracticingMinutes, setTotalPracticingMinutes] = useState(0);
    const [totalPerformingHours, setTotalPerformingHours] = useState(0);
    const [totalPerformingMinutes, setTotalPerformingMinutes] = useState(0);
    const [overallHours, setOverallHours] = useState(0);
    const [overallMinutes, setOverallMinutes] = useState(0);


    const addLearningTime = () => {

        const totalHours = learningMondayHours + learningTuesdayHours + learningWednesdayHours + learningThursdayHours + learningFridayHours + learningSaturdayHours + learningSundayHours;
        const totalMinutes = learningMondayMinutes + learningTuesdayMinutes + learningWednesdayMinutes + learningThursdayMinutes + learningFridayMinutes + learningSaturdayMinutes + learningSundayMinutes;
        if(totalMinutes >= 60){
            const hoursToAdd = Math.floor(totalMinutes / 60);
            const minutesRemainder = Math.round(totalMinutes % 60);
            setTotalLearningHours(totalHours + hoursToAdd)
            setTotalLearningMinutes(minutesRemainder);
        } else {
            setTotalLearningHours(totalHours);
            setTotalLearningMinutes(totalMinutes);
        };
    };

    const addPracticingTime = () => {

        const totalHours = practicingMondayHours + practicingTuesdayHours + practicingWednesdayHours + practicingThursdayHours + practicingFridayHours + practicingSaturdayHours + practicingSundayHours;
        const totalMinutes = practicingMondayMinutes + practicingTuesdayMinutes + practicingWednesdayMinutes + practicingThursdayMinutes + practicingFridayMinutes + practicingSaturdayMinutes + practicingSundayMinutes;
        console.log(totalHours);
        console.log(totalMinutes);
        if(totalMinutes >= 60){
            const hoursToAdd = Math.floor(totalMinutes / 60);
            const minutesRemainder = Math.round(totalMinutes % 60);
            setTotalPracticingHours(totalHours + hoursToAdd)
            setTotalPracticingMinutes(minutesRemainder);
        } else {
            setTotalPracticingHours(totalHours);
            setTotalPracticingMinutes(totalMinutes);
        };
    };

    const addPerformingTime = () => {

        const totalHours = performingMondayHours + performingTuesdayHours + performingWednesdayHours + performingThursdayHours + performingFridayHours + performingSaturdayHours + performingSundayHours;
        const totalMinutes = performingMondayMinutes + performingTuesdayMinutes + performingWednesdayMinutes + performingThursdayMinutes + performingFridayMinutes + performingSaturdayMinutes + performingSundayMinutes;
        if(totalMinutes >= 60){
            const hoursToAdd = Math.floor(totalMinutes / 60);
            const minutesRemainder = Math.round(totalMinutes % 60);
            setTotalPerformingHours(totalHours + hoursToAdd)
            setTotalPerformingMinutes(minutesRemainder);
        } else {
            setTotalPerformingHours(totalHours);
            setTotalPerformingMinutes(totalMinutes);
        };
    };

    const addOverallTime = () => {
        const totalHours = totalLearningHours + totalPracticingHours + totalPerformingHours;
        const totalMinutes = totalLearningMinutes + totalPracticingMinutes + totalPerformingMinutes;
        if(totalMinutes >= 60){
            const hoursToAdd = Math.floor(totalMinutes / 60);
            const minutesRemainder = Math.round(totalMinutes % 60);
            setOverallHours(totalHours + hoursToAdd)
            setOverallMinutes(minutesRemainder);
        } else {
            setOverallHours(totalHours);
            setOverallMinutes(totalMinutes);
        };
    };

    const chooseCategoryToAddTime = (category) => {
        switch(category) {
            case "learning":
                addLearningTime()
                break;
            case "practicing":
                addPracticingTime();
                break;
            case "performing":
                addPerformingTime();
                break;
        };
    };

    const handleAddTime = () => {
        chooseCategoryToAddTime("learning");
        chooseCategoryToAddTime("practicing");
        chooseCategoryToAddTime("performing");
        addOverallTime();
    };

    const handleSaveChanges = () => {
        const updatedTable = {
            id: activity.id,
            skillName: skillName.toUpperCase(),
            learning: {     
                monday: {
                    hours: learningMondayHours, 
                    minutes:learningMondayMinutes
                },
                tuesday: {
                    hours: learningTuesdayHours, 
                    minutes: learningTuesdayMinutes
                },
                wednesday: {
                    hours: learningWednesdayHours, 
                    minutes: learningWednesdayMinutes
                },
                thursday: {
                    hours: learningThursdayHours, 
                    minutes: learningThursdayMinutes
                },
                friday: {
                    hours: learningFridayHours, 
                    minutes: learningFridayMinutes
                },
                saturday: {
                    hours: learningSaturdayHours, 
                    minutes: learningSaturdayMinutes
                },
                sunday: {
                    hours: learningSundayHours, 
                    minutes: learningSundayMinutes
                },
                actual: {
                    hours: totalLearningHours,
                    minutes: totalLearningMinutes
                },
                goal: {
                    hours: learningGoalHours, 
                    minutes: learningGoalMinutes
                }
            },
            practicing: {
                monday: {
                    hours: practicingMondayHours, 
                    minutes: practicingMondayMinutes
                },
                tuesday: {
                    hours: practicingTuesdayHours, 
                    minutes: practicingTuesdayMinutes
                },
                wednesday: {
                    hours: practicingWednesdayHours, 
                    minutes: practicingWednesdayMinutes
                },
                thursday: {
                    hours: practicingThursdayHours, 
                    minutes: practicingThursdayMinutes
                },
                friday: {
                    hours: practicingFridayHours, 
                    minutes: practicingFridayMinutes
                },
                saturday: {
                    hours: practicingSaturdayHours, 
                    minutes: practicingSaturdayMinutes
                },
                sunday: {
                    hours: practicingSundayHours, 
                    minutes: practicingSundayMinutes
                },
                actual: {
                    hours: totalPracticingHours,
                    minutes: totalPracticingMinutes
                },
                goal: {
                    hours: practicingGoalHours, 
                    minutes: practicingGoalMinutes
                }
            },
            performing: {
                monday: {
                    hours: performingMondayHours, 
                    minutes: performingMondayMinutes
                },
                tuesday: {
                    hours: performingTuesdayHours, 
                    minutes: performingTuesdayMinutes
                },
                wednesday: {
                    hours: performingWednesdayHours, 
                    minutes: performingWednesdayMinutes
                },
                thursday: {
                    hours: performingThursdayHours, 
                    minutes: performingThursdayMinutes
                },
                friday: {
                    hours: performingFridayHours, 
                    minutes: performingFridayMinutes
                },
                saturday: {
                    hours: performingSaturdayHours, 
                    minutes: performingSaturdayMinutes
                },
                sunday: {
                    hours: performingSundayHours, 
                    minutes: performingSundayMinutes
                },
                actual: {
                    hours: totalPerformingHours,
                    minutes: totalPerformingMinutes
                },
                goal: {
                    hours: performingGoalHours, 
                    minutes: performingGoalMinutes
                }
            },
            total: {
                actual: {
                    hours: overallHours,
                    minutes: overallMinutes
                },
                goal: {
                    hours: totalGoalHours, 
                    minutes: totalGoalMinutes
                }
            }
        };
        Express.updateTable(year, updatedTable);
    };

    const handleDeleteTable = () => {
        Express.deleteTable(year, activity.id);
        onRemove('table', activity);
    };

    

    return (
        <div>
        <input type="text" defaultValue={activity.skillName} onChange={(e) => setSkillName(e.target.value)}></input>
        <button onClick={handleAddTime}>Add Time</button> {/* have to double click to add total time */}
        <button onClick={handleDeleteTable}>Delete</button>
        <button onClick={handleSaveChanges}>Save Changes</button>
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
                        <input type="number" min='0' defaultValue={activity.learningMondayHours} onChange={(e) => setLearningMondayHours(Number(e.target.value))}></input>hrs
                        <input type="number" min='0' defaultValue={activity.learningMondayMinutes} onChange={(e) => setLearningMondayMinutes(Number(e.target.value))}></input>min
                    </td>
                    <td id="tuesday">
                        <input type="number" min='0' defaultValue={activity.learningTuesdayHours} onChange={(e) => setLearningTuesdayHours(Number(e.target.value))}></input>hrs
                        <input type="number" min='0' defaultValue={activity.learningTuesdayMinutes} onChange={(e) => setLearningTuesdayMinutes(Number(e.target.value))}></input>min
                    </td>
                    <td id="wednesday">
                        <input type="number" min='0' defaultValue={activity.learningWednesdayHours} onChange={(e) => setLearningWednesdayHours(Number(e.target.value))}></input>hrs
                        <input type="number" min='0' defaultValue={activity.learningWednesdayMinutes} onChange={(e) => setLearningWednesdayMinutes(Number(e.target.value))}></input>min
                    </td>
                    <td id="thursday">
                        <input type="number" min='0' defaultValue={activity.learningThursdayHours} onChange={(e) => setLearningThursdayHours(Number(e.target.value))}></input>hrs
                        <input type="number" min='0' defaultValue={activity.learningThursdayMinutes} onChange={(e) => setLearningThursdayMinutes(Number(e.target.value))}></input>min
                    </td>
                    <td id="friday">
                        <input type="number" min='0' defaultValue={activity.learningFridayHours} onChange={(e) => setLearningFridayHours(Number(e.target.value))}></input>hrs
                        <input type="number" min='0' defaultValue={activity.learningFridayMinutes} onChange={(e) => setLearningFridayMinutes(Number(e.target.value))}></input>min
                    </td>
                    <td id="saturday">
                        <input type="number" min='0' defaultValue={activity.learningSaturdayHours} onChange={(e) => setLearningSaturdayHours(Number(e.target.value))}></input>hrs
                        <input type="number" min='0' defaultValue={activity.learningSaturdayMinutes} onChange={(e) => setLearningSaturdayMinutes(Number(e.target.value))}></input>min
                    </td>
                    <td id="sunday">
                        <input type="number" min='0' defaultValue={activity.learningSundayHours} onChange={(e) => setLearningSundayHours(Number(e.target.value))}></input>hrs
                        <input type="number" min='0' defaultValue={activity.learningSundayMinutes} onChange={(e) => setLearningSundayMinutes(Number(e.target.value))}></input>min
                    </td>
                    <td id="actual">
                        <p>{totalLearningHours}</p>hrs
                        <p>{totalLearningMinutes}</p>min
                    </td>
                    <td id="goal">
                        <input type="number" min='0' defaultValue={activity.learningGoalHours} onChange={(e) => setLearningGoalHours(Number(e.target.value))}></input>hrs
                        <input type="number" min='0' defaultValue={activity.learningGoalMinutes} onChange={(e) => setLearningGoalMinutes(Number(e.target.value))}></input>min
                    </td>
                </tr>
                <tr>
                    <th>Practicing</th>
                    <td id="monday">
                        <input type="number" min='0' defaultValue={activity.practicingMondayHours} onChange={(e) => setPracticingMondayHours(Number(e.target.value))}></input>hrs
                        <input type="number" min='0' defaultValue={activity.practicingMondayMinutes} onChange={(e) => setPracticingMondayMinutes(Number(e.target.value))}></input>min
                    </td>
                    <td id="tuesday">
                        <input type="number" min='0' defaultValue={activity.practicingTuesdayHours} onChange={(e) => setPracticingTuesdayHours(Number(e.target.value))}></input>hrs
                        <input type="number" min='0' defaultValue={activity.practicingTuesdayMinutes} onChange={(e) => setPracticingTuesdayMinutes(Number(e.target.value))}></input>min
                    </td>
                    <td id="wednesday">
                        <input type="number" min='0' defaultValue={activity.practicingWednesdayHours}onChange={(e) => setPracticingWednesdayHours(Number(e.target.value))}></input>hrs
                        <input type="number" min='0' defaultValue={activity.practicingWednesdayMinutes} onChange={(e) => setPracticingWednesdayMinutes(Number(e.target.value))}></input>min
                    </td>
                    <td id="thursday">
                        <input type="number" min='0' defaultValue={activity.practicingThursdayHours} onChange={(e) => setPracticingThursdayHours(Number(e.target.value))}></input>hrs
                        <input type="number" min='0' defaultValue={activity.practicingThursdayMinutes} onChange={(e) => setPracticingThursdayMinutes(Number(e.target.value))}></input>min
                    </td>
                    <td id="friday">
                        <input type="number" min='0' defaultValue={activity.practicingFridayHours} onChange={(e) => setPracticingFridayHours(Number(e.target.value))}></input>hrs
                        <input type="number" min='0' defaultValue={activity.practicingFridayMinutes} onChange={(e) => setPracticingFridayMinutes(Number(e.target.value))}></input>min
                    </td>
                    <td id="saturday">
                        <input type="number" min='0' defaultValue={activity.practicingSaturdayHours} onChange={(e) => setPracticingSaturdayHours(Number(e.target.value))}></input>hrs
                        <input type="number" min='0' defaultValue={activity.practicingSaturdayMinutes} onChange={(e) => setPracticingSaturdayMinutes(Number(e.target.value))}></input>min
                    </td>
                    <td id="sunday">
                        <input type="number" min='0' defaultValue={activity.practicingSundayHours} onChange={(e) => setPracticingSundayHours(Number(e.target.value))}></input>hrs
                        <input type="number" min='0' defaultValue={activity.practicingSundayMinutes} onChange={(e) => setPracticingSundayMinutes(Number(e.target.value))}></input>min
                    </td>
                    <td id="actual">
                        <p>{totalPracticingHours}</p>hrs
                        <p>{totalPracticingMinutes}</p>min
                    </td>
                    <td id="goal">
                        <input type="number" min='0' defaultValue={activity.practicingGoalHours} onChange={(e) => setPracticingGoalHours(Number(e.target.value))}></input>hrs
                        <input type="number" min='0' defaultValue={activity.practicingGoalMinutes} onChange={(e) => setPracticingGoalMinutes(Number(e.target.value))}></input>min
                    </td>
                </tr>
                <tr>
                    <th>Performing</th>
                    <td id="monday">
                        <input type="number" min='0' defaultValue={activity.performingMondayHours} onChange={(e) => setPerformingMondayHours(Number(e.target.value))}></input>hrs
                        <input type="number" min='0' defaultValue={activity.performingMondayMinutes} onChange={(e) => setPerformingMondayMinutes(Number(e.target.value))}></input>min
                    </td>
                    <td id="tuesday">
                        <input type="number" min='0' defaultValue={activity.performingTuesdayHours} onChange={(e) => setPerformingTuesdayHours(Number(e.target.value))}></input>hrs
                        <input type="number" min='0' defaultValue={activity.performingTuesdayMinutes} onChange={(e) => setPerformingTuesdayMinutes(Number(e.target.value))}></input>min
                    </td>
                    <td id="wednesday">
                        <input type="number" min='0' defaultValue={activity.performingWednesdayHours} onChange={(e) => setPerformingWednesdayHours(Number(e.target.value))}></input>hrs
                        <input type="number" min='0' defaultValue={activity.performingWednesdayMinutes} onChange={(e) => setPerformingWednesdayMinutes(Number(e.target.value))}></input>min
                    </td>
                    <td id="thursday">
                        <input type="number" min='0' defaultValue={activity.performingThursdayHours} onChange={(e) => setPerformingThursdayHours(Number(e.target.value))}></input>hrs
                        <input type="number" min='0' defaultValue={activity.performingThursdayMinutes} onChange={(e) => setPerformingThursdayMinutes(Number(e.target.value))}></input>min
                    </td>
                    <td id="friday">
                        <input type="number" min='0' defaultValue={activity.performingFridayHours} onChange={(e) => setPerformingFridayHours(Number(e.target.value))}></input>hrs
                        <input type="number" min='0' defaultValue={activity.performingFridayMinutes} onChange={(e) => setPerformingFridayMinutes(Number(e.target.value))}></input>min
                    </td>
                    <td id="saturday">
                        <input type="number" min='0' defaultValue={activity.performingSaturdayHours} onChange={(e) => setPerformingSaturdayHours(Number(e.target.value))}></input>hrs
                        <input type="number" min='0' defaultValue={activity.performingSaturdayMinutes} onChange={(e) => setPerformingSaturdayMinutes(Number(e.target.value))}></input>min
                    </td>
                    <td id="sunday">
                        <input type="number" min='0' defaultValue={activity.performingSundayHours} onChange={(e) => setPerformingSundayHours(Number(e.target.value))}></input>hrs
                        <input type="number" min='0' defaultValue={activity.performingSundayMinutes} onChange={(e) => setPerformingSundayMinutes(Number(e.target.value))}></input>min
                    </td>
                    <td id="actual">
                        <p>{totalPerformingHours}</p>hrs
                        <p>{totalPerformingMinutes}</p>min
                    </td>
                    <td id="goal">
                        <input type="number" min='0' defaultValue={activity.performingGoalHours} onChange={(e) => setPerformingGoalHours(Number(e.target.value))}></input>hrs
                        <input type="number" min='0' defaultValue={activity.performingGoalMinutes} onChange={(e) => setPerformingGoalMinutes(Number(e.target.value))}></input>min
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
                        <input type="number" min='0' defaultValue={activity.totalGoalHours} onChange={(e) => setTotalGoalHours(e.target.value)}></input>hrs
                        <input type="number" min='0' defaultValue={activity.totalGoalMinutes} onChange={(e) => setTotalGoalMinutes(e.target.value)}></input>min 
                    </td>
                </tr>
            </tbody>
        </table>
        </div>
    )
};

export default Table;