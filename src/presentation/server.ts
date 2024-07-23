import { CheckService } from "../domain/use-cases/checks/check-service";
import { CronService } from "./cron/cron-service";

export class Server {
  
    static start() {
        console.log('Server started');

        CronService.createJob(
            '*/5 * * * * *',
            () => {
                const url = 'https://www.google.com';
                new CheckService(
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