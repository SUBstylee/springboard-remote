import { useParams } from "react-router-dom";
import DogDetails from "./DogDetails";

const FilterDogDetails = ({ dogs }) => {
    const { name } = useParams();

    if (name) {
        const currentDog = dogs.find(
            dog => dog.name.toLowerCase() === name.toLowerCase()
        );
        return <DogDetails dog={currentDog} />;
    };
    return null;
}

export default FilterDogDetails;