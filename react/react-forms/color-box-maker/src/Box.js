
function Box({ height, width, color, removeBox }) {

    return (
        <>
            <div style={{
                height: `${height}px`,
                width: `${width}px`,
                backgroundColor: `${color}`,
                margin: `15px auto`
            }}>
            </div>
            <button onClick={removeBox}>X</button>
        </>
    );
};

export default Box;