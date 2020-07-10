import React, { useState, useEffect } from 'react';
import FormList from './formList';
import Express from './../../fetchExpress';

function Week({ match: { params: { year, weekId, monthAndMonthId }}}) {
    const [tables, setTables] = useState([]);
    const [checkboxes, setCheckBoxes] = useState([]);
    const [subjectives, setSubjectives] = useState([]);
    const [skillName, setSkillName] = useState('');
    const [form, setForm] = useState('');
    const [monthId, setMonthId] = useState(monthAndMonthId.replace(/^\D+/g, ''));



    useEffect(() => {
        Express.getTables(year, weekId).then(tables => setTables(tables));
    }, []);

    useEffect(() => {
        Express.getCheckboxes(year, weekId).then(checkboxes => setCheckBoxes(checkboxes));
    }, []);

    useEffect(() => {
        Express.getSubjectives(year, weekId).then(subjectives => setSubjectives(subjectives));
    }, []);


    const handleActivityChange = (e) => {
        setSkillName(e.target.value);
    };

    const handleFormChange = (e) => {
        setForm(e.target.value);
    };

    const onAdd = () => {
        switch(form){
            case 'table':
                // setTableId(prevId => prevId + 1); //state of tableId will actuall be one more than what the key will be for the table. Don't know why
                // setTables(prevTable => {
                //      return [ ...prevTable, {activity: {skillName: skillName}, id: tableId} ]
                //  }); way i saved tables before adding backend
                let newTable = {
                    skillName: skillName.toUpperCase(),
                    weekId: weekId,
                    monthId: monthId,
                    yearFK: year,
                    learning: {     
                        monday: {
                            hours: 0, 
                            minutes: 0
                        },
                        tuesday: {
                            hours: 0, 
                            minutes: 0
                        },
                        wednesday: {
                            hours: 0, 
                            minutes: 0
                        },
                        thursday: {
                            hours: 0, 
                            minutes: 0
                        },
                        friday: {
                            hours: 0, 
                            minutes: 0
                        },
                        saturday: {
                            hours: 0, 
                            minutes: 0
                        },
                        sunday: {
                            hours: 0, 
                            minutes: 0
                        },
                        goal: {
                            hours: 0, 
                            minutes: 0
                        }
                    },
                    practicing: {
                        monday: {
                            hours: 0, 
                            minutes: 0
                        },
                        tuesday: {
                            hours: 0, 
                            minutes: 0
                        },
                        wednesday: {
                            hours: 0, 
                            minutes: 0
                        },
                        thursday: {
                            hours: 0, 
                            minutes: 0
                        },
                        friday: {
                            hours: 0, 
                            minutes: 0
                        },
                        saturday: {
                            hours: 0, 
                            minutes: 0
                        },
                        sunday: {
                            hours: 0, 
                            minutes: 0
                        },
                        goal: {
                            hours: 0, 
                            minutes:0
                        }
                    },
                    performing: {
                        monday: {
                            hours: 0, 
                            minutes:0
                        },
                        tuesday: {
                            hours: 0, 
                            minutes:0
                        },
                        wednesday: {
                            hours: 0, 
                            minutes:0
                        },
                        thursday: {
                            hours: 0, 
                            minutes:0
                        },
                        friday: {
                            hours: 0, 
                            minutes:0
                        },
                        saturday: {
                            hours: 0, 
                            minutes:0
                        },
                        sunday: {
                            hours: 0, 
                            minutes:0
                        },
                        goal: {
                            hours: 0, 
                            minutes:0
                        }
                    },
                    total: {
                        goal: {
                            hours: 0, 
                            minutes:0
                        }
                    }
                };
                
                Express.createTable(year, newTable).then(createdTable => setTables(savedTables => [...savedTables, createdTable]));
                break;
            case 'checkbox':
                // setCheckboxId(prevId => prevId + 1); //state of tableId will actuall be one more than what the key will be for the table. Don't know why
                // setCheckBoxes(prevCheckbox => {
                //     return [ ...prevCheckbox, {activity: skillName, id: checkboxId} ]
                // });
                const newCheckbox = {
                    skillName: skillName.toUpperCase(),
                    weekId: weekId,
                    monthId: monthId,
                    yearFK: year,
                    monday: 0,
                    tuesday: 0,
                    wednesday: 0,
                    thursday: 0,
                    friday: 0,
                    saturday: 0,
                    sunday: 0
                };
                Express.createCheckbox(year, newCheckbox).then(createdCheckbox => setCheckBoxes(savedCheckboxes => [...savedCheckboxes, createdCheckbox]));
                break;
            case 'subjective':
                // setSubjectiveId(prevId => prevId + 1); //state of tableId will actuall be one more than what the key will be for the table. Don't know wh
                // setSubjectives(prevSubjective => {
                //     return [ ...prevSubjective, {activity: skillName, id: subjectiveId} ]
                // });
                const newTextbox = {
                    text: '',
                    skillName: skillName.toUpperCase(),
                    weekId: weekId
                }
                Express.createSubjective(year, newTextbox).then(createdTextbox => setSubjectives(savedTextboxes => [...savedTextboxes, createdTextbox]));
                break;
            default:
                return;
        };
    };

    const removeForm = (form, activity) => {
        switch(form){
            case 'table':
                 setTables(currentTable => {
                     return currentTable.filter(table => table.id !== activity.id)
                 });
                break;
            case 'checkbox':
                setCheckBoxes(currentCheckbox => {
                    return currentCheckbox.filter(checkbox => checkbox.id !== activity.id)
                });
                break;
            case 'subjective':
                setSubjectives(currentSubjective => {
                    return currentSubjective.filter(subjective => subjective.id !== activity.id)
                });
                break;
        };
    };

    const renderDropdown = () => {
        return (
            <div>
                <label >Name of Skill</label>
                <input type="text" name="title" id="title" onChange={handleActivityChange}></input>
                <label >Choose Form Type</label>
                <select name="form" id="form" onChange={handleFormChange}>
                    <option></option>
                    <option value="table">Table</option>
                    <option value="checkbox">Checkbox</option>
                    <option value="subjective">Subjective</option>
                </select>
                <button className="add" onClick={onAdd}>Add</button>
            </div>
        );
    };

    return (
        <div>
            <h1>Single Week</h1>

            <FormList tables={tables}
                      checkboxes={checkboxes}
                      subjectives={subjectives}
                      onRemove={removeForm}
                      year={year} />

            {renderDropdown()}
        </div>
    );
};

export default Week;