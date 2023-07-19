const Header = (props)=>{
  return(
    <h1>{props.courseName}</h1>
  )
}

const Part = (props) =>{
  return (
    <>
      <p>{props.coursePart} {props.courseExercise}</p>
    </>
  )
}

const Content = (props)=>{
  return (
    <>
      <Part coursePart={props.contentPart1} courseExercise={props.contentExercises1}/>
      <Part coursePart={props.contentPart2} courseExercise={props.contentExercises2}/>
      <Part coursePart={props.contentPart3} courseExercise={props.contentExercises3}/>
    </>
  )
}

const Total = (props)=>{
  return (
    <>
      <p>Number of exercises {props.courseExercise1 + props.courseExercise2 + props.courseExercise3}</p>
    </>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header courseName={course}/>
      <Content contentPart1={part1.name} contentExercises1={part1.exercises} contentPart2={part2.name} contentExercises2={part2.exercises} contentPart3={part3.name} contentExercises3={part3.exercises} />
      <Total courseExercise1={part1.exercises} courseExercise2={part2.exercises} courseExercise3={part3.exercises}/>
    </div>
  )
}

export default App