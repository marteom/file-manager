import fs from 'fs';

export const copyFile = (sourceFile, destFile) => {
  fs.createReadStream(sourceFile).pipe(fs.createWriteStream(destFile));
}