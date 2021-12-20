import { useState } from "react";
import './EightBall.css';

const EightBall = (props) => {
    let ansColor = '';
    const randAns = () => props.answers[Math.floor(Math.random() * props.answers.length)];
    const showAnswer = () => {
        const ans = randAns();
        setAns(ans);

        if (ans.color === 'green') {
            ansColor = 'EightBall-green';
            setPositive(positive + 1)
        } else if (ans.color === 'red') {
            ansColor = 'EightBall-red';
            setNegative(negative + 1);
        } else {
            ansColor = 'EightBall-yellow';
            setNeutral(neutral + 1);
        }
        setTotal(total + 1);
        setBgcolor(`EightBall-center ${ansColor}`);
        setAsking(true);
        setTimeout(() => setAsking(false), 1000);
    };
    const reset = () => {
        setAns('');
        setBgcolor('EightBall-center EightBall-black');
        setPositive(0);
        setNeutral(0);
        setNegative(0);
        setTotal(0);
    };

    const [ans, setAns] = useState('');
    const [bgcolor, setBgcolor] = useState('EightBall-center EightBall-black');
    const [positive, setPositive] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [negative, setNegative] = useState(0);
    const [total, setTotal] = useState(0);
    const [asking, setAsking] = useState(false);
    return (
        <div className="EightBall">
            <h1>Magic Eight Ball</h1>
            <h2>Concentrate on your question and ask the Eight Ball</h2>
            <div className="EightBall-tally">
                <p className="EightBall-positive">Positive: {positive}</p>
                <p className="EightBall-neutral">Neutral: {neutral}</p>
                <p className="EightBall-negative">Negative: {negative}</p>
                <p className="EightBall-total">Total: {total}</p>
            </div>
            <div className={`EightBall-ball ${asking && 'shaking'}`}>
                <div className={bgcolor}>
                    <p className="EightBall-answer">{ans.msg}</p>
                </div>
            </div>
            <button onClick={() => showAnswer()} disabled={asking}>
                {asking ? 'Thinking...' : 'What is the answer?'}
            </button>
            <button onClick={() => reset()}>Reset</button>
        </div>
    );
};

export default EightBall;