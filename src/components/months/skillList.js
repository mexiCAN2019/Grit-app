import React from 'react';
import TableMonthReview from './tableReview';
import CheckboxMonthReview from './checkboxReview';

function SkillList({ tableSkills, checkboxSkills }) {

    return (
        <div>
            {tableSkills.map(skill => {
                return <TableMonthReview skill={skill}
                                         key={skill.id} />
            })}

            <div style={{margin: "100px auto"}}>
            {checkboxSkills.map(skill => {
                return <CheckboxMonthReview skill={skill}
                                            key={skill.id} />
            })}
            </div>
        </div>
    );
};

export default SkillList;