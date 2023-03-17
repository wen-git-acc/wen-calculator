import React, { useState } from 'react';
import './App.css';
import Button from './components/Button/Button';
import Wrapper from './components/Wrapper/Wrapper';
import Screen from './components/Screen/Screen';
import ButtonBox from './components/ButtonBox/ButtonBox';
import { buttonArrangement } from './Configs/calculatorConfig';
import { valueObjType } from './Configs/typeConfigs';
import {
  numberHandler,
  operatorHandler,
  dotHandler,
  clearHandler,
  negativeTransformationHandler,
  bracketHandler,
  equalHandler,
  checkArrayEqual,
  computeCycleCheck,
} from './Handler/Handler';

function App() {
  let [valueObj, setValueObj] = useState<valueObjType>({
    numberArray: [''],
    currSign: '',
    computedValue: '',
    isComputed: false,
  });

  // 1+3*(-3+4)
  const test = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    let buttonValue: string = event.currentTarget.innerHTML;
    let newValueObj = { ...valueObj };
    newValueObj.numberArray = [...newValueObj.numberArray];
    newValueObj.currSign = buttonValue;
    // eslint-disable-next-line eqeqeq
    // numberHandler
    // operatorHandler
    // clearHandler
    // decimalHandler
    // equalHandler
    // dotHandler
    newValueObj = computeCycleCheck(newValueObj, buttonValue);
    console.log(newValueObj);
    // setValueObj(prevState => {
    //   const newState = { ...prevState };
    //   newState.numberArray.push(event.currentTarget.innerHTML);
    //   return newState;
    // });
    let newNumberArray: string[] = [];
    let totalNumber = '';
    let isCounted = false;
    if (buttonValue === 'C') {
      ({ newNumberArray, totalNumber, isCounted } = clearHandler());
    } else if (buttonValue === '+/-') {
      newNumberArray = negativeTransformationHandler(newValueObj);
    } else if (buttonValue === '( )') {
      newNumberArray = bracketHandler(newValueObj);
    } else if (buttonValue === '+' || buttonValue === '-' || buttonValue === 'x' || buttonValue === '/' || buttonValue === '%') {
      newNumberArray = operatorHandler(newValueObj);
    } else if (buttonValue === '.') {
      newNumberArray = dotHandler(newValueObj);
    } else if (buttonValue === '=') {
      ({ newNumberArray, totalNumber, isCounted } = equalHandler(newValueObj));
    } else {
      newNumberArray = numberHandler(newValueObj);
    }

    const isCurrPrevEqual: boolean = checkArrayEqual(valueObj.numberArray, newNumberArray);

    if (!isCurrPrevEqual) {
      setValueObj(prevState => {
        // newState.numberArray.push(event.currentTarget.innerHTML);
        return {
          ...prevState,
          numberArray: newNumberArray,
          currSign: buttonValue,
          computedValue: totalNumber,
          isComputed: isCounted,
        };
      });
    }
  };

  return (
    <Wrapper>
      <Screen value={valueObj.computedValue ? valueObj.computedValue : valueObj.numberArray.join(' ')} />
      <ButtonBox>
        {buttonArrangement.flat().map((value, i) => {
          // eslint-disable-next-line react/no-array-index-key
          return <Button key={i} className={value === '=' ? 'equals' : ''} value={value} onClick={test} />;
        })}
      </ButtonBox>
    </Wrapper>
  );
}

export default App;
