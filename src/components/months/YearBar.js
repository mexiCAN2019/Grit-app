import React from 'react';
import './YearBar.css';

function YearBar({ months }) {

    const renderBar = () => {
        switch(months.length) {
            case 0:
            case 1:
                return <span style={{width: '0%'}}></span>
            case 2:
                return <span style={{width: '8.33%'}}></span>
            case 3:
                return <span style={{width: '16.67%'}}></span>
            case 4:
                return <span style={{width: '25%'}}></span>
            case 5:
                return <span style={{width: '33.33%'}}></span>
            case 6:
                return <span style={{width: '41.67%'}}></span>
            case 7:
                return <span style={{width: '50%'}}></span>
            case 8:
                return <span style={{width: '58.33%'}}></span>
            case 9:
                return <span style={{width: '66.67%'}}></span>
            case 10:
                return <span style={{width: '75%'}}></span>
            case 11:
                return <span style={{width: '83.33%'}}></span>
            case 12:
                return <span style={{width: '91.67%'}}></span>
            case 13:
                return <span style={{width: '100%'}}></span>
        };
    };


    const renderPercentage = () => {
        switch(months.length) {
            case 0:
            case 1:
                return <h2>0%</h2>
            case 2:
                return <h2>8%</h2>
            case 3:
                return <h2>17%</h2>
            case 4:
                return <h2>25%</h2>
            case 5:
                return <h2>33%</h2>
            case 6:
                return <h2>42%</h2>
            case 7:
                return <h2>50%</h2>
            case 8:
                return <h2>58%</h2>
            case 9:
                return <h2>67%</h2>
            case 10:
                return <h2>75%</h2>
            case 11:
                return <h2>83%</h2>
            case 12:
                return <h2>92%</h2>
            case 13:
                return <h2>100%!!!</h2>
        };
    }; 


    return (
        <div className="yearBarContainer">
            {renderPercentage()} of the year finished!
            <div className="meter">
            {renderBar()}
            </div>
        </div>
    );
};

export default YearBar;
