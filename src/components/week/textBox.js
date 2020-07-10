import React, { useState } from 'react';
import Express from './../../fetchExpress';

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
        <div>
            <input type="text" defaultValue={skillName} onChange={(e) => setSkillName(e.target.value)}></input>
            <textarea onChange={(e) => setText(e.target.value)}>{text}</textarea>
            <br></br>
            <button onClick={handleDelete}>Delete</button>
            <button onClick={handleSaveChanges}>Save Changes</button>
        </div>
    );
};

export default TextBox;