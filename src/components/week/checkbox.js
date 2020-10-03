import React, { useState } from 'react';
import Express from '../../fetchExpress';
import './checkbox.css';

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

    const renderCheckbox = (dayOfWeek) => {
        switch(dayOfWeek) {
            case 'monday':
                if(mondayChecked === '1') {
                    return (
                        <div className="checkbox">
                            <input type="checkbox" className="day" id="monday" onChange={handleCheck} checked></input>
                            <label for="monday">Monday</label>
                        </div>
                    )
                } else {
                    return (
                        <div className="checkbox">
                            <input type="checkbox" className="day" id="monday" onChange={handleCheck}></input>
                            <label for="monday">Monday</label>
                        </div>
                    )
                }
            case 'tuesday':
                if(tuesdayChecked === '1') {
                    return (
                        <div className="checkbox">
                            <input type="checkbox" className="day" id="tuesday" onChange={handleCheck} checked></input>
                            <label for="tuesday">Tuesday</label>
                        </div>
                    )
                } else {
                    return (
                        <div className="checkbox">
                            <input type="checkbox" className="day" id="tuesday" onChange={handleCheck}></input>
                            <label for="tuesday">Tuesday</label>
                        </div>
                    )
                }
            case 'wednesday':
                if(wednesdayChecked === '1') {
                    return (
                        <div className="checkbox">
                            <input type="checkbox" className="day" id="wednesday" onChange={handleCheck} checked></input>
                            <label for="wednesday">Wednesday</label>
                        </div>
                    )
                } else {
                    return (
                        <div className="checkbox">
                            <input type="checkbox" className="day" id="wednesday" onChange={handleCheck}></input>
                            <label for="wednesday">Wednesday</label>
                        </div>
                    )
                }
            case 'thursday':
                if(thursdayChecked === '1') {
                    return (
                        <div className="checkbox">
                            <input type="checkbox" className="day" id="thursday" onChange={handleCheck} checked></input>
                            <label for="thursday">Thursday</label>
                        </div>
                    )
                } else {
                    return (
                        <div className="checkbox">
                            <input type="checkbox" className="day" id="thursday" onChange={handleCheck}></input>
                            <label for="thursday">Thursday</label>
                        </div>
                    )
                }
            case 'friday':
                if(fridayChecked === '1') {
                    return (
                        <div className="checkbox">
                            <input type="checkbox" className="day" id="friday" onChange={handleCheck} checked></input>
                            <label for="friday">Friday</label>
                        </div>
                    )
                } else {
                    return (
                        <div className="checkbox">
                            <input type="checkbox" className="day" id="friday" onChange={handleCheck}></input>
                            <label for="friday">Friday</label>
                        </div>
                    )
                }
            case 'saturday':
                if(saturdayChecked === '1') {
                    return (
                        <div className="checkbox">
                            <input type="checkbox" className="day" id="saturday" onChange={handleCheck} checked></input>
                            <label for="saturday">Saturday</label>
                        </div>
                    )
                } else {
                    return (
                        <div className="checkbox">
                            <input type="checkbox" className="day" id="saturday" onChange={handleCheck}></input>
                            <label for="saturday">Saturday</label>
                        </div >
                    )
                }
            case 'sunday':
                if(sundayChecked === '1') {
                    return (
                        <div className="checkbox">
                            <input type="checkbox" className="day" id="sunday" onChange={handleCheck} checked></input>
                            <label for="sunday">Sunday</label>
                        </div>
                    )
                } else {
                    return (
                        <div className="checkbox">
                            <input type="checkbox" className="day" id="sunday" onChange={handleCheck}></input>
                            <label for="sunday">Sunday</label>
                        </div>
                    )
                }
        };
    };

    return (
        <div className="checkboxesContainer">
            
                <input className="skillName" style={{margin: "50px auto 20px"}} type="text" defaultValue={activity.skillName} onChange={(e) => setSkillName(e.target.value)}></input>
                <br></br>
                <button onClick={handleDelete}>Delete</button>
                <button onClick={updateCheckbox}>Save Changes</button>

                <div className="checkboxes">
                {renderCheckbox('monday')}
                {renderCheckbox('tuesday')}
                {renderCheckbox('wednesday')}
                {renderCheckbox('thursday')}
                {renderCheckbox('friday')}
                {renderCheckbox('saturday')}
                {renderCheckbox('sunday')}
                </div>
        </div>
    );
};

export default Checkbox;