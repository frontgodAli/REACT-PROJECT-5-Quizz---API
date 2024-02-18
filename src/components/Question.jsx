import he from 'he'




export default function Question({question,choices,holdChoice,selectedChoice,questionIndex,correct,isCheckAnswer}){


    
    const choicesElements=choices.map(choice=>{
        
        return <div
                    key={choice} 
                    className="choice"
                    onClick={isCheckAnswer?null:()=>holdChoice(questionIndex,selectedChoice===choice?null:choice)}
                    style={(isCheckAnswer && selectedChoice===choice) ?
                        {backgroundColor:choice===correct ? "#94D7A2":"#F8BCBC"}:
                        {backgroundColor:selectedChoice===choice?"#D6DBF5" : "transparent"}
                    }
                    >
                        {he.decode(choice)}
                    </div>
        })

    return (
        <>
            <h2 className="question">{he.decode(question)}</h2>
            <div className="choices">
                {choicesElements}
            </div>
            
        </>
    )
}