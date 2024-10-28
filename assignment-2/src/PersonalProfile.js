import React from 'react';

const PersonalProfile = ({ profile }) => {
    return (
        <>
            <div className="item">
                <p className="itemTitle">Personal Profile</p>
                <p className="description">{profile}</p>
            </div>
            <hr />
        </>
    );
};

export default PersonalProfile;