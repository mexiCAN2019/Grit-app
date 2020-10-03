import React, { useState } from 'react';
import Express from './../../fetchExpress';
import './textBox.css';

const TextBox = ({ activity, onRemove }) => {
    const [text, setText] = useState(activity.text);
    const [skillName, setSkillName] = useState(activity.skillName);


    const handleDelete = () => {
        Express.deleteSubjective(activity.year, activity.id);
        onRemove('subjective', activity);
    };

    const handleSaveChanges = () => {
        const updatedTextbox = {
            text: text,
            skillName: skillName.toUpperCase(), 
            id: activity.id
        };
        Express.updateSubjective(activity.year, updatedTextbox)
    };

    return (
        <div className="textContainer">
            <input className="skillName" type="text" defaultValue={skillName} onChange={(e) => setSkillName(e.target.value)}></input>
            <button onClick={handleDelete}>Delete</button>
            <button onClick={handleSaveChanges}>Save Changes</button>
            <br></br>
            <textarea className="textarea" onChange={(e) => setText(e.target.value)}>{text}</textarea>
        </div>
    );
};

export default TextBox;