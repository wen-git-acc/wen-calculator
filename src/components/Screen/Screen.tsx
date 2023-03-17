import { Textfit } from 'react-textfit';
import './Screen.css';

type PropsType = {
  value: string;
};

const Screen = ({ value }: PropsType) => {
  return (
    <Textfit className='screen' mode='single' max={70}>
      {value}
    </Textfit>
  );
};

export default Screen;
