import { JSX } from 'react';

import { SpinnerText } from '@frontend/types/component';

export type SpinnerProps = {
  text?: SpinnerText;
};

const Spinner = ({ text = SpinnerText.Loading }: SpinnerProps): JSX.Element => (
  <div>{text}</div>
);

export default Spinner;
