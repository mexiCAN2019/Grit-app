import React, { useState, useEffect } from 'react';
import {Link, useHistory} from 'react-router-dom';
import YearBar from './YearBar';
import Express from './../../fetchExpress';
// import { render } from '@testing-library/react'; not sure what this is


function Months({match:{params:{year}}}) { /* Not really sure how this params works. */
    const [months, setMonths] = useState([]);
    const history = useHistory();


    useEffect(() => {
        Express.getMonths(year).then(savedMonths => setMonths(savedMonths));
    }, []);

    const renderMonths = () => {
        return months.map(month => {
            if(month.month == 'Done!'){
                return <div>
                        <h3>{month.month}</h3>
                        {renderDeleteButton(month.id)}
                    </div>
            }
            return (
                <div>
                    <Link to={`/${month.yearFK}/${month.month}${month.id}`}
                        key={month.id}>
                        <h3>{month.month}</h3>
                    </Link>
                    {renderDeleteButton(month.id)}
                </div>
            );
        });
    };

    //in css, make it when add is pushed, it makes previous month(s) red, to show that month was completed.
    const handleAddMonth = () => {
        switch(months.length) {
            case 0:
                Express.createMonth(year, 'January');
                break;
            case 1:
                Express.createMonth(year, 'February');
                break;
            case 2:
                Express.createMonth(year, 'March');
                break;
            case 3:
                Express.createMonth(year, 'April');
                break;
            case 4:
                Express.createMonth(year, 'May');
                break;
            case 5:
                Express.createMonth(year, 'June');
                break;
            case 6:
                Express.createMonth(year, 'July');
                break;
            case 7:
                Express.createMonth(year, 'August');
                break;
            case 8:
                Express.createMonth(year, 'September');
                break;
            case 9:
                Express.createMonth(year, 'October');
                break;
            case 10:
                Express.createMonth(year, 'November');
                break;
            case 11:
                Express.createMonth(year, 'December');
                break;
            case 12:
                Express.createMonth(year, 'Done!');
                break;
            default:
                return;
        }
        Express.getMonths(year).then(savedMonths => setMonths(savedMonths));    
    };
    
    // This works but must refresh page to update the state of months through the useEffect
    const renderDeleteButton = (id) => {
        const monthToRenderDelete = months.length - 1;
        if(months[monthToRenderDelete].id == id){
            return <button onClick={() => Express.deleteMonth(year,id).then(checkError400 => {
                if(checkError400){
                    return;
                } setMonths(currentMonths => currentMonths.filter(currentMonth => currentMonth.id != id));
            })}>delete</button>;
        };
    };


    // I was going to make switch and after switch, call Express.getMonths. But issue with using return won't reach to express call
    // const renderDeleteButton = (id) => {
    //     const monthToRenderDelete = months.length - 1;
    //     switch(months[monthToRenderDelete]){
    //         case 0:
    //             return <button onClick={() => Express.deleteMonth(year,id)}>delete</button>;
    //             break;
    //         case 1:
    //             return <button onClick={() => Express.deleteMonth(year,id)}>delete</button>;
    //             break;
    //         case 2:
    //             return <button onClick={() => Express.deleteMonth(year,id)}>delete</button>;
    //             break;
    //         case 3:
    //             Express.createMonth(year, 'April');
    //             break;
    //         case 4:
    //             Express.createMonth(year, 'May');
    //             break;
    //         case 5:
    //             Express.createMonth(year, 'June');
    //             break;
    //         case 6:
    //             Express.createMonth(year, 'July');
    //             break;
    //         case 7:
    //             Express.createMonth(year, 'August');
    //             break;
    //         case 8:
    //             Express.createMonth(year, 'September');
    //             break;
    //         case 9:
    //             Express.createMonth(year, 'October');
    //             break;
    //         case 10:
    //             Express.createMonth(year, 'November');
    //             break;
    //         case 11:
    //             Express.createMonth(year, 'December');
    //             break;
    //         case 12:
    //             Express.createMonth(year, 'Year Review!');
    //             break;
    //     }
    // }

    return (
        <div>
            <YearBar months={months} />
            <h1>Months</h1>
            {renderMonths()}
            <button onClick={handleAddMonth}>Add</button>
            <Link to={`/${year}/yearReview`}><h4>Year Review!</h4></Link>
        </div>
    );
};

export default Months;