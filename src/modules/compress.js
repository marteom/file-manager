import { pipeline } from 'stream/promises';
import  zlib  from 'node:zlib';
import fs from 'node:fs';

export const compress = async (inputFilePath, outputFilePath) => {
    const inputFile = new URL(inputFilePath, import.meta.url).pathname;
    const compressFile = new URL(outputFilePath, import.meta.url).pathname;

    await pipeline(
        fs.createReadStream(inputFile),
        zlib.createBrotliCompress(),
        fs.createWriteStream(compressFile)
      );
};

export const decompress = async (inputFilePath, outputFilePath) => {
    const inputFile = new URL(inputFilePath, import.meta.url).pathname;
    const compressFile = new URL(outputFilePath, import.meta.url).pathname;
    
    await pipeline(
        fs.createReadStream(inputFile),
        zlib.createBrotliDecompress(),
        fs.createWriteStream(compressFile)
    );
};