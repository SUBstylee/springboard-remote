import { useState, useEffect } from "react";
import axios from "axios";

const useFlip = (initialState = true) => {
    const [flipped, setFlipped] = useState(initialState);
    const flip = () => setFlipped(flipped => !flipped);
    return [flipped, flip];
};

const useAxios = (key, url) => {
    const [responses, setResponses] = useLocalStorage(key);
    const addResponses = async (formatter = data => data, urlEnd = "") => {
        const response = await axios.get(`${url}${urlEnd}`);
        setResponses(data => [...data, formatter(response.data)]);
    };
    const clearResponses = () => setResponses([]);
    return [responses, addResponses, clearResponses];
};

const useLocalStorage = (key, initialValue = []) => {
    if (localStorage.getItem(key)) {
        initialValue = JSON.parse(localStorage.getItem(key));
    };
    const [value, setValue] = useState(initialValue);
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [value, key]);
    return [value, setValue];
};
export { useFlip, useAxios, useLocalStorage };