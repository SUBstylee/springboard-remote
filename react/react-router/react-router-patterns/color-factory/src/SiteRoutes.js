import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useParams } from 'react-router-dom';
import ColorList from './ColorList';
import Color from './Color';
import NewColorForm from './NewColorForm';

const SiteRoutes = () => {
    const allColors = JSON.parse(localStorage.getItem('colors')) || { red: "#ff0000", green: "#00ff00", blue: "#0000ff" };
    const [colors, setColors] = useState(allColors);

    useEffect(
        () => localStorage.setItem("colors", JSON.stringify(colors)),
        [colors]
    );

    function handleAdd(newColorObj) {
        setColors(prevColors => ({ ...prevColors, ...newColorObj }));
    }

    function currentColor(props) {
        const { color } = props.match.params;
        const hex = colors[color];
        return <Color {...props} hex={hex} color={color} />;
    };

    useEffect(() => localStorage.setItem("colors", JSON.stringify(colors)), [colors]);
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/colors' element={<ColorList colors={colors} />} />
                <Route path='/colors/new' element={<NewColorForm addColor={handleAdd} />} />
                <Route path='/colors/:color' component={currentColor} />
                <Route path='*' element={<Navigate to='/colors' />} />
            </Routes>
        </BrowserRouter>
    );
};

export default SiteRoutes;