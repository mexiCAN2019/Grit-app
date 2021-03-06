import React from 'react';
import Checkbox from './checkbox';
// import Table from './table';
import Table from './tableState';
import TextBox from './textBox';
import './formList.css'

function FormList({ tables, checkboxes, subjectives, onRemove, year }) {

    // const renderTables = () => {
    //     tables.map(activity => {
    //         return <Table title={activity} key='1' />
    //     })
    // } for some reason interjecting this function in the return/render portion of FormList function wouldn't work

    return (
        <div className='list-container'>

            <div className="table-container">
            {tables.map(activity => {
                return <Table activity={activity}
                              key={activity.id}
                              onRemove={onRemove}
                              year={year}  />
            })}
            </div>

            <div className="checkboxContainer">
            {checkboxes.map(activity => {
                return <Checkbox activity={activity}
                                 key={activity.id}
                                 onRemove={onRemove}
                                 year={year} />
            })}
            </div>
            
            <div className='textbox-container'>
            {subjectives.map(activity => {
                return <TextBox activity={activity}
                                key={activity.id}
                                onRemove={onRemove}
                                year={year} />
            })}
            </div>

        </div>

    )
};

export default FormList;