import React from "react";
import { Link } from "react-router-dom";

import "./company-card.styles.scss";

const CompanyCard = ({ name, description, logoUrl, handle }) => {
    return (
        <div className="company-card">
            <Link className='' to={`/companies/${handle}`}>

                <div className="heading">
                    <h2 className="title">
                        {name}
                    </h2>
                    <span className="logo">
                        {logoUrl && <img src={logoUrl}
                            alt={name}
                            className='logo' />}
                    </span>
                </div>
                <p>{description}</p>
            </Link>
        </div>
    );
}

export default CompanyCard;