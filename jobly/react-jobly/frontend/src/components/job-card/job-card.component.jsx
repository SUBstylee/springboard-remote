import React, { useContext, useState } from "react";
import './job-card.styles.scss'
import CustomButton from "../custom-button/custom-button.component";

const JobCard = ({ id, title, salary, equity, companyName, user, applyToJob }) => {
    const [applied, setApplied] = useState(user.applications.includes(id));

    const handleApply = () => {
        applyToJob(user, id);
        setApplied(true);
    };

    return (
        <div className="job-card">
            <h2 className="title">{title}</h2>
            <br />
            {companyName && <p className="company-title">{companyName}</p>}
            <div className="info">
                {salary && <div><small>Salary: {formatSalary(salary)}</small></div>}
                {equity && <div><small>Equity: {equity}</small></div>}
            </div>
            <div onClick={handleApply} className={applied ? 'disabled-btn' : 'apply-btn'} disabled={applied}>
                <CustomButton applied={applied} text={applied ? 'applied' : 'apply'} />
            </div>
        </div>
    );
};

function formatSalary(salary) {
    return salary.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export default JobCard;