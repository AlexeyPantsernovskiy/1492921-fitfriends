import { Link, useLocation } from 'react-router-dom';
import NotificationList, { NotificationProps } from './notification';

import { AppRoute } from '@frontend/types/types';

const SEARCH_HISTORY = ['Бокс', 'Бег', 'Аэробика'];

const NOTIFICATIONS: NotificationProps[] = [
  {
    text: 'Катерина пригласила вас на тренировку',
    time: new Date('2023-12-23 12:35'),
  },
  {
    text: 'Никита отклонил приглашение на совместную тренировку',
    time: new Date('2023-12-22 09:22'),
  },
  {
    text: 'Татьяна добавила вас в друзья',
    time: new Date('2023-12-18 18:50'),
  },
];

const NavItemData = {
  Main: {
    route: AppRoute.Root,
    caption: 'На главную',
    icon: '#icon-home',
    width: 18,
    height: 18,
  },
  User: {
    route: AppRoute.PersonalAccount,
    caption: 'Личный кабинет',
    icon: '#icon-user',
    width: 16,
    height: 18,
  },
  Friends: {
    route: AppRoute.Friends,
    caption: 'Друзья',
    icon: '#icon-friends',
    width: 22,
    height: 16,
  },
} as const;

export type NavItemProps = {
  item: (typeof NavItemData)[keyof typeof NavItemData];
};

const NavItem = ({ item }: NavItemProps): JSX.Element => {
  const location = useLocation();
  const { pathname } = location;

  return (
    <li className="main-nav__item" key={item.icon}>
      <Link
        className={`main-nav__link ${
          pathname === item.route ? 'is-active' : ''
        }`}
        to={item.route}
        aria-label={item.caption}
      >
        <svg width={item.width} height={item.height} aria-hidden="true">
          <use xlinkHref={item.icon}></use>
        </svg>
      </Link>
    </li>
  );
};

export type SearchItemProps = {
  text: string;
};

const SearchItem = ({ text }: SearchItemProps): JSX.Element => {
  return (
    <li className="search__item">
      <Link to="" className="search__link is-active">
        {text}
      </Link>
    </li>
  );
};

const Header = (): JSX.Element => {
  return (
    <header className="header">
      <div className="container">
        <span className="header__logo">
          <svg width="187" height="70" aria-hidden="true">
            <use xlinkHref="#logo"></use>
          </svg>
        </span>
        <nav className="main-nav">
          <ul className="main-nav__list">
            <NavItem item={NavItemData.Main} />
            <NavItem item={NavItemData.User} />
            <NavItem item={NavItemData.Friends} />
            <NotificationList items={NOTIFICATIONS} />
          </ul>
        </nav>
        <div className="search">
          <form action="#" method="get">
            <label>
              <span className="search__label">Поиск</span>
              <input type="search" name="search" />
              <svg
                className="search__icon"
                width="20"
                height="20"
                aria-hidden="true"
              >
                <use xlinkHref="#icon-search"></use>
              </svg>
            </label>
            <ul className="search__list">
              {SEARCH_HISTORY.map((item) => (
                <SearchItem key={item} text={item} />
              ))}
            </ul>
          </form>
        </div>
      </div>
    </header>
  );
};

export default Header;
