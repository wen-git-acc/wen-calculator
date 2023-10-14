import { ReactNode } from 'react';
import './FooterBox.css';

type PropsType = {
  children: string;
};

const FooterBox = ({ children }: PropsType) => {
  return <div className='footerBox'>{children}</div>;
};

export default FooterBox;
