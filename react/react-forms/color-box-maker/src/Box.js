
function Box({ height, width, color }) {

    return (
        <>
            <div style={{
                height: `${height}em`,
                width: `${width}em`,
                backgroundColor: `${color}`
            }}>
            </div>
            <button>X</button>
        </>
    );
};

export default Box;