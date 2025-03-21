import history from '../../history';

interface BackButtonProps {
  baseClassName: string;
}

function BackButton({ baseClassName }: BackButtonProps): JSX.Element {
  const onButtonClick = () => {
    history.back();
  };

  return (
    <button
      className={`btn-flat ${baseClassName}`}
      type="button"
      onClick={onButtonClick}
    >
      <svg width="14" height="10" aria-hidden="true">
        <use xlinkHref="#arrow-left"></use>
      </svg>
      <span>Назад</span>
    </button>
  );
}

export default BackButton;
