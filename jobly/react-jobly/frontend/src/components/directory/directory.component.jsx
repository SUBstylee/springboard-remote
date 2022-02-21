import React from "react";
import MenuItem from "../menu-item/menu-item.component";
import './directory.styles.scss';
import companies from '../../assets/directory/companies.png';
import jobs from '../../assets/directory/jobs.png';
import applied from '../../assets/directory/applied.png';
import profile from '../../assets/directory/profile.png';
import logOut from '../../assets/directory/logout.png';

const Directory = ({ logout }) => {
    const sections = [
        {
            title: 'companies',
            imageUrl: companies,
            size: 'large',
            id: 1,
            linkUrl: 'companies'
        },
        {
            title: 'jobs',
            imageUrl: jobs,
            size: 'large',
            id: 2,
            linkUrl: 'jobs'
        },
        {
            title: 'applications',
            imageUrl: applied,
            size: 'large',
            id: 3,
            linkUrl: 'applications'
        },
        {
            title: 'profile',
            imageUrl: profile,
            id: 4,
            linkUrl: 'profile'
        },
        {
            title: 'logout',
            imageUrl: logOut,
            id: 5,
            linkUrl: 'logout'
        }
    ];

    return (
        <div className="directory-menu">
            {
                sections.map(({ id, ...otherSectionProps }) => (
                    <MenuItem key={id} {...otherSectionProps} logout={logout} />
                ))
            }
        </div>
    );
};


export default Directory;