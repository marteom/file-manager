import fs from 'fs';

export const readFile = async (filePath) => {
  //const fullFilePath = new URL(filePath, import.meta.url);
    const readableStream = fs.createReadStream(filePath);
    readableStream.setEncoding('utf8');
    let data = '';

    try {
        for await (const chunk of readableStream) {
            data += chunk;
        }
        return data + '\n';
    }
    catch(err) {
      return null;
    }
}