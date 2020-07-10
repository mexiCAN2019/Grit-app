import React, { useState, useEffect, useReducer } from 'react';
import {Link} from 'react-router-dom';
import Express from '../../fetchExpress';



function Weeks({ match:{params: {monthAndMonthId, year}}}) {
    const [monthId, setMonthId] = useState(monthAndMonthId.replace(/^\D+/g, ''));
    const [weeks, setWeeks] = useState([]);
    const [date, setDate] = useState('');
    

    useEffect(() => {
        Express.getWeeks(year, monthId).then(savedWeeks => setWeeks(savedWeeks)); 
    }, []);

    const renderWeeks = () => {
        return weeks.map(week => {
            return (
                <div>
                    <Link to={`/${year}/${monthAndMonthId}/${week.id}`}
                        key={week.id}>
                        <h3>{week.week}</h3>
                    </Link>
                    <button value={week.id} onClick={handleDeleteYear}>Delete</button>
                </div>
            )
        });
    };

    // Used this before adding backend
    // const handleAdd = () => {
    //     const repetitiveDate = weeks.find(week => week.id === day);
    //     if(!day || repetitiveDate) {
    //         return;
    //     } 
    //     setWeeks(prevWeeks => [...prevWeeks, {date: `${monthAndMonthId} ${day}`, id: day}]);
    // }

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

    return (
        <div>
            <h1>Weeks</h1>
            {renderWeeks()}
            <input type="number" min="1" max="31" onChange={dateChange}></input> 
            <button onClick={handleSaveWeek}>Add</button>
            <Link to={`/${year}/${monthAndMonthId}/monthReview`}><p>Month Review</p></Link>
        </div>
    );
};

export default Weeks;