import React, {useState, useEffect} from 'react';
import SkillList from './skillList';
import Express from './../../fetchExpress';
import './yearReview.css'

function YearReview ({match: {params: { year }}}) {
    const [tableSkills, setTableSkills] = useState([]);
    const [checkboxSkills, setCheckboxSkilss] = useState([]);
    const [subjective, setSubjective] = useState({});
    const [text, setText] = useState('');

    useEffect(() => {
        Express.getYearTableSkills(year).then(tables => setTableSkills(tables));
        Express.getYearCheckboxSkills(year).then(checkboxes => setCheckboxSkilss(checkboxes));
        Express.getYearReviewSubjective(year).then(textbox => setSubjective(textbox));
    }, []);



    const handleSave = () => {
        const newTextbox = {
            skillName: 'Year Review',
            text: text,
            yearFK: year
        };

        Express.createYearReviewSubjective(year, newTextbox).then(textBox => Express.getYearReviewSubjective(year).then(textbox => setSubjective(textbox)));
    };

    const renderSaveOrUpdateButtonTextarea = () => {
        if(!subjective){
            return <div>
                    <textarea placeholder="Add comments" onChange={(e) => setText(e.target.value)} value={text} />
                    <br></br>
                    <button onClick={handleSave}>Save</button>
                </div>
        }
        const updatedTextbox = {
            id: subjective.id,
            text: text
        };
        return <div>
                <textarea placeholder="Add comments" onChange={(e) => setText(e.target.value)} defaultValue={subjective.text} value={text} />
                <br></br>
                <button onClick={() => Express.updateYearReviewSubjective(year, updatedTextbox)}>Update</button>
            </div> 
        
    };

    return (
        <div className="year-review">
            <h1>Year Review</h1>
            <div className="list">
                <SkillList tableSkills={tableSkills} 
                           checkboxSkills={checkboxSkills} /> 
            </div>
            
            <div className="subjective">
                <h3 style={{backgroundColor: "royalblue"}}>Thoughts/Notes</h3>
                {renderSaveOrUpdateButtonTextarea()}
            </div>

        </div>
    );
};

export default YearReview;