import { Link, Navigate, Route, useParams } from "react-router-dom";

const Color = ({ hex, color }) => {

    if (!hex) return (<Route path='*' element={<Navigate to='/colors' />} />);
    return (
        <div className='Color' style={{ backgroundColor: hex }}>
            <p>This is {color}.</p>
            <p>Isn't it beautiful?</p>
            <p>
                <Link to='/colors'>Go back</Link>
            </p>
        </div>
    );
};

export default Color;