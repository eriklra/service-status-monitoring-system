import fs from "fs";

import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";




export class FileSystemLogDatasource implements LogDatasource {

    private readonly logPath: string = 'logs/';
    private readonly allLogsPath: string = 'logs/logs-all.log';
    private readonly mediumLogsPath: string = 'logs/logs-medium.log';
    private readonly highLogsPath: string = 'logs/logs-high.log';

    constructor() {
        this.createLogFiles();

    }

    private createLogFiles(): void {

        if (!fs.existsSync( this.logPath )) {
            fs.mkdirSync( this.logPath );
        }

        [
            this.allLogsPath, 
            this.mediumLogsPath, 
            this.highLogsPath

        ].forEach( path => {
            if (fs.existsSync( path )) return;
            
            fs.writeFileSync( path, '' );
            
        });


    }

    async saveLog( newLog: LogEntity): Promise<void> {

        const logAsJson = `${ JSON.stringify( newLog ) }\n`;

        fs.appendFileSync( this.allLogsPath,  logAsJson );

        if ( newLog.level === LogSeverityLevel.low ) return;

        if ( newLog.level === LogSeverityLevel.medium ) {
            fs.appendFileSync( this.mediumLogsPath, logAsJson ); 
        }

        if ( newLog.level === LogSeverityLevel.high ) {
            fs.appendFileSync( this.highLogsPath, logAsJson ); 
        }
    }

    private getLogsFromFile = ( path: string ): LogEntity[] => {
        const content = fs.readFileSync( path, 'utf-8' );

        if (content === '') return [];

        const stringLogs = content.split('\n').map( 
            log => LogEntity.fromJson( log )
        );

        return stringLogs;
    }

    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        
        switch (severityLevel) {
            case LogSeverityLevel.low:
                return this.getLogsFromFile( this.allLogsPath );

            case LogSeverityLevel.medium:
                return this.getLogsFromFile( this.mediumLogsPath );

            case LogSeverityLevel.high:
                return this.getLogsFromFile( this.highLogsPath );
                
            default:
                throw new Error(`${severityLevel} not implemented`);
        }
    }

}