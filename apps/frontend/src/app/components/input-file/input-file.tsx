import { JSX, useRef, useState } from 'react';

type InputFileProps = {
  classPrefix?: string;
  placeholder: string;
  fileMask: string;
  //disabled?: boolean;
  onChange: (file: File | null) => void;
};

const InputFile = ({
  classPrefix,
  placeholder,
  fileMask,
  //disabled = false,
  onChange,
}: InputFileProps): JSX.Element => {
  const [fileName, setFileName] = useState<string>(placeholder);
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
      setFileName(placeholder);
      if (fileNameRef.current) {
        fileNameRef.current.style = '';
      }
    }
  };

  return (
    <div className={`drag-and-drop ${classPrefix}__drag-and-drop`}>
      <label>
        <span className="drag-and-drop__label" tabIndex={0} ref={fileNameRef}>
          {fileName}
          <svg width="20" height="20" aria-hidden="true">
            <use xlinkHref="#icon-import"></use>
          </svg>
        </span>
        <input
          type="file"
          name="import"
          tabIndex={-1}
          accept={fileMask}
          className="visually-hidden"
          onChange={handleFileChange}
          required
        />
      </label>
    </div>
  );
};

export default InputFile;
