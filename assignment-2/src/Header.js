import React from 'react';

const Header = ({ info }) => {
    return (
        <header>
            <div>
                <h1>{info.name}</h1>
                <p>{info.title}</p>
            </div>
            <ul>
                <li>Email: <a href={`mailto:${info.email}`}>{info.email}</a></li>
                <li>Web: {info.web}</li>
                <li>Mobile: {info.mobile}</li>
            </ul>
        </header>
    );
};

export default Header;
