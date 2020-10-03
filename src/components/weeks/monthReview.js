import React, {useState, useEffect} from 'react';
import SkillList from './skillList';
import Express from './../../fetchExpress';
import './monthReview.css';

function MonthReview ({match:{params: {monthAndMonthId, year}}}) {
    const [monthId, setMonthId] = useState(monthAndMonthId.replace(/^\D+/g, ''));
    const [tableSkills, setTableSkills] = useState([]);
    const [checkboxSkills, setCheckboxSkilss] = useState([]);
    const [subjective, setSubjective] = useState({});
    const [text, setText] = useState('');

    useEffect(() => {
        Express.getTableSkills(year, monthId).then(tables => setTableSkills(tables));
        Express.getCheckboxSkills(year, monthId).then(checkboxes => setCheckboxSkilss(checkboxes));
        Express.getMonthReviewSubjective(year, monthId).then(textbox => setSubjective(textbox));
    }, []);

  

    const handleSave = () => {
        const newTextbox = {
            skillName: 'Month Review',
            text: text,
            monthId: monthId
        };

        Express.createMonthReviewSubjective(year, newTextbox).then(textBox => Express.getMonthReviewSubjective(year, monthId).then(textbox => setSubjective(textbox)));
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
                <button onClick={() => Express.updateReviewSubjective(year, updatedTextbox)}>Update</button>
            </div> 
        
    };

    return (
        <div className="month-review">
            <h1>Month Review</h1>
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

export default MonthReview;