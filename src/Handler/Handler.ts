import { evaluate } from 'mathjs';
import { valueObjType } from '../Configs/typeConfigs';
import { NumberArrType, OperatorArrType, operatorArr, DotArrType, BracketCountType } from './handlerConfigs';

export function numberHandler({ numberArray, currSign }: valueObjType): string[] {
  const numberToBeAdded: NumberArrType = currSign as NumberArrType;
  const arrLastElement: string = numberArray.pop() as string;
  // Check last element status
  let isNumber = Number(arrLastElement);
  if (Number.isNaN(isNumber)) {
    if (arrLastElement === ')') {
      numberArray.push(arrLastElement);
      numberArray.push('x');
    } else {
      numberArray.push(arrLastElement);
    }
    numberArray.push(numberToBeAdded);
  } else {
    numberArray.push(arrLastElement + numberToBeAdded);
  }
  return numberArray;
}

export function operatorHandler({ numberArray, currSign }: valueObjType): string[] {
  const operatorToBeAdded: OperatorArrType = currSign as OperatorArrType;
  const arrLastElement: string = numberArray.pop() as string;
  const isOperatorType: boolean = (operatorArr as ReadonlyArray<string>).includes(arrLastElement);
  numberArray.push(arrLastElement);

  if (!arrLastElement) {
    return numberArray;
  }
  if (isOperatorType) {
    return numberArray;
  }

  if (arrLastElement === '(' && operatorToBeAdded !== '-') {
    return numberArray;
  }

  numberArray.push(operatorToBeAdded);

  return numberArray;
}

export function clearHandler(): {
  newNumberArray: string[];
  totalNumber: string;
  isCounted: boolean;
} {
  return {
    newNumberArray: [''],
    totalNumber: '',
    isCounted: false,
  };
}

export function negativeTransformationHandler({ numberArray }: valueObjType): string[] {
  const arrLastElement: string = numberArray.pop() as string;
  let isNumber = Number(arrLastElement);
  const arrLength: number = numberArray.length - 1;

  if (Number.isNaN(isNumber)) {
    numberArray.push(arrLastElement);
    numberArray.push('(');
    numberArray.push('-');
  } else if (numberArray[arrLength] === '-' && numberArray[arrLength - 1] === '(') {
    numberArray.pop();
    numberArray.pop();
    numberArray.push(arrLastElement);
  } else {
    numberArray.push('(');
    numberArray.push('-');
    numberArray.push(arrLastElement);
  }
  return numberArray;
}

export function equalHandler({ numberArray }: valueObjType): {
  newNumberArray: string[];
  totalNumber: string;
  isCounted: boolean;
} {
  const backupNumberArray = [...numberArray];
  const arrLastElement: string = backupNumberArray.pop() as string;
  const isOperatorType: boolean = (operatorArr as ReadonlyArray<string>).includes(arrLastElement);
  let bracketCount: BracketCountType = {
    openBracket: 0,
    closingBracket: 0,
  };
  numberArray.forEach(element => {
    if (element === '(') {
      bracketCount.openBracket += 1;
    }
    if (element === ')') {
      bracketCount.closingBracket += 1;
    }
  });

  if (bracketCount.openBracket !== bracketCount.closingBracket) {
    let differences: number = bracketCount.openBracket - bracketCount.closingBracket;
    for (let count = 0; count < differences; count += 1) {
      console.log('asa');
      numberArray.push(')');
    }
  }

  let computedNumber: string = isOperatorType ? '' : evaluate(numberArray.join('').replaceAll('x', '*'));
  computedNumber = !computedNumber ? '' : computedNumber.toString();
  let arrLength: number = numberArray.length - 1;

  return {
    // eslint-disable-next-line no-nested-ternary
    newNumberArray: isOperatorType
      ? [...numberArray]
      : arrLength === 0
      ? [computedNumber as string]
      : [computedNumber as string, numberArray[arrLength - 1], numberArray[arrLength]],
    totalNumber: computedNumber as string,
    // eslint-disable-next-line no-unneeded-ternary
    isCounted: isOperatorType ? false : true,
  };
}

export function dotHandler({ numberArray, currSign }: valueObjType): string[] {
  const dotToBeAdded: DotArrType = currSign as DotArrType;
  const arrLastElement: string = numberArray.pop() as string;
  let isNumber = Number(arrLastElement);
  if (!arrLastElement) {
    numberArray.push('0.');
  } else if (Number.isNaN(isNumber)) {
    numberArray.push(arrLastElement);
    numberArray.push('0.');
  } else if (arrLastElement.includes('.')) {
    numberArray.push(arrLastElement);
  } else {
    numberArray.push(arrLastElement + dotToBeAdded);
  }
  return numberArray;
}

export function bracketHandler({ numberArray }: valueObjType): string[] {
  const arrLength: number = numberArray.length;
  const backupNumberArray = [...numberArray];
  const arrLastElement: string = numberArray.pop() as string;
  console.log(arrLastElement);
  let isNumber = !arrLastElement ? NaN : Number(arrLastElement);
  const isOperatorType: boolean = (operatorArr as ReadonlyArray<string>).includes(arrLastElement);

  if (!Number.isNaN(isNumber) || arrLastElement === ')') {
    let bracketCount: BracketCountType = {
      openBracket: 0,
      closingBracket: 0,
    };
    backupNumberArray.forEach(element => {
      if (element === '(') {
        bracketCount.openBracket += 1;
      }
      if (element === ')') {
        bracketCount.closingBracket += 1;
      }
    });

    if (bracketCount.openBracket === bracketCount.closingBracket) {
      numberArray.push(arrLastElement);
      numberArray.push('x');
      numberArray.push('(');
    } else {
      numberArray.push(arrLastElement);
      numberArray.push(')');
    }
  } else {
    console.log('hi');
    if (arrLength === 0 || (arrLength === 0 && arrLastElement === '(') || !arrLastElement) {
      numberArray.push('(');
    }
    if (isOperatorType || arrLastElement === '(') {
      numberArray.push(arrLastElement);
      numberArray.push('(');
    }
  }

  return numberArray;
}

export function checkArrayEqual(a: string[], b: string[]): boolean {
  return Array.isArray(a) && Array.isArray(b) && a.length === b.length && a.every((val, index) => val === b[index]);
}

export function computeCycleCheck(valueObj: valueObjType, buttonValue: string) {
  let newValueObj = { ...valueObj };
  if (newValueObj.isComputed && !Number.isNaN(Number(buttonValue))) {
    newValueObj.isComputed = false;
    newValueObj.numberArray = [''];
    newValueObj.computedValue = '';
  }
  if (newValueObj.isComputed && Number.isNaN(Number(buttonValue)) && buttonValue !== '=') {
    newValueObj.isComputed = false;
    newValueObj.numberArray = [newValueObj.computedValue];
    newValueObj.computedValue = '';
  }
  return newValueObj;
}
