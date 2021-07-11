class LogSeverity {
    nameInLog: string;
    priority: number;
    displayName: string;
    color: string;

    constructor(
        nameInLog: string,
        priority: number,
        displayName?: string,
        color: string = '#000000'
    ) {
        this.nameInLog = nameInLog;
        this.priority = priority;
        this.displayName = displayName ?? nameInLog;
        this.color = color;
    }
}

class LogLine {
    message: string;
    severity: LogSeverity;
    timestamp: Date;

    constructor(message: string, severity: LogSeverity, timestamp: Date) {
        this.message = message;
        this.severity = severity;
        this.timestamp = timestamp;
    }
}

export {
    LogLine,
    LogSeverity,
};
