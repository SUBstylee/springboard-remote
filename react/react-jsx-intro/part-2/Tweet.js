const Tweet = (props) => {
    return (
        <div className='tweet'>
            <span className='info'>@{props.username}</span>
            <span className='info'>{props.name}</span>
            <span className='info'>{props.date}</span>
            <p>{props.tweet}</p>
        </div>
    );
};