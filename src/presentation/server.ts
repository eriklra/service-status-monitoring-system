import { envs } from "../config/plugins/envs.plugin";
import { LogSeverityLevel } from "../domain/entities/log.entity";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { CheckServiceMultiple } from "../domain/use-cases/checks/check-service-multiple";
import { SendEmailLogs } from "../domain/use-cases/email/send-logs";
import { FileSystemLogDatasource } from "../infrastructure/datasources/file-system.datasources";
import { MongoLogDatasource } from "../infrastructure/datasources/mongo-log.datasource";
import { PostgresLogDatasource } from "../infrastructure/datasources/postgres-log.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email-service";

const fsLogRepository = new LogRepositoryImpl(
    new FileSystemLogDatasource()
);

const mongoLogRepository = new LogRepositoryImpl(
    new MongoLogDatasource()
);

const postgresLogRepository = new LogRepositoryImpl(
    new PostgresLogDatasource()
);

const emailService = new EmailService();

export class Server {
  
    public static async start() {
        console.log('Server started');
        console.log(envs);

        /*const emailService = new EmailService();
        emailService.sendEmail({
            to: 'eriklaramail@gmail.com',
            subject: 'Logs de sistema',
            htmlBody: `
                <h3>Logs de sistema - NOC</h3>
                <p>Logs de sistema</p>
                <p>Ver logs de sistema</p>`
        });*/

        /*new SendEmailLogs(emailService, FileSystemLogRepository).execute(
            ['eriklaramail@gmail.com', 'erik_lara_@outlook.com']
        );*/
        
        /*emailService.sendEmailWithFileSystemLogs(
            ['eriklaramail@gmail.com', 'erik_lara_@outlook.com']
        );*/

        /*const logs = await logRepository.getLogs(LogSeverityLevel.low);
        console.log(logs);*/
        
        CronService.createJob(
            '*/5 * * * * *',
            () => {
                const url = 'https://www.google.com';
                new CheckServiceMultiple(
                    [fsLogRepository, mongoLogRepository, postgresLogRepository],
                    () => console.log(`Success on check service ${ url }`)
                    ,
                    (error) => {
                        console.error(error);
                    }
                ).execute( url );
                //new CheckService().execute('http://localhost:3000');
            }
        );
    }

}