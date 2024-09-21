import { LogModel } from "../../data/mongo";
import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";



export class MongoLogDatasource implements LogDatasource {
    
    async saveLog(log: LogEntity): Promise<void> {
        const newLog = await LogModel.create(log);
    }

    async getLogs(): Promise<LogEntity[]> {
        
        const logs = await LogModel.find({
            level: LogSeverityLevel.low
        });

        return logs.map( mongoLog => LogEntity.fromObject(mongoLog) );
        //return logs.map( LogEntity.fromObject );
    }
}