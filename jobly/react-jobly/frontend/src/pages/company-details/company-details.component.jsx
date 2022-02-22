import { useState, useEffect, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
// import SearchForm from "../common/SearchForm";
import JoblyApi from '../../api';
import JobCard from "../../components/job-card/job-card.component";
import CompanyCard from '../../components/company-card/company-card.component';
import './company-details.styles.scss';
import UserContext from '../../UserContext';
import LoadingSpinner from '../../components/loading-spinner/loading-spinner.component';

const CompanyDetails = ({ applyToJob }) => {
    const { handle } = useParams();
    const [company, setCompany] = useState({});
    const { user } = useContext(UserContext);
    const history = useHistory();

    useEffect(() => {
        if (!user) {
            history.push('/login');
        } else {
            async function getCompanyDetail() {
                let companyDetail = await JoblyApi.getCompany(handle);
                setCompany(companyDetail);
            };
            getCompanyDetail();
        };
    }, [handle, user, history]);

    if (!company) return <LoadingSpinner />;

    return (
        <div>
            <CompanyCard
                key={company.handle}
                handle={company.handle}
                name={company.name}
                description={company.description}
                logoUrl={company.logoUrl}
            />
            <hr className='h-r' />
            {company.jobs
                ? company.jobs.map((job) => (
                    <div key={job.id}>
                        <JobCard
                            id={job.id}
                            title={job.title}
                            salary={job.salary}
                            equity={job.equity}
                            applyToJob={applyToJob}
                            user={user}
                        />
                    </div>
                ))
                : null}
        </div >
    );
};

export default CompanyDetails;