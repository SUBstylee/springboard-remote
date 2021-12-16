const App = () => {
    return (
        <div>
            <Tweet
                username='Bob12'
                name='Bob Dobbs'
                date={new Date().toDateString()}
                tweet='This is my first tweet!'
            />
            <Tweet
                username='jtheguy'
                name='Jason Butler'
                date={new Date().toDateString()}
                tweet='One day they will find the answer.'
            />
            <Tweet
                username='applepie555'
                name='Lisa Monroe'
                date={new Date().toDateString()}
                tweet='Oh no, I burned my apple pie!'
            />
        </div>
    );
};