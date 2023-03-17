export const numberArr = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'] as const;

export type NumberArrType = (typeof numberArr)[number];

export const operatorArr = ['+', '-', 'x', '/', '%'] as const;

export type OperatorArrType = (typeof operatorArr)[number];

export const dotArr = ['.'] as const;

export type DotArrType = (typeof dotArr)[number];

export const negativeTransformArr = ['+/-'] as const;

export type NegativeTransformArrType = (typeof negativeTransformArr)[number];

export const bracketArr = ['(', ')'] as const;

export type BracketArrType = (typeof bracketArr)[number];

export type BracketCountType = {
  openBracket: number;
  closingBracket: number;
};
