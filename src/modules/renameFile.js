import { rename as fs_rename } from 'node:fs/promises';

export const renameFile = async (sourceFile, destFile) => {
    try {
        await fs_rename(sourceFile, destFile);
    }
    catch {
        return false;
    }
};