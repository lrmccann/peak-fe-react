import React, { useRef, useEffect, useState } from "react";




export default function TopicBtn (props) {
    // const allTopicsArr = props.arrForComp;
    // const [arrToFillWithClick, setArrToFillWithClick] = useState([]);
    // const [recentlySelectedWork, setRecentlySelectedWord] = useState("");
    // const [matchState, setMatchState] = useState(null);
    // const [color, setColor] = useState('white');
    // const [arrToCheck, setArrToCheck] = useState();

// useEffect(() => {
//     // console.log(recentlySelectedWork, "recently selected")
//     // console.log(arrToCheck, "arr to check")
//     console.log(arrToFillWithClick, "arry to fill")
//     console.log(matchState)
//     allTopicsArr.map((index) => {
//     if(index === recentlySelectedWork){
//         return setColor('green');
//     }else{
//         if(matchState === null){
//             return;
//         }else if(matchState === true){
//             return setColor('green');
//         }else if(matchState === false){
//             return setColor('white');
//         }
//     }
//     })
//     setMatchState(null);
// }, [matchState])

    // const idk = e => {
    //     setRecentlySelectedWord(e);
    //     if(arrToFillWithClick.length === 0){
    //         arrToFillWithClick.push(e);
    //         return setMatchState(null);
    //     }else if(arrToFillWithClick.length !== 0){
    //     arrToFillWithClick.map((index) => {
    //         if(e === index){
    //             console.log(e, index, "words matched")
    //             const removeItem = arrToFillWithClick.indexOf(e);
    //             arrToFillWithClick.splice(removeItem, 1);
    //             setRecentlySelectedWord(e);
    //             return setMatchState(false);
    //         }else{
    //             console.log("didnt match")
    //             arrToFillWithClick.push(e);
    //             setRecentlySelectedWord(e);
    //             return setMatchState(true);
    //         }
    //     })
    // }
    // //  return setMatchState(null);
    // }

    const allTopicsArr = props.arrForComp;
    const [choiceOne, setChoiceOne] = useState(null);
    const [choiceTwo, setChoiceTwo] = useState(null);
    const [choiceThree, setChoiceThree] = useState(null);
    const [choiceFour, setChoiceFour] = useState(null);
    const [choiceFive, setChoiceFive] = useState(null);

    // const [borderColor, setBorderColor] = useState('blue');

    const [colorState , setColorState] = useState('');


    const idk = e => {
        console.log(e)
        if (choiceOne === null){
            console.log('choice one')
            return setChoiceOne(e);
        }else if(choiceOne !== null && choiceTwo === null){
            console.log('choice two')
            return setChoiceTwo(e);
        }else if(choiceOne !== null && choiceTwo !== null && choiceThree === null){
            console.log('choice three')
            return setChoiceThree(e);
        }else if(choiceOne !== null && choiceTwo !== null && choiceThree !== null && choiceFour === null){
            console.log('choice four')
            return setChoiceFour(e);
        }else if(choiceOne !== null && choiceTwo !== null && choiceThree !== null && choiceFour !== null){
            console.log('choice five')
            return setChoiceFive(e);
        }else{
            return setChoiceFive(null);
        }
    }

    const [clicked , setClicked] = useState(false);

    useEffect(() => {
        let topicArr = [choiceOne, choiceTwo , choiceThree, choiceFour, choiceFive];
        topicArr.map((topic) => {
        if (topic === null){
            console.log('color one')
            // return setChoiceOne(e);
        }else if(topic !== null && choiceTwo === null){
            console.log('color two')
            // return setChoiceTwo(e);
        }else if(topic !== null && choiceTwo !== null && choiceThree === null){
            console.log('color three')
            // return setChoiceThree(e);
        }else if(topic !== null && choiceTwo !== null && choiceThree !== null && choiceFour === null){
            console.log('color four')
            // return setChoiceFour(e);
        }else if(topic !== null && choiceTwo !== null && choiceThree !== null && choiceFour !== null){
            console.log('color five')
            // return setChoiceFive(e);
        }else{
            return setChoiceFive(null);
        }
    })
    },[choiceFive, choiceFour, choiceOne, choiceThree, choiceTwo])

    const topicObj = {
        choiceOne : choiceOne,
        choiceTwo : choiceTwo,
        choiceThree : choiceThree,
        choiceFour : choiceFour,
        choiceFive : choiceFive,
    }


    const handleSelect = e => {
        console.log(topicObj)

        console.log(e, "key")


        // console.log(borderColor)
        // e.preventDefault();
        // let newBorderColor = borderColor ===  'red'  ? 'black' : 'pink';
        // setBorderColor(newBorderColor);
    }


    const topicsToSend = e => {
        if(choiceOne === null || choiceTwo === null || choiceThree === null || choiceFour === null || setChoiceFive === null){
            alert("Please Select all topics");
        }else{
            // e.preventDefault();
            props.recieveTopicsFromChild(topicObj);
        }
    }

    return(
        <div>
            {allTopicsArr.map((index, myKey) => (
            <button 
            style={{backgroundColor : colorState === 'pink' ? 'gold' : 'pink'}}
            // className={index === choiceOne ? 'hello' : 'bye' } 
            // style={{
                // borderColor: ( choiceOne  !== index || choiceTwo !== index || choiceThree !== index || choiceFour !== index || choiceFive !== index ? borderColor : 'red' ),
                // color: ( choiceOne  === index || choiceTwo === index || choiceThree === index || choiceFour === index || choiceFive === index ? color : color ),
            // }}
            // onClick={(e) => idk(e.target.id)}
            onClick={(e) =>handleSelect(e.target.id)}
            id={index}
            key={myKey}
             >
              <p>{index}</p>
                  </button>
            ))}
            <button onClick={topicsToSend}></button>
          </div>
    )
}