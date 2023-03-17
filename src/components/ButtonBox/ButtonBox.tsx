import { ReactNode } from 'react';
import './ButtonBox.css';

type PropsType = {
  children: ReactNode;
};
const ButtonBox = ({ children }: PropsType) => {
  return <div className='buttonBox'>{children}</div>;
};

export default ButtonBox;
