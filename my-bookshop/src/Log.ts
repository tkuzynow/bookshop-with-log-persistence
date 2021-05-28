export class Log {
  tenantID: string;
  id?: string;
  level?: LogLevel;
  source?: string;
  host?: string;
  process?: string;
  module: string;
  method: string;
  timestamp?: Date;
  action: String;
  type?: LogType;
  message: string;
  user?: String;
  actionOnUser?: String;
  hasDetailedMessages?: boolean;
  detailedMessages?: any;

     //constructor 
  constructor(tenantID:string, level: LogLevel) { 
      this.tenantID = tenantID;
      this.level = level;
  }  
}


export enum LogLevel {
  DEBUG = 'D',
  INFO = 'I',
  WARNING = 'W',
  ERROR = 'E',
  NONE = 'NONE',
  DEFAULT = 'DEFAULT',
}

export enum LogType {
  REGULAR = 'R',
  SECURITY = 'S',
}
