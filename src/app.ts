import 'dotenv/config';
import { Server } from "./presentation/server";
import { envs } from './config/plugins/envs.plugin';
import { LogModel, MongoDatabase } from './data/mongo';
import { PrismaClient } from '@prisma/client';


(async() => {
    main();
})();

async function main() {

    await MongoDatabase.connect({
        mongoUrl: envs.MONGO_URL,
        dbName: envs.MONGO_DB_NAME
    });

    //const prisma = new PrismaClient();
    /*const newLog = await prisma.logModel.create({
        data: {
            level: 'HIGH',
            message: 'Test message',
            origin: 'app.ts'
        }
    });

    console.log(newLog);*/

    /*const logs = await prisma.logModel.findMany(
        {
            where: {
                level: 'MEDIUM'
            }
        }
    );
    console.log(logs);*/

    /*const newLog = await LogModel.create({
        level: 'low',
        message: 'This is a low level log',
        origin: 'app.ts'
    });

    await newLog.save();*/

    /*const logs = await LogModel.find();
    console.log(logs);*/
    
    Server.start();
    //console.log(envs);
    
}