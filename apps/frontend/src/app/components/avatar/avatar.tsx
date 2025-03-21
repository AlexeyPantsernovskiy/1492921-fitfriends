import { JSX } from 'react';

type AvatarProps = {
  photo: string | undefined;
  disabled?: boolean;
  onChange: (photo: File | null) => void;
};

const Avatar = ({
  photo,
  disabled = false,
  onChange,
}: AvatarProps): JSX.Element => {
  let fileUrl = photo;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files && files.length > 0) {
      onChange(files[0]);
      fileUrl = URL.createObjectURL(files[0]);
    }
  };

  return (
    <div className="input-load-avatar">
      <label>
        <input
          className="visually-hidden"
          type="file"
          id="avatar"
          accept="image/png, image/jpeg"
          disabled={disabled}
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
              src={fileUrl}
              srcSet={`${fileUrl} 2x`}
              width="98"
              height="98"
              alt="Фото пользователя"
            />
          )}
        </span>
      </label>
    </div>
  );
};

export default Avatar;
