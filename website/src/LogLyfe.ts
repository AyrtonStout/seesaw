class LogSeverity {
    severityNameLikeInTheLogLikeDebugOrErrorOrSomething: string;
    priority: number;
    displayName: string;
    color: string;

    constructor(
        severityNameLikeInTheLogLikeDebugOrErrorOrSomething: string,
        priority: number,
        displayName?: string,
        color: string = '#000000'
    ) {
        this.severityNameLikeInTheLogLikeDebugOrErrorOrSomething = severityNameLikeInTheLogLikeDebugOrErrorOrSomething;
        this.priority = priority;
        this.displayName = displayName ?? severityNameLikeInTheLogLikeDebugOrErrorOrSomething;
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
