export const FileLoading = {
  Video: {
    Accept: '.mov, .avi, .mp4',
    Placeholder: 'Загрузите сюда файлы формата MOV, AVI или MP4',
    FileExtRegExp: /\.(mov|avi|mp4)$/,
  },
  Certificate: {
    Accept: '.pdf',
    Placeholder: 'Загрузите сюда файл формата PDF',
    FileExtRegExp: /\.pdf$/,
  },
  Avatar: {
    Accept: '.png, .jpeg, .jpg',
    Placeholder: 'JPG, PNG, оптимальный размер 100×100 px',
    FileExtRegExp: /\.(jpg|jpeg|png)$/,
  },
  Photo: {
    Accept: '.png, .jpeg, .jpg',
    Placeholder: '',
    FileExtRegExp: /\.(jpg|jpeg|png)$/,
  },
} as const;
