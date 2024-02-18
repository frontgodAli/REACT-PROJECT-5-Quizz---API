export default function Start(props){

    

    return(
    <div className="start-div">
        <h1>Quizzical</h1>
        <p>Some description if needed</p>
        <button className="btn" onClick={props.startQuizz}>Start Quizz</button>
    </div>)
}