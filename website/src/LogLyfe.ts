import { format } from 'date-fns';
import error from "svelte/types/compiler/utils/error";

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
    customColumns: Map<string, string>

    constructor(message: string, severity: LogSeverity, timestamp: Date, customColumns: Map<string, string>) {
        this.message = message;
        this.severity = severity;
        this.timestamp = timestamp;
        this.customColumns = customColumns;
    }

    getAsIterables(sortOrder: Array<string>): Array<string> {
        const formattedTimestamp = format(this.timestamp, 'yyyy-MM-dd HH:mm:ss.t');
        const timestamp = formattedTimestamp.substr(0, formattedTimestamp.length - 7);

        return sortOrder.map(columnName => {
            if (columnName == "Timestamp") {
                return timestamp;
            } else if (columnName == "Severity") {
                return this.severity.displayName;
            } else if (columnName == "Message") {
                return this.message;
            } else {
                const customValue = this.customColumns.get(columnName)
                if (customValue === null || customValue === undefined) {
                    throw `A column with name ${columnName} was specified but was not passed to LogLine! This is a programming bug, not a configuration error`;
                } else {
                    return customValue;
                }
            }
        })
    }
}

export {
    LogLine,
    LogSeverity,
};
