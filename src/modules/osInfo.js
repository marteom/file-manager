import EOL, { cpus, homedir, userInfo, arch } from 'os';

export const osInfo = (command) => {
    if(command === '--EOL') {
        console.log(`EOL: ${JSON.stringify(EOL)}`);
    }
    else if(command === '--cpus'){
        const cpuList = cpus();
        console.log(`Amount of CPUS: ${cpuList.length}`);
        console.table(cpuList.map((el) => ({Model: el.model, 'Clock rate': el.speed/1000+'GHz'})));
    }
    else if(command === "--homedir") {
        console.log(`Home directory: ${homedir()}`);
    }
    else if(command === "--username") {
        console.log(`Current system user name: ${userInfo().username}`);
    }
    else if(command === "--architecture") {
        console.log(`CPU architecture: ${arch()}`);
    }
    else {
        console.log('option not recognized');
    }    
};

export const sysHomeDir = () => {
    return homedir();
}