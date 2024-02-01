import { access } from 'node:fs/promises';
import { version } from 'os';

export const checkExist = async (path) => {
  try {
      const checkResult = await access(path);
      if(!checkResult) {
          return true;
      }
  }
  catch {
      return false;
  }
}

export const getSep = () => {
    let sep = '';
  
    const systemOS = version().toLowerCase();
  
    if(systemOS.includes("windows")) {
      sep = '\\';
    }
    else {
      sep = '/';
    }
  
    return sep;
  }