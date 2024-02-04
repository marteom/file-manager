import { createHash } from 'node:crypto'
import { readFile } from 'node:fs/promises';

export const fileHash = async (filePath) => {
    const fileContent = await readFile(filePath, {encoding: "utf8"});
    const generatedHash = createHash('sha256').update(fileContent).digest('hex');
    return generatedHash;
};