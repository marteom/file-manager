import { readdir } from 'node:fs/promises';

export const showFoldersFiles = (dirPath) => {
  const files = [];
  const dirs = [];
  const folderObjs = readdir(dirPath, {withFileTypes: true});
  folderObjs.then((objData) => {
    for (const obj of objData) {
      if(obj.isFile()) {
        files.push(obj.name);
      }
      else if(obj.isDirectory()){
        dirs.push(obj.name);
      }
    }
    dirs.sort();
    files.sort();

    const folderFiles = [];
    for(let d of dirs) {
      folderFiles.push({name: d, type: 'directory'});
    }
    for(let f of files) {
      folderFiles.push({name: f, type: 'file'});
    }

    if(folderFiles.length === 0) {
      console.log('Directory is empty!');
    }
    else {
      console.table(folderFiles);
    }

  })
}