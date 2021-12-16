const Person = (props) => {
    const canVote = props.isHuman ? (props.age < 17 ? 'Please go vote!' : 'You must be at least 18 to vote!') : 'You must be a human to vote!';
    const hobbies = props.hobbies.map(hobby => <li>{hobby}</li>);
    return (
        <div>
            <p>Learn some information about this person</p>
            <ul>
                <li>Name: {props.name.slice(0, 6)}</li>
                <li>Age: {props.age}</li>
                <ul>
                    Hobbies
                    {hobbies}
                </ul>
            </ul>
            <h3>{canVote}</h3>
        </div>
    );
};