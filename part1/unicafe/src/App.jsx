import { useState } from "react";

const Button = (props) => {
  const { handleClick, text } = props;
  return <button onClick={handleClick}>{text}</button>;
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [totalFeedbacks, setTotalFeedbacks] = useState(0);

  const averageScore = () => {
    // good 1,neutral 0,bad -1
    const goodPoints = 1;
    const neutralPoints = 0;
    const badPoints = -1;
    if (totalFeedbacks === 0) {
      return "";
    }
    return (
      (good * goodPoints + neutralPoints * neutralPoints + bad * badPoints) /
      totalFeedbacks
    );
  };

  const positiveScore = () => {
    if (totalFeedbacks === 0) {
      return "";
    }
    return good / totalFeedbacks;
  };

  const clickGoodBtn = () => {
    setGood(good + 1);
    // total feedback
    let addOne = 1;
    setTotalFeedbacks(good + neutral + bad + addOne);
  };
  const clickNeutralBtn = () => {
    setNeutral(neutral + 1);
    // total feedback
    let addOne = 1;
    setTotalFeedbacks(good + neutral + bad + addOne);
  };
  const clickBadBtn = () => {
    setBad(bad + 1);
    // total feedback
    let addOne = 1;
    setTotalFeedbacks(good + neutral + bad + addOne);
  };

  return (
    <div>
      <h1>Give feedback</h1>
      <Button handleClick={clickGoodBtn} text="good" />
      <Button handleClick={clickNeutralBtn} text="neutral" />
      <Button handleClick={clickBadBtn} text="bad" />
      <h2>Statistics</h2>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {totalFeedbacks}</p>
      <p>average {averageScore()}</p>
      <p>positive {positiveScore()} %</p>
    </div>
  );
};

export default App;
