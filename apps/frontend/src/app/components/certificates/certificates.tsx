import { useRef, useState } from 'react';
import 'swiper/css';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';

import {
  addCertificate,
  deleteCertificate,
  updateCertificate,
  userSelectors,
} from '@frontend/store';
import { Limits } from '@frontend/const';
import { Icon, IconPosition } from '@frontend/types/component';

import {
  Spinner,
  FlatButton,
  IconButton,
  CertificateCard,
} from '@frontend/components';

import { useAppDispatch, useAppSelector } from '@frontend/src/hooks';
import { FileLoading } from '@project/shared';

function Certificates(): JSX.Element {
  const dispatch = useAppDispatch();
  const certificates = useAppSelector(userSelectors.certificates);
  const isLogged = useAppSelector(userSelectors.isLogged);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  const sliderRef = useRef<SwiperRef>(null);
  const nextButtonRef = useRef<HTMLButtonElement>(null);
  const prevButtonRef = useRef<HTMLButtonElement>(null);

  const handleCertificateChange = (index: number, file: File | null) => {
    if (file === null) {
      dispatch(deleteCertificate(index));
      return;
    }
    const formData = new FormData();
    formData.append('certificateFile', file);
    dispatch(updateCertificate({ indexCertificate: index, formData }));
  };

  const handleCertificateAddClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (evt: React.ChangeEvent<HTMLInputElement>) => {
    const files = evt.target.files;
    if (!files || files.length === 0) {
      return;
    }
    setIsUploading(true);
    try {
      for (const file of Array.from(files)) {
        const formData = new FormData();
        formData.append('certificateFile', file);
        await dispatch(addCertificate(formData)).unwrap();
      }
    } finally {
      setIsUploading(false);
      // Сброс значения input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div className="personal-account-coach__additional-info">
      <div className="personal-account-coach__label-wrapper">
        <h2 className="personal-account-coach__label">Дипломы и сертификаты</h2>
        <FlatButton
          className="personal-account-coach"
          icon={Icon.Load}
          iconPosition={IconPosition.Left}
          onClick={handleCertificateAddClick}
        />
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept={FileLoading.Certificate.Accept}
          style={{ display: 'none' }}
          multiple
        />
        <div className="popular-trainings__controls">
          <IconButton
            classNames="btn-icon personal-account-coach__control"
            icon={Icon.Prev}
            ref={prevButtonRef}
            onClick={() => sliderRef.current?.swiper.slidePrev()}
          />
          <IconButton
            classNames="btn-icon personal-account-coach__control"
            icon={Icon.Next}
            ref={nextButtonRef}
            onClick={() => sliderRef.current?.swiper.slideNext()}
          />
        </div>
      </div>
      {isUploading && (
        <div className="personal-account-coach__list">
          Идет загрузка сертификатов...
        </div>
      )}
      {!isLogged && <Spinner />}
      {isLogged && (
        <Swiper
          slidesPerView={Limits.SliderCertificate}
          className="personal-account-coach__list"
          modules={[Navigation]}
          ref={sliderRef}
          onBeforeInit={(swiper) => {
            if (prevButtonRef.current) {
              swiper.navigation.prevEl = prevButtonRef.current;
            }
            if (nextButtonRef.current) {
              swiper.navigation.nextEl = nextButtonRef.current;
            }
          }}
        >
          {certificates.map((certificate, index) => (
            <SwiperSlide
              key={`SwiperSlide-${index}`}
              className="personal-account-coach__item"
            >
              <CertificateCard
                certificate={certificate}
                allowDelete={certificates.length > 1}
                onChange={(file) => handleCertificateChange(index, file)}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
}

export default Certificates;
