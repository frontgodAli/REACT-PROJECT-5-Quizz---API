import { useEffect, useState } from 'react'
import Start from './components/Start'
import Question from './components/Question'
import './index.css'

function App() {
  
  const [starter,setStarter]=useState(false) 
  const [quizz,setQuizz]=useState([])
  const [isCheckAnswer,setIsCheckAnswer]=useState(false)
  const [count,setCount]=useState(0)
  

  async function fetchQuizz(){
    try{
      const res = await fetch("https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple")
      if(!res.ok){
        throw new Error("failed to fetch data")
      }
      const data = await res.json()
    
      setQuizz(data.results.map(qst =>{
        return{
          question:qst.question,
          correct:qst.correct_answer,
          choices:shuffleArrayOfChoices([...qst.incorrect_answers,qst.correct_answer]),
          selectedChoice:null
        }
      }))

    }catch(err){
      console.error(err)
    }
  }
  useEffect(()=>{
    

    fetchQuizz()

  },[])


  function checkAnswers(){
    
    quizz.forEach(question=>{
      if(question.correct===question.selectedChoice){
        setCount(prev=>prev+1)
      }

    setIsCheckAnswer(true)  
    })
  }

  function startQuizz(){
    setStarter(true)
  }

  function shuffleArrayOfChoices(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function holdChoice(questionIndex,choice){
    setQuizz(oldQuizz=>{
      const newQuizz=[...oldQuizz]
      newQuizz[questionIndex].selectedChoice=choice
      return newQuizz
    })
  }

  const quizzElements=quizz.map((question,index) => (
    <Question 
      key={index} 
      questionIndex={index}
      selectedChoice={question.selectedChoice}
      holdChoice={holdChoice}
      choices={question.choices} 
      question={question.question} 
      correct={question.correct}
      isCheckAnswer={isCheckAnswer}

    />))


  function reset(){
    setStarter(false)
    setIsCheckAnswer(false);
    setCount(0);
    fetchQuizz();

  }

  return(
      <main>
        {starter ? quizz.length>0 && quizzElements  : <Start startQuizz={startQuizz} /> }

        {starter && quizz && 
          <div className='footer-container'>
            {isCheckAnswer&&
              <p className='score'>
                {`You scored ${count}/5 correct answers`}
              </p>}
              <button onClick={isCheckAnswer? reset:checkAnswers}  className='check btn'>
                {isCheckAnswer?"Play again":"Check answers"}
              </button>
          </div>}
      </main>)
}

export default App
