import BackButton from '../../components/back-button/back-button';
//import CustomHelmet from '../../components/custom-helmet/custom-helmet';

function NotFound(): JSX.Element {
  return (
    <div className="container">
      {/* <CustomHelmet pageTitle="Страница не найдена" /> */}
      <BackButton baseClassName="" />
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
