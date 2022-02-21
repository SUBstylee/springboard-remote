import React from "react";
import MenuItem from "../menu-item/menu-item.component";
import './directory.styles.scss';
import companies from '../../assets/directory/companies.png';
import jobs from '../../assets/directory/jobs.png';
import applied from '../../assets/directory/applied.png';
import profile from '../../assets/directory/profile.png';
import logout from '../../assets/directory/logout.png';

class Directory extends React.Component {
    constructor() {
        super();
        this.state = {
            sections: [
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
                    imageUrl: logout,
                    id: 5,
                    linkUrl: 'logout'
                }
            ]
        };
    };

    render() {
        return (
            <div className="directory-menu">
                {
                    this.state.sections.map(({ id, ...otherSectionProps }) => (
                        <MenuItem key={id} {...otherSectionProps} />
                    ))
                }
            </div>
        );
    }
};

export default Directory;