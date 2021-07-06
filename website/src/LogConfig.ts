import type { LogSeverity } from "./LogLyfe";

export class LogConfig {
    logRegex: RegExp;
    timestampFormat: string;
    logSeverities: Map<string, LogSeverity>

    timestampGroup: number
    severityGroup: number
    messageGroup: number

    constructor(
        logRegex: RegExp,
        timestampFormat: string, // https://date-fns.org/v2.22.1/docs/parse
        logSeverities: Array<LogSeverity>,
        timestampGroup: number,
        severityGroup: number,
        messageGroup: number,
    ) {
        this.logRegex = logRegex
        this.timestampFormat = timestampFormat

        this.timestampGroup = timestampGroup
        this.severityGroup = severityGroup
        this.messageGroup = messageGroup

        const severityLogNameToLogSeverity = new Map<string, LogSeverity>()
        logSeverities.forEach(severity => {
            severityLogNameToLogSeverity.set(severity.severityNameLikeInTheLogLikeDebugOrErrorOrSomething, severity)
        })

        this.logSeverities = severityLogNameToLogSeverity
    }
}