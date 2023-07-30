import { useState } from "react";

const Button = (props) => {
  const { handleClick, text } = props;
  return <button onClick={handleClick}>{text}</button>;
};

const StatisticLine = (props) => {
  const { text, value, percentage } = props;
  return (
    <tr>
      <td>{text}</td>
      <td>
        {value} {percentage}
      </td>
    </tr>
  );
};

const Statistics = (props) => {
  const {
    goodValue,
    neutralValue,
    badValue,
    totalFeedbackValue,
    averageScoreFn,
    positiveScoreFn,
  } = props;
  if (totalFeedbackValue !== 0) {
    return (
      <>
        <h2>Statistics</h2>
        <table>
          <tbody>
            <StatisticLine text="good" value={goodValue} />
            <StatisticLine text="neutral" value={neutralValue} />
            <StatisticLine text="bad" value={badValue} />
            <StatisticLine text="all" value={totalFeedbackValue} />
            <StatisticLine text="average" value={averageScoreFn} />
            <StatisticLine
              text="positive"
              value={positiveScoreFn}
              percentage="%"
            />
          </tbody>
        </table>
      </>
    );
  } else {
    return (
      <>
        <p>No feedback given</p>
      </>
    );
  }
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
    return (
      (good * goodPoints + neutralPoints * neutralPoints + bad * badPoints) /
      totalFeedbacks
    );
  };

  const positiveScore = () => {
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
      <Statistics
        goodValue={good}
        neutralValue={neutral}
        badValue={bad}
        totalFeedbackValue={totalFeedbacks}
        averageScoreFn={averageScore()}
        positiveScoreFn={positiveScore()}
      />
    </div>
  );
};

export default App;
