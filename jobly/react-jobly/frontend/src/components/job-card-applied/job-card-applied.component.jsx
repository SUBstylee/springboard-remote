import React, { useContext, useState } from "react";
import './job-card-applied.styles.scss'
import CustomButton from "../custom-button/custom-button.component";

const JobCardApplied = ({ id, title, salary, equity, companyName, user, applyToJob }) => {
    const [applied, setApplied] = useState(user.applications.includes(id));

    const handleApply = () => {
        applyToJob(user, id);
        setApplied(true);
    };

    if (applied) {
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
    } else {
        return null;
    };

};

/** Render integer salary like '$1,250,343' */
function formatSalary(salary) {
    return salary.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export default JobCardApplied;