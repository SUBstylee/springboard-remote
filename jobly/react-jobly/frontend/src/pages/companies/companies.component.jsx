import React, { useState, useEffect, useContext } from "react";
import { useHistory } from 'react-router-dom';
// import SearchForm from "../common/SearchForm";
import JoblyApi from '../../api';
import CompanyCard from '../../components/company-card/company-card.component';
import UserContext from "../../UserContext";
import LoadingSpinner from '../../components/loading-spinner/loading-spinner.component';
import SearchForm from "../../components/search-form/search-form.component";
import './companies.styles.scss'

/** Show page with list of companies.
 *
 * On mount, loads companies from API.
 * Re-loads filtered companies on submit from search form.
 *
 * This is routed to at /companies
 *
 * Routes -> { CompanyCard, SearchForm }
 */

const CompanyList = () => {
    const [companies, setCompanies] = useState([]);
    const history = useHistory();
    const { user } = useContext(UserContext);

    const search = async (name) => {
        let companies = await JoblyApi.getCompanies(name);
        setCompanies(companies);
    };

    useEffect(() => {
        if (!user) {
            history.push('/login');
        } else {
            search();
        }
    }, [user, history]);

    if (!companies) return <LoadingSpinner />;

    return (
        <div className="company-list col-md-8 offset-md-2">
            <h1>Hiring Companies</h1>
            <SearchForm searchFor={search} />
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