import React from 'react';

const WorkExperience = ({ experiences }) => {
    return (
        <>
            <div className="item">
                <p className="itemTitle">Work Experience</p>
                <div className="advanced">
                    {experiences.map((job, index) => (
                        <p key={index} className="description">
                            <span className="subTitle">{job.title} ({job.duration})</span>
                            {job.description}
                        </p>
                    ))}
                </div>
            </div>
            
            <hr />
        </>
        
    );
};

export default WorkExperience;