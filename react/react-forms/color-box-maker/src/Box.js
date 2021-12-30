
function Box({ height, width, color, removeBox }) {

    return (
        <>
            <div style={{
                height: `${height}px`,
                width: `${width}px`,
                backgroundColor: `${color}`
            }}>
            </div>
            <button onClick={removeBox}>X</button>
        </>
    );
};

export default Box;