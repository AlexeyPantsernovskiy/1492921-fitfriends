import { JSX } from 'react';
import { Outlet } from 'react-router-dom';

const WrapperMain = (): JSX.Element => (
  <main>
    <Outlet />
  </main>
);

export default WrapperMain;
