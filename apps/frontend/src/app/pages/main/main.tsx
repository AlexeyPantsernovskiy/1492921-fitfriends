import { JSX } from 'react';
import { Outlet } from 'react-router-dom';

const Main = (): JSX.Element => (
  <div className="wrapper">
    <main>
      <Outlet />
    </main>
  </div>
);

export default Main;
