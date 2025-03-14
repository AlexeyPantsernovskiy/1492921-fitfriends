import { JSX } from 'react';

const Password = (): JSX.Element => {
  return (
    <div className="custom-input">
      <label>
        <span className="custom-input__label">Пароль</span>
        <span className="custom-input__wrapper">
          <input type="password" name="password" autoComplete="off" />
        </span>
      </label>
    </div>
  );
};

export default Password;
