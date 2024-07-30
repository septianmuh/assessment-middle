type LogLevel = 'info' | 'warn' | 'error';

class Logger {
    private level: LogLevel;

    constructor(level: LogLevel = 'info') {
        this.level = level;
    }

    private log(level: LogLevel, message: string, ...optionalParams: any[]) {
        if (this.shouldLog(level)) {
            console[level](message, ...optionalParams);
        }
    }

    private shouldLog(level: LogLevel): boolean {
        const levels: LogLevel[] = ['info', 'warn', 'error'];
        return levels.indexOf(level) >= levels.indexOf(this.level);
    }

    info(message: string, ...optionalParams: any[]) {
        this.log('info', message, ...optionalParams);
    }

    warn(message: string, ...optionalParams: any[]) {
        this.log('warn', message, ...optionalParams);
    }

    error(message: string, ...optionalParams: any[]) {
        this.log('error', message, ...optionalParams);
    }
}

const logger = new Logger(process.env.LOG_LEVEL as LogLevel || 'info');

export default logger;
