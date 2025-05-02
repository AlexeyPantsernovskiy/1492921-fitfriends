import { useRef, useState } from 'react';
import 'swiper/css';
import classNames from 'classnames';

import { Icon } from '@frontend/types/component';
import { FlatButton, IconButton } from '@frontend/components';

type CertificateCardProps = {
  certificate: string;
  allowDelete?: boolean;
  disabled?: boolean;
  onChange: (certificate: File | null) => void;
};

function CertificateCard({
  certificate,
  allowDelete = false,
  disabled,
  onChange,
}: CertificateCardProps): JSX.Element {
  const [newCertificate, setCertificate] = useState<File | null>(null);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleEditButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsEdit(true);
  };

  const handleSaveButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsEdit(false);
    onChange(newCertificate);
  };

  const handleDeleteButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onChange(null);
  };

  const handleRefreshButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCertificate(file);
    }
    // Сбрасываем значение input, чтобы можно было загрузить тот же файл снова
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const btnClassNames = 'btn-icon certificate-card__control';

  return (
    <div
      className={classNames('certificate-card', {
        'certificate-card--edit': isEdit,
      })}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".pdf"
        style={{ display: 'none' }}
        id="certificate-upload"
      />
      <div className="certificate-card__image">
        <div
          style={{
            width: '294px',
            height: '360px',
            overflow: 'hidden',
            position: 'relative',
            // Дополнительные стили контейнера
            borderRadius: '8px', // Закругленные углы
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)', // Тень
          }}
        >
          {certificate && (
            <iframe
              title="Сертификат"
              src={`${newCertificate ? URL.createObjectURL(newCertificate) : certificate}#toolbar=0`}
              style={{
                border: 'none',
                position: 'absolute',
                top: '-30px', // Сдвиг содержимого вверх
                left: '-10px', // Сдвиг содержимого влево
                width: 'calc(100% + 20px)', // Компенсация сдвига по ширине
                height: 'calc(100% + 60px)', // Компенсация сдвига по высоте
                // Дополнительно:
                pointerEvents: 'none', // Запретить взаимодействие
              }}
              allow="autoplay; fullscreen" // Политики безопасности
              loading="lazy" // Ленивая загрузка
            />
          )}
        </div>
      </div>
      {!disabled && (
        <div className="certificate-card__buttons">
          <FlatButton
            className={classNames(
              'certificate-card__button',
              { 'certificate-card__button--save': isEdit },
              { 'certificate-card__button--edit': !isEdit }
            )}
            caption={isEdit ? 'Сохранить' : 'Изменить'}
            icon={Icon.Edit}
            isUnderline
            onClick={isEdit ? handleSaveButtonClick : handleEditButtonClick}
          />
          <div className="certificate-card__controls">
            {isEdit && (
              <>
                <IconButton
                  classNames={btnClassNames}
                  icon={Icon.RefreshCertificate}
                  onClick={handleRefreshButtonClick}
                />
                {allowDelete && (
                  <IconButton
                    classNames={btnClassNames}
                    icon={Icon.DeleteCertificate}
                    onClick={handleDeleteButtonClick}
                  />
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default CertificateCard;
