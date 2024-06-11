import { createContext, useState } from "react";
import run from "../config/gemini";
export const Context = createContext();

const ContextProvider = (props) => {
  //to save the input data
  const [input, setInput] = useState("");
  // on clicking ther save button the input datas will saved in this rescent prompt
  const [recentPrompt, setRecentPropmt] = useState("");
  // to store all the input history and show it in the recent tab

  const [prevPrompts, setPrevPrompts] = useState([]);
  // if true use to hide the display and show the output display
  const [showResult, setShowResult] = useState(false);
  // if this true it will display the loading animation
  const [loading, setLoading] = useState(false);
  // use to display or result on the wab page
  const [resultData, setResultData] = useState("");

  // typing effect function
  const delayPara = (index, nextWord) => {
    setTimeout(function () {
      setResultData((prev) => prev + nextWord);
    }, 75 * index);
  };
  const newChat = () => {
    setLoading(false);
    setShowResult(false);
  };

  // function usede to change the different states from the function
  const onSent = async (prompt) => {
    setResultData("");
    setLoading(true);
    setShowResult(true);
    let response;
    if (prompt !== undefined) {
      response = await run(prompt);
      setRecentPropmt(prompt);
    } else {
      setPrevPrompts((prev) => [...prev, input]);
      setRecentPropmt(input);
      response = await run(input);
    }
    // setRecentPropmt(input);
    // // adding previous prompts into new one
    // setPrevPrompts(prev => [...prev,input]);
    try {
      let responseArray = response.split("**");
      // if we dont decleare newResponse the empty  string in the response it will give you the undefined brfore showing the response
      let newResponse = "";
      // this loops checks the whole response text and find the ** if ther is ont it makes the content in the ** bold represnt inportant text
      for (let i = 0; i < responseArray.length; i++) {
        if (i === 0 || i % 2 !== 1) {
          newResponse += responseArray[i];
        } else {
          newResponse += "<b>" + responseArray[i] + "</b>";
        }
      }
      let newResponse2 = newResponse.split("*").join("</br>");
      let newResponseArray = newResponse2.split(" ");
      for (let i = 0; i < newResponseArray.length; i++) {
        console.log("checking 1:", newResponseArray);
        const nextWord = newResponseArray[i];
        // checking for errors
        console.log("checking :", nextWord);
        delayPara(i, nextWord + " ");
      }
    } catch (error) {
      console.error("Error fetching response:", error); // Error handling
    }
    setLoading(false);
    setInput("");
  };

  // passing state variables and seter functions in the context value so that we can acces this value in main component and side bar
  const contextValue = {
    prevPrompts,
    setPrevPrompts,
    onSent,
    setRecentPropmt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    newChat
  };
  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};
export default ContextProvider;
