import { rm } from 'node:fs/promises';

export const removeFile = async (filePath) => {
    try {
        await rm(filePath);
    }
    catch {
        return null;
    }
};
