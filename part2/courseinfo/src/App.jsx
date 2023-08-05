const Header = ({ course }) => <h1>{course}</h1>;

const Total = ({ parts }) => {
  // Solution for both 2.2 and 2.3
  const totalExercise = parts.reduce((acc, cur) => acc + cur.exercises, 0);

  return (
    <p>
      <b>Number of exercises {totalExercise}</b>
    </p>
  );
};

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const Content = ({ parts }) => {
  const coursePart = parts.map((coursePart) => (
    <Part key={coursePart.id} part={coursePart} />
  ));
  return <>{coursePart} </>;
};

const Course = (props) => {
  const { course } = props;

  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  );
};

const App = () => {
  const course = {
    id: 1,
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
        id: 1,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
        id: 2,
      },
      {
        name: "State of a component",
        exercises: 14,
        id: 3,
      },
    ],
  };

  return <Course course={course} />;
};

export default App;
