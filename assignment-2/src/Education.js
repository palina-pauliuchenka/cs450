import React from 'react';

const Education = ({ education }) => {
    return (
        <div className="item">
            <p className="itemTitle">Education</p>
            <div className="advanced">
                {education.map((edu, index) => (
                    <p key={index} className="description">
                        <span className="subTitle">{edu.institution}</span>
                        {edu.degree} <br />
                        {edu.duration} <br />
                        GPA: {edu.gpa} <br />
                    </p>
                ))}
            </div>
        </div>
    );
};

export default Education;