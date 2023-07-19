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
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header courseName={course}/>
      <Content contentPart1={part1} contentExercises1={exercises1} contentPart2={part2} contentExercises2={exercises2} contentPart3={part3} contentExercises3={exercises3} />
      <Total courseExercise1={exercises1} courseExercise2={exercises2} courseExercise3={exercises3}/>
    </div>
  )
}

export default App