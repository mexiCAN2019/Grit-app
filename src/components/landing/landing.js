import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './landing.css';

import Express from './../../fetchExpress';

function Landing () {
    const [years, setYears] = useState([]);
    const [yearChange, setYearChange] = useState('');

    useEffect(() => {
        console.log(Express.getYears());
        Express.getYears().then(savedYears => setYears(savedYears.years));
    }, []);

    

    const handleYearChange = (e) => {
        setYearChange(e.target.value);
    };

    const handleSaveYear = () => {
        const repetitiveYear = years.find(year => year.year == yearChange); 
        if(!yearChange || repetitiveYear) {
            return;
        } else {
            Express.createYear(yearChange).then(newYear => setYears(currentYears => [newYear, ...currentYears]));
        };
    };

    const handleDeleteYear = (e) => {
        const year = e.target.value;
        Express.deleteYear(year).then(checkError400 => {
            if(checkError400 == 'error 400'){
                return;
            } setYears(currentYear => currentYear.filter(currentyear => currentyear.year != year))});
    };

    const renderYears = () => {
        return years.map(year => {
            return (
                <div className="white">
                    <Link className="link" to={`/${year.year}`}
                        key={year.id}>
                        <h3>{year.year}</h3>
                    </Link>
                    <button value={year.year} onClick={handleDeleteYear}>Delete</button>
                </div>
            );
        });
    };

    return (
        <div className="container">
            <h2>Choose A Year</h2>
            <div>
                {renderYears()}
            </div>
            <input id="addInput" type="number" onChange={handleYearChange} min='2020' placeholder="Year" />
            <button onClick={handleSaveYear}>Add</button>
        </div>
    );
};

export default Landing;