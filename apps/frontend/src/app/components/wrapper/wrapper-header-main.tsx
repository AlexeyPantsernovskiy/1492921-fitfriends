import { JSX } from 'react';
import { Outlet } from 'react-router-dom';

import { Header } from '@frontend/components';

const WrapperHeaderMain = (): JSX.Element => (
  <>
    <Header />
    <main>
      <Outlet />
    </main>
  </>
);

export default WrapperHeaderMain;
