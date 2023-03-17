import { ReactNode } from 'react';
import './Wrapper.css';

type Props = { children: ReactNode };
const Wrapper = ({ children }: Props) => {
  return <div className='wrapper'>{children}</div>;
};

export default Wrapper;
