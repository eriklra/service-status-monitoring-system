import { PrismaClient, SeverityLevel } from "@prisma/client";
import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

const prismaClient = new PrismaClient();

const SeverityEnum = {
    low: SeverityLevel.LOW,
    medium: SeverityLevel.MEDIUM,
    high: SeverityLevel.HIGH
}

export class PostgresLogDatasource implements LogDatasource {
    
    async saveLog(log: LogEntity): Promise<void> {

        const level = SeverityEnum[log.level];
        
        const newLog = await prismaClient.logModel.create({
            data: {
                level: level,
                message: log.message,
                origin: log.origin
            }
        });
    }

    async getLogs( severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        // Get logs from postgres

        const level = SeverityEnum[severityLevel];

        const dbLogs = await prismaClient.logModel.findMany({
            where: {
                level: level
            }
        });

        return dbLogs.map(  LogEntity.fromObject );
    }

}