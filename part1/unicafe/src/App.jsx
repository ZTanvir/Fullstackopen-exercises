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

  const clickGoodBtn = () => {
    setGood(good + 1);
  };
  const clickNeutralBtn = () => {
    setNeutral(neutral + 1);
  };
  const clickBadBtn = () => {
    setBad(bad + 1);
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
    </div>
  );
};

export default App;
