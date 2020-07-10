import React, { useState } from 'react';
import Express from '../../fetchExpress';

const Checkbox = ({ activity, onRemove, year }) => {
    const [skillName, setSkillName] = useState(activity.skillName);

    const [mondayChecked, setMondayChecked] = useState(activity.monday);
    const [tuesdayChecked, setTuesdayChecked] = useState(activity.tuesday);
    const [wednesdayChecked, setWednesdayChecked] = useState(activity.wednesday);
    const [thursdayChecked, setThursdayChecked] = useState(activity.thursday);
    const [fridayChecked, setFridayChecked] = useState(activity.friday);
    const [saturdayChecked, setSaturdayChecked] = useState(activity.saturday);
    const [sundayChecked, setSundayChecked] = useState(activity.sunday);



    const handleCheck = (e) => {
        const itemCheck = e.target.checked;
        console.log(itemCheck);
        switch(e.target.id){
            case 'monday':
                setMondayChecked(itemCheck);
                break;
            case 'tuesday':
                setTuesdayChecked(itemCheck);
                break;
            case 'wednesday':
                setWednesdayChecked(itemCheck);
                break;
            case 'thursday':
                setThursdayChecked(itemCheck);
                break;
            case 'friday':
                setFridayChecked(itemCheck);
                break;
            case 'saturday':
                setSaturdayChecked(itemCheck);
                break;
            case 'sunday':
                setSundayChecked(itemCheck);
                break;
        };
    };

    const renderCheckbox = (dayOfWeek) => {
        switch(dayOfWeek) {
            case 'monday':
                if(mondayChecked === '1') {
                    return (
                        <div>
                            <label for="monday">Monday</label>
                            <input type="checkbox" id="monday" onChange={handleCheck} checked></input>
                        </div>
                    )
                } else {
                    return (
                        <div>
                            <label for="monday">Monday</label>
                            <input type="checkbox" id="monday" onChange={handleCheck}></input>
                        </div>
                    )
                }
            case 'tuesday':
                if(tuesdayChecked === '1') {
                    return (
                        <div>
                            <label for="monday">Tuesday</label>
                            <input type="checkbox" id="tuesday" onChange={handleCheck} checked></input>
                        </div>
                    )
                } else {
                    return (
                        <div>
                            <label for="monday">Tuesday</label>
                            <input type="checkbox" id="tuesday" onChange={handleCheck}></input>
                        </div>
                    )
                }
            case 'wednesday':
                if(wednesdayChecked === '1') {
                    return (
                        <div>
                            <label for="monday">Wednesday</label>
                            <input type="checkbox" id="wednesday" onChange={handleCheck} checked></input>
                        </div>
                    )
                } else {
                    return (
                        <div>
                            <label for="monday">Wednesday</label>
                            <input type="checkbox" id="wednesday" onChange={handleCheck}></input>
                        </div>
                    )
                }
            case 'thursday':
                if(thursdayChecked === '1') {
                    return (
                        <div>
                            <label for="monday">Thursday</label>
                            <input type="checkbox" id="thursday" onChange={handleCheck} checked></input>
                        </div>
                    )
                } else {
                    return (
                        <div>
                            <label for="monday">Thursday</label>
                            <input type="checkbox" id="thursday" onChange={handleCheck}></input>
                        </div>
                    )
                }
            case 'friday':
                if(fridayChecked === '1') {
                    return (
                        <div>
                            <label for="monday">Friday</label>
                            <input type="checkbox" id="friday" onChange={handleCheck} checked></input>
                        </div>
                    )
                } else {
                    return (
                        <div>
                            <label for="monday">Friday</label>
                            <input type="checkbox" id="friday" onChange={handleCheck}></input>
                        </div>
                    )
                }
            case 'saturday':
                if(saturdayChecked === '1') {
                    return (
                        <div>
                            <label for="monday">Saturday</label>
                            <input type="checkbox" id="saturday" onChange={handleCheck} checked></input>
                        </div>
                    )
                } else {
                    return (
                        <div>
                            <label for="monday">Saturday</label>
                            <input type="checkbox" id="saturday" onChange={handleCheck}></input>
                        </div>
                    )
                }
            case 'sunday':
                if(sundayChecked === '1') {
                    return (
                        <div>
                            <label for="monday">Sunday</label>
                            <input type="checkbox" id="sunday" onChange={handleCheck} checked></input>
                        </div>
                    )
                } else {
                    return (
                        <div>
                            <label for="monday">Sunday</label>
                            <input type="checkbox" id="sunday" onChange={handleCheck}></input>
                        </div>
                    )
                }
        };
    };

    const updateCheckbox = (e) => {
        e.preventDefault();
        const updatedCheckbox = {
            skillName: skillName.toUpperCase(),
            monday: mondayChecked,
            tuesday: tuesdayChecked,
            wednesday: wednesdayChecked,
            thursday: thursdayChecked,
            friday: fridayChecked,
            saturday: saturdayChecked,
            sunday: sundayChecked,
            id: activity.id
        };
        Express.updateCheckbox(year, updatedCheckbox);
    };

    const handleDelete = () => {
        Express.deleteCheckbox(year, activity.id);
        onRemove('checkbox', activity);
    };


    return (
        <div>
            
                <input type="text" defaultValue={activity.skillName} onChange={(e) => setSkillName(e.target.value)}></input>
                <button onClick={updateCheckbox}>Save Changes</button>
                <button onClick={handleDelete}>Delete</button>

                
                {renderCheckbox('monday')}
                {renderCheckbox('tuesday')}
                {renderCheckbox('wednesday')}
                {renderCheckbox('thursday')}
                {renderCheckbox('friday')}
                {renderCheckbox('saturday')}
                {renderCheckbox('sunday')}
            
        </div>
    );
};

export default Checkbox;