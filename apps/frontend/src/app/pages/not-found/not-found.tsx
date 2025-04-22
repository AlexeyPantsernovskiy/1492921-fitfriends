import BackButton from '../../components/back-button/back-button';

function NotFound(): JSX.Element {
  return (
    <div className="container">
      <BackButton className="" />
      <h1
        style={{
          marginTop: 100,
          textAlign: 'center',
        }}
      >
        404 - Страница не найдена.
      </h1>
    </div>
  );
}

export default NotFound;
