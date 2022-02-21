import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
// import SearchForm from "../common/SearchForm";
import JoblyApi from '../../api';
import JobCard from "../../components/job-card/job-card.component";
// import LoadingSpinner from "../common/LoadingSpinner";

/** Show page with list of companies.
 *
 * On mount, loads companies from API.
 * Re-loads filtered companies on submit from search form.
 *
 * This is routed to at /companies
 *
 * Routes -> { CompanyCard, SearchForm }
 */

const JobList = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [jobs, setJobs] = useState([]);
    const history = useHistory();

    async function getJobs(searchTerm) {
        let allJobs = await JoblyApi.getJobs(searchTerm);
        setJobs(allJobs);
        setIsLoading(false);
    }

    // useEffect(function getCompaniesOnMount() {
    //     console.debug("CompanyList useEffect getCompaniesOnMount");
    //     search();
    // }, []);

    /** Triggered by search form submit; reloads companies. */
    // async function search(name) {
    //     let companies = await JoblyApi.getCompanies(name);
    //     setCompanies(companies);
    // }
    useEffect(() => {
        // if (!user) {
        //     history.push('/login');
        // }

        // Load companies from database and set global state for each array
        getJobs();
    }, []);
    // }, [user, history]);

    // // if (!companies) return <LoadingSpinner />;

    return (
        <div className=''>
            {/* <SearchForm searchFor={search} /> */}
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