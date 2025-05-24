import { JSX, useRef, useState } from 'react';

import { FileTypeLoading } from '@frontend/types/types';

type InputFileProps = {
  classPrefix?: string;
  fileType: FileTypeLoading;
  onChange: (file: File | null) => void;
};

const InputFile = ({
  classPrefix,
  fileType,
  onChange,
}: InputFileProps): JSX.Element => {
  const [fileName, setFileName] = useState<string>(fileType.Placeholder);
  const fileNameRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files && files.length > 0) {
      onChange(files[0]);
      setFileName(files[0].name);
      if (fileNameRef.current) {
        fileNameRef.current.style.color = 'black';
      }
    } else {
      onChange(null);
      setFileName(fileType.Placeholder);
      if (fileNameRef.current) {
        fileNameRef.current.style = '';
      }
    }
  };

  return (
    <div
      className={`drag-and-drop ${classPrefix ? `${classPrefix}__drag-and-drop` : ''}`}
    >
      <label>
        <span className="drag-and-drop__label" tabIndex={0} ref={fileNameRef}>
          {fileName}
          <svg
            width={fileType.Icon.width}
            height={fileType.Icon.height}
            aria-hidden="true"
          >
            <use xlinkHref={`#${fileType.Icon.name}`}></use>
          </svg>
        </span>
        <input
          type="file"
          name="import"
          tabIndex={-1}
          accept={fileType.Accept}
          className="visually-hidden"
          onChange={handleFileChange}
          required
        />
      </label>
    </div>
  );
};

export default InputFile;
