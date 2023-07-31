import { useState } from "react";

const Button = (props) => {
  const { handleClick, text } = props;
  return <button onClick={handleClick}>{text}</button>;
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  // solution of most votes using object
  const [points, setPoints] = useState({
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
  });

  // solution of most votes using array
  // const [points, setPoints] = useState(Array(anecdotes.length).fill(0));

  const generateRandomNumber = (max) => {
    return Math.floor(Math.random() * max);
  };
  const mostVotedAnecdotes = () => {
    let highestValue = 0;
    let highestValueIndex = null;
    // for Array
    // for (let point of points) {
    //   if (point > highestValue) {
    //     highestValue = point;
    //   }
    // }
    // return points.indexOf(highestValue);
    // For object
    for (let point in points) {
      if (points[point] > highestValue) {
        highestValue = points[point];
        highestValueIndex = point;
      }
    }
    return Number(highestValueIndex);
  };

  const clickNextAnecdote = () => {
    setSelected(generateRandomNumber(anecdotes.length));
  };
  const clickVoteAnecdote = () => {
    // update object
    let copyPoints = { ...points };
    copyPoints[selected] += 1;
    setPoints({ ...copyPoints });
    // update array
    // const copyPoints = [...points];
    // copyPoints[selected] += 1;
    // setPoints(copyPoints);
  };

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {points[selected]} votes</p>
      <Button handleClick={clickVoteAnecdote} text="vote" />
      <Button handleClick={clickNextAnecdote} text="next anecdote" />
      <h2>Anecdote with most votes</h2>
      <p>{anecdotes[mostVotedAnecdotes()]}</p>
      <p>has {points[mostVotedAnecdotes()]} votes</p>
    </div>
  );
};
export default App;
