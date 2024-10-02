import React from 'react';

const Skills = ({ skills }) => {
    return (
        <>
            <div className="item">
                <p className="itemTitle">Key Skills</p>
                <ul className="description skills">
                    {skills.map((skill, index) => (
                        <li key={index}>{skill}</li>
                    ))}
                </ul>
            </div>

            <hr />
        </>
    );
};

export default Skills;