import { JSX } from 'react';

export type AvatarProps = {
  photo: File | null;
  onChange: (photo: File | null) => void;
};

const Avatar = ({ photo, onChange }: AvatarProps): JSX.Element => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files && files.length > 0) {
      onChange(files[0]);
      // if (imgRef.current) {
      //   imgRef.current.srcset = URL.createObjectURL(files[0]);
      // }
    }
  };

  return (
    <div className="input-load-avatar">
      <label>
        <input
          className="visually-hidden"
          type="file"
          accept="image/png, image/jpeg"
          onChange={handleFileChange}
        />
        <span className="input-load-avatar__btn">
          {!photo && (
            <svg width="20" height="20" aria-hidden="true">
              <use xlinkHref="#icon-import"></use>
            </svg>
          )}
          {photo && (
            <img
              src={URL.createObjectURL(photo)}
              alt="Превью выбранного фото"
            />
          )}
        </span>
      </label>
    </div>
  );
};

export default Avatar;
