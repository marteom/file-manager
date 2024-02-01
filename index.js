
import * as readlinePromises from 'node:readline/promises';
import { homedir } from 'os';
import process, { stdin, stdout } from 'node:process';
import { writeFile } from 'fs/promises';
import { checkExist, getSep } from './src/utils/helper.js';
import { showFoldersFiles } from './src/modules/folderFile.js';
import { readFile } from './src/modules/readFile.js';
import { removeFile } from './src/modules/removeFile.js';
import { fileHash } from './src/modules/hash.js';
import { renameFile } from './src/modules/renameFile.js';
import { copyFile } from './src/modules/copyFile.js';

const doExit = (userName) => {
  console.log(`Thank you for using File Manager, ${userName}, goodbye!`);
  process.exit(0);
}

const showDir = (dirName) => {
  console.log(`You are currently in ${dirName}`);
}

const getUserName = () => {
    const args = process.argv;
    for(let i=0; i<args.length; i++) {
        if (args[i].indexOf('--username') === 0){
          return args[i].split('=')[1];
        }
    }
    
    return null;
}

// const execCommand = async (command) => {
//     switch(command) {
//         case '.exit':
//             doExit(userName);
//             break;
//     }
// }

const init = async () => {
  const userName = getUserName();

  if(userName === null){
    console.error( 'Incorrect input string!');
    return;
  }

   console.log(`Welcome to the File Manager, ${userName}!`);

   const sep = getSep();
   let homeDir = homedir();

   showDir(homeDir);

   const rl = readlinePromises.createInterface({
    input: stdin,
    output: stdout,
    });

    rl.on('SIGINT', () => {
        doExit(userName);
    });

   try {
    while (rl) {
        const answer = await rl.question("");
        if(answer.trim().startsWith('.exit')){
            doExit(userName);
        }
        else if(answer.trim().startsWith('up')){
            homeDir = homeDir.includes(sep) ? homeDir.substring(0, homeDir.lastIndexOf(sep)) : homeDir;
            showDir(homeDir);
        }
        else if(answer.trim().startsWith('cd ')){
            const arrCdCmd = answer.trim().split(' ');
            let destDir = `${homeDir}${sep}${arrCdCmd[1]}`;
            const isDestDirExist = await checkExist(destDir);

            if(isDestDirExist) {
            homeDir = destDir;
            showDir(homeDir);
            }
            else {
            const isDestAbsDirExist = await checkExist(arrCdCmd[1]);
            if(isDestAbsDirExist){
                homeDir = arrCdCmd[1];
                showDir(homeDir);
            }
            else {
                console.log(`Invalid input`);
            }
            }
        }
        else if (answer.trim().startsWith('ls')){
            showFoldersFiles(homeDir);
        }
        else if (answer.trim().startsWith('cat ')){
            const arrCatCmd = answer.trim().split(' ');
            let destFile = `${homeDir}${sep}${arrCatCmd[1]}`;
            const isDestFileExist = await checkExist(destFile);
            if(isDestFileExist) {
            const fileData = await readFile(destFile);
            fileData === null ? console.log('Error read file') : console.log(fileData);
            }
            else {
            console.log(`File not found`);
            }
        }
        else if(answer.trim().startsWith('add ')) {
            const arrAddCmd = answer.trim().split(' ');
            await writeFile(`${homeDir}${sep}${arrAddCmd[1]}`, ''); 
        }
        else if(answer.trim().startsWith('rm ')) {
            const arrRmCmd = answer.trim().split(' ');
            const isDestFileExist = await checkExist(`${homeDir}${sep}${arrRmCmd[1]}`);
            if(isDestFileExist) {
            const rmResult = await removeFile(`${homeDir}${sep}${arrRmCmd[1]}`, ''); 
            if(rmResult === null) {
                console.log('Error delete file!');
            }
            }
            else {
            console.log(`File not found`);
            }
        }
        else if(answer.trim().startsWith('hash ')) {
            const arrHashCmd = answer.trim().split(' ');
            const isDestFileExist = await checkExist(`${homeDir}${sep}${arrHashCmd[1]}`);
            if(isDestFileExist) {
            const hash = await fileHash(`${homeDir}${sep}${arrHashCmd[1]}`, ''); 
            console.log(hash);
            }
            else {
            console.log(`File not found`);
            }
        }
        else if(answer.trim().startsWith('rn ')) {
            const arrRnCmd = answer.trim().split(' ');
            const isSourceFileExist = await checkExist(`${homeDir}${sep}${arrRnCmd[1]}`);
            if(isSourceFileExist) {
            const rmResult = await renameFile(`${homeDir}${sep}${arrRnCmd[1]}`, `${homeDir}${sep}${arrRnCmd[2]}`); 
            if(rmResult === null) {
                console.log('Error rename file!');
            }
            }
            else {
            console.log(`File not found`);
            }
        }
        else if(answer.trim().startsWith('cp ')) {
            const arrCpCmd = answer.trim().split(' ');
            const isSourceFileExist = await checkExist(`${homeDir}${sep}${arrCpCmd[1]}`);
            if(isSourceFileExist) {
            copyFile(`${homeDir}${sep}${arrCpCmd[1]}`, arrCpCmd[2]); 
            }
            else {
            console.log(`File not found`);
            }
        }
        else if(answer.trim().startsWith('mv ')) {
            const arrCpCmd = answer.trim().split(' ');
            const isSourceFileExist = await checkExist(`${homeDir}${sep}${arrCpCmd[1]}`);
            if(isSourceFileExist) {
            copyFile(`${homeDir}${sep}${arrCpCmd[1]}`, arrCpCmd[2]); 
            await removeFile(`${homeDir}${sep}${arrCpCmd[1]}`, ''); 
            }
            else {
            console.log(`File not found`);
            }
        }
        else {
            console.log(`Invalid input`);
        }
    }
   }
   catch(e) {
    console.log(`Operation failed`)
   }
   finally {
    rl.close();
   }

};

await init();