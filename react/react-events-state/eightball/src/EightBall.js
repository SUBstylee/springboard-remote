import { useState } from "react";
import './EightBall.css';

const EightBall = (props) => {
    let ansColor = '';
    const randAns = () => props.answers[Math.floor(Math.random() * props.answers.length)];
    const showAnswer = () => {
        const ans = randAns();
        setAns(ans);
        ans.color === 'green' ? ansColor = 'green' : (ans.color === 'red' ? ansColor = 'red' : ansColor = 'yellow');
        console.log(ansColor);
    };

    const [ans, setAns] = useState(randAns());
    return (
        <div className="EightBall">
            <h1>Magic Eight Ball</h1>
            <h2>Concentrate on your question and ask the Eight Ball</h2>
            {/* <div className="EightBall-tally">
                <ul>
                    <li id={1}>Positive: </li>
                    <li id={2}>Neutral: </li>
                    <li id={3}>Negative: </li>
                </ul>
            </div> */}
            <div className="EightBall-ball">
                <p className="EightBall-answer">{ans.msg}</p>
            </div>
            <button onClick={() => showAnswer()}>What is the answer?</button>
            {/* <button>Reset</button> */}
        </div>
    );
};

export default EightBall;