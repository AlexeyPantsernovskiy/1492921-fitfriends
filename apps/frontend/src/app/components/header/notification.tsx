export type NotificationProps = {
  text: string;
  time: Date;
};

const Notification = ({ text, time }: NotificationProps): JSX.Element => {
  const formattedDate = time.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
  });

  const formattedTime = time.toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <li className="main-nav__subitem">
      <a className="notification is-active" href="#">
        <p className="notification__text">{text}</p>
        <time className="notification__time" dateTime={time.toISOString()}>
          {`${formattedDate}, ${formattedTime}`}
        </time>
      </a>
    </li>
  );
};

export type NotoficationListProps = {
  items: NotificationProps[];
};

const NotificationList = ({ items }: NotoficationListProps): JSX.Element => {
  return (
    <li className="main-nav__item main-nav__item--notifications">
      <a className="main-nav__link" href="#" aria-label="Уведомления">
        <svg width="14" height="18" aria-hidden="true">
          <use xlinkHref="#icon-notification"></use>
        </svg>
      </a>
      <div className="main-nav__dropdown">
        <p className="main-nav__label">Оповещения</p>
        <ul className="main-nav__sublist">
          {items.map((item) => (
            <Notification text={item.text} time={item.time} />
          ))}
        </ul>
      </div>
    </li>
  );
};

export default NotificationList;
