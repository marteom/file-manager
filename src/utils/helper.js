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

  export const showDir = (dirName) => {
    console.log(`You are currently in ${dirName}`);
  }

  export const doExit = (userName) => {
    console.log(`Thank you for using File Manager, ${userName}, goodbye!`);
  }

  export const getUserName = () => {
    const args = process.argv;
    for(let i=0; i<args.length; i++) {
        if (args[i].indexOf('--username') === 0){
          return args[i].split('=')[1];
        }
    }
    
    return null;
}