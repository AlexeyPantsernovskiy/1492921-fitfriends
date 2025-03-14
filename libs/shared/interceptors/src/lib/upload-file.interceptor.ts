import { BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

import { FileValidateOptions } from '@project/shared-core';

export function UploadFileInterceptor(
  options: FileValidateOptions,
  fieldName = 'imageFile'
) {
  const localOptions: MulterOptions = {};
  if (options.FileExtRegExp) {
    localOptions.fileFilter = (request, file, callback) => {
      if (!file.originalname.match(options.FileExtRegExp)) {
        return callback(new BadRequestException(options.Message), false);
      }
      callback(null, true);
    };
  }
  if (options.MaxSize) {
    localOptions.limits = { fileSize: options.MaxSize };
  }
  return FileInterceptor(fieldName, localOptions);
}
