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
  const part = [
    {
    name: 'Fundamentals of React',
    exercises: 10
  },
  {
    name: 'Using props to pass data',
    exercises: 7
  },
  {
    name: 'State of a component',
    exercises: 14
  }
]
  return (
    <div>
      <Header courseName={course}/>
      <Content contentPart1={part[0].name} contentExercises1={part[0].exercises} contentPart2={part[1].name} contentExercises2={part[1].exercises} contentPart3={part[2].name} contentExercises3={part[2].exercises} />
      <Total courseExercise1={part[0].exercises} courseExercise2={part[1].exercises} courseExercise3={part[2].exercises}/>
    </div>
  )
}

export default App