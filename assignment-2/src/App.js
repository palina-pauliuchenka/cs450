import './App.css';

import React from 'react';
import './App.css';
import Header from './Header';
import PersonalProfile from './PersonalProfile';
import WorkExperience from './WorkExperience';
import Skills from './Skills';
import Education from './Education';

const App = () => {
    const personalInfo = {
        name: "Zh Rimel",
        title: "Data Scientist",
        email: "abc@gmail.com",
        web: "abc.github.io/abc",
        mobile: "01234567890"
    };

    const personalProfile = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

    const workExperience = [
        {
            title: "Job Title at Company",
            duration: "August 2022 – December 2023",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        },
        {
            title: "Job Title 2 at Company 2",
            duration: "August 2020 – December 2021",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        }
    ];

    const skills = [
        "A Key skill",
        "A Key skill",
        "A Key skill",
        "A Key skill",
        "A Key skill",
        "A Key skill",
        "A Key skill",
        "A Key skill",
        "A Key skill"
    ];

    const education = [
        {
            institution: "New Jersey Institute of Technology",
            degree: "BS in Computer Science",
            duration: "2018 - 2022",
            gpa: "3.9"
        },
        {
            institution: "New Jersey Institute of Technology",
            degree: "MS in Data Science",
            duration: "2022 - 2023",
            gpa: "4.0"
        }
    ];

    return (
        <section className="wrap">
            <Header info={personalInfo} />
            <div className="resume">
                <PersonalProfile profile={personalProfile} />
                <WorkExperience experiences={workExperience} />
                <Skills skills={skills} />
                <Education education={education} />
            </div>
        </section>
    );
};

export default App;
