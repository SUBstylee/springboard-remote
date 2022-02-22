import React, { useState, useEffect, useContext } from "react";
import { useHistory } from 'react-router-dom';
import SearchForm from "../../components/search-form/search-form.component";
import JoblyApi from '../../api';
import JobCard from "../../components/job-card/job-card.component";
import UserContext from "../../UserContext";
import LoadingSpinner from "../../components/loading-spinner/loading-spinner.component";
import './jobs.styles.scss'

const JobList = ({ applyToJob }) => {
    // const [isLoading, setIsLoading] = useState(true);
    const [jobs, setJobs] = useState([]);
    const history = useHistory();
    const { user } = useContext(UserContext);

    const search = async (name) => {
        let jobs = await JoblyApi.getJobs(name);
        setJobs(jobs);
    };

    useEffect(() => {
        if (!user) {
            history.push('/login');
        } else {
            search();
        }
    }, [user, history]);

    if (!jobs) return <LoadingSpinner />;

    return (
        <div className='job-list'>
            <h1>Positions Available</h1>
            <SearchForm searchFor={search} />
            {jobs.length
                ? (
                    <div className=''>
                        {jobs.map(job => (
                            <JobCard
                                key={job.id}
                                id={job.id}
                                title={job.title}
                                salary={job.salary}
                                equity={job.equity}
                                companyName={job.companyName}
                                user={user}
                                applyToJob={applyToJob}
                            />
                        ))}

                    </div>
                ) : (
                    <p className="lead">Sorry, no results were found!</p>
                )}
        </div>
    );
}

export default JobList;