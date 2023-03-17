import './Button.css';
import React from 'react';

type PropsType = {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  className: string;
  value: string;
};
const Button = ({ className, value, onClick }: PropsType) => {
  return (
    <button type='button' className={className} onClick={onClick}>
      {value}
    </button>
  );
};

export default Button;
