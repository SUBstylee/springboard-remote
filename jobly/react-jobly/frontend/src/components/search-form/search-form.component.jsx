import { useState } from "react";
import './search-form.styles.scss';
import CustomButton from "../custom-button/custom-button.component";
import FormInput from "../form-input/form-input.component";

const SearchForm = ({ searchFor }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        searchFor(searchTerm.trim() || undefined);
        setSearchTerm(searchTerm.trim());
    };

    const handleChange = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <div className="search-form">
            <form onSubmit={handleSubmit}>
                <FormInput name='searchTerm' type='search' autoComplete='search' label='Enter a search term...' required
                    value={searchTerm} onChange={handleChange}
                />
                <CustomButton text='search' type='submit' />
            </form>
        </div>
    );
};

export default SearchForm;