import React, { useState, useEffect, useReducer } from 'react';
import {Link} from 'react-router-dom';
import Express from '../../fetchExpress';
import "./weeks.css"


function Weeks({ match:{params: {monthAndMonthId, year}}}) {
    const [monthId, setMonthId] = useState(monthAndMonthId.replace(/^\D+/g, ''));
    const [weeks, setWeeks] = useState([]);
    const [date, setDate] = useState('');
    

    useEffect(() => {
        Express.getWeeks(year, monthId).then(savedWeeks => setWeeks(savedWeeks)); 
    }, []);

    

    const handleSaveWeek = () => {
        Express.createWeek(year, date, monthId).then(newWeek => setWeeks(savedWeeks => [...savedWeeks, newWeek]));
    };

    const dateChange = (e) => {
        const extractedMonth = monthAndMonthId.replace(/[^a-zA-Z]+/g, '');
        console.log(extractedMonth);
        setDate(`${extractedMonth} ${e.target.value}`)
    };

    const handleDeleteYear = (e) => {
        const weekId = e.target.value;
        Express.deleteWeek(year, weekId).then(checkError400 => {
            if(checkError400 == 'error 400'){
                return;
            } setWeeks(currentWeek => currentWeek.filter(week => week.id != weekId))});
    };

    const renderWeeks = () => {
        return weeks.map(week => {
            return (
                <div className="deleteContainer">
                    <Link className="link" to={`/${year}/${monthAndMonthId}/${week.id}`}
                        key={week.id}>
                        <h3>{week.week}</h3>
                    </Link>
                    <button value={week.id} onClick={handleDeleteYear}>Delete</button>
                </div>
            )
        });
    };

    return (
        <div className="container">
            <h1>Weeks</h1>
            {renderWeeks()}
            <input id="addInput" type="number" min="1" max="31" onChange={dateChange} placeholder="Day" />
            <button onClick={handleSaveWeek}>Add</button>
            <p className="note">*Make sure the day is a Monday. For example, the date 10/5/2020, you would put 5, which is a Monday, for day to add*</p>
            <div className="space"></div>
            <Link className="link" to={`/${year}/${monthAndMonthId}/monthReview`}><h4 id="review">Month Review</h4></Link>
        </div>
    );
};

export default Weeks;