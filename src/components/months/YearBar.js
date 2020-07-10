import React from 'react';

function YearBar({ months }) {

    const renderBar = () => {
        switch(months.length) {
            case 0:
            case 1:
                return <h2>0%</h2>
            case 2:
                return <h2>8.333%</h2>
            case 3:
                return <h2>16.67%</h2>
            case 4:
                return <h2>25%</h2>
            case 5:
                return <h2>33.33%</h2>
            case 6:
                return <h2>41.67%</h2>
            case 7:
                return <h2>50%</h2>
            case 8:
                return <h2>58.33%</h2>
            case 9:
                return <h2>66.67%</h2>
            case 10:
                return <h2>75%</h2>
            case 11:
                return <h2>83.33%</h2>
            case 12:
                return <h2>91.67%</h2>
            case 13:
                return <h2>100%!!!</h2>
        };
    };



    return (
        <div>
            {renderBar()} of the year done!
        </div>
    );
};

export default YearBar;