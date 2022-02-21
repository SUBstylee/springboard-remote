import React, { useContext, useState } from "react";
import './job-card.styles.scss'
import CustomButton from "../custom-button/custom-button.component";
// import UserContext from "../auth/UserContext";

/** Show limited information about a job.
 *
 * Is rendered by JobCardList to show a "card" for each job.
 *
 * Receives apply func prop from parent, which is called on apply.
 *
 * JobCardList -> JobCard
 */

function JobCard({ id, title, salary, equity, companyName }) {
    // const { hasAppliedToJob, applyToJob } = useContext(UserContext);
    // const [applied, setApplied] = useState();

    // React.useEffect(function updateAppliedStatus() {
    //     console.debug("JobCard useEffect updateAppliedStatus", "id=", id);

    //     setApplied(hasAppliedToJob(id));
    // }, []);
    // }, [id, hasAppliedToJob]);

    /** Apply for a job */
    // async function handleApply(evt) {
    //     if (hasAppliedToJob(id)) return;
    //     applyToJob(id);
    //     setApplied(true);
    // }

    return (
        <div className="job-card">
            <h2 className="title">{title}</h2>
            <br />
            {companyName && <p className="company-title">{companyName}</p>}
            <div className="info">
                {salary && <div><small>Salary: {formatSalary(salary)}</small></div>}
                {equity && <div><small>Equity: {equity}</small></div>}
            </div>
            <div className="apply-btn">
                <CustomButton text='apply' />
            </div>
            {/* <button
                className="btn btn-danger font-weight-bold text-uppercase float-right"
                onClick={handleApply}
                disabled={applied}
            >
                {applied ? "Applied" : "Apply"}
            </button> */}
        </div>
    );
};

/** Render integer salary like '$1,250,343' */
function formatSalary(salary) {
    return salary.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export default JobCard;