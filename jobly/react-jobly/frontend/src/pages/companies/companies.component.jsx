import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
// import SearchForm from "../common/SearchForm";
import JoblyApi from '../../api';
import CompanyCard from '../../components/company-card/company-card.component';
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

function CompanyList() {
    const [isLoading, setIsLoading] = useState(true);
    const [companies, setCompanies] = useState([]);
    const history = useHistory();

    async function getCompanies(searchTerm) {
        let allCompanies = await JoblyApi.getCompanies(searchTerm);
        setCompanies(allCompanies);
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
        getCompanies();
    }, []);
    // }, [user, history]);

    // // if (!companies) return <LoadingSpinner />;

    return (
        <div className="CompanyList col-md-8 offset-md-2">
            {/* <SearchForm searchFor={search} /> */}
            {companies.length
                ? (
                    <div className="CompanyList-list">
                        {companies.map(c => (
                            <CompanyCard
                                key={c.handle}
                                handle={c.handle}
                                name={c.name}
                                description={c.description}
                                logoUrl={c.logoUrl}
                            />
                        ))}
                    </div>
                ) : (
                    <p className="lead">Sorry, no results were found!</p>
                )}
        </div>
    );
}

export default CompanyList;