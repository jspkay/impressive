export var loglevel = 3;

export const levels = {
  DEBUG : 0,
  INFO : 1,
  WARNING : 2,
  FATAL : 3,
}

export function setLevel(level){
  loglevel = level;
}

export function debug(string){
  if(loglevel <= levels.DEBUG){
    console.log("DEBUG: ", string)
  }
}
export function info(string){
  if(loglevel <= levels.INFO){
    console.log("INFO: ", string)
  }
}
export function warning(string){
  if(loglevel <= levels.WARNING){
    console.log("WARNING: ", string)
  }
}
export function fatal(string){
  if(loglevel <= levels.FATAL){
    console.log("FATAL: ", string)
  }
}
