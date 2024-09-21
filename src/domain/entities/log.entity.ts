

export enum LogSeverityLevel {
    low = 'low',
    medium = 'medium',
    high = 'high'
}

export interface LogEntityOptions {
    level: LogSeverityLevel;
    message: string;
    origin: string;
    createdAt?: Date;
}

export class LogEntity {
    
    public level: LogSeverityLevel;
    public message: string;
    public createdAt: Date;
    public origin: string;

    constructor(options: LogEntityOptions) {
        const { level, message, origin, createdAt = new Date() } = options;
        this.level = level;
        this.message = message;
        this.createdAt = createdAt;
        this.origin = origin;
    }

    static fromJson = ( json: string ): LogEntity => {
        json = ( json === '' ) ? '{}' : json;
        const { level, message, createdAt, origin } = JSON.parse(json);

        if( !message ) throw new Error('Message is required');
        if( !level ) throw new Error('Level is required');
        if( !createdAt ) throw new Error('createdAt is required');

        const log = new LogEntity( {
            level: level, 
            message: message,
            createdAt: createdAt,
            origin: origin
        } );
        log.createdAt = new Date(createdAt);

        return log;
    }

    static fromObject = (object: { [key: string]: any }): LogEntity => {
        const { level, message, createdAt, origin } = object;

        if( !message ) throw new Error('Message is required');
        if( !level ) throw new Error('Level is required');
        if( !createdAt ) throw new Error('createdAt is required');

        const log = new LogEntity( {
            level: level, 
            message: message,
            createdAt: createdAt,
            origin: origin
        } );

        return log;
    }

}