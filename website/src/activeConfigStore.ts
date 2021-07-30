import { writable } from 'svelte/store';
import { CustomLogColumn, LogConfig } from './LogConfig';
import { LogSeverity } from './LogLyfe';

const createActiveConfigStore = () => {
    return writable<LogConfig>(defaultConfig);
};

const logSeverities = [
    new LogSeverity(
        "DEBUG",
        1,
        "debug",
        "#777777",
    ),
    new LogSeverity(
        "DEBUG1",
        1,
        "debug",
        "#777777",
    ),
    new LogSeverity(
        "INFO",
        2,
        "info",
        "#000000",
    ),
    new LogSeverity(
        "WARN",
        3,
        "warn",
        "#FFFF00",
    ),
    new LogSeverity(
        "ERROR",
        4,
        "error",
        "#FF0000",
    ),
    new LogSeverity(
        "CRIT",
        5,
        "crit",
        "#FF0000",
    ),
]

const defaultConfig = new LogConfig(
    "Sick log",
    /^\[([0-9]{4}-[0-9]{2}-[0-9]{2} [0-9:]{8} \([\-0-9]{4,8}\))](\[[\-0-9]{4,5}])\[([a-zA-Z0-9]{4,6})]\[TID ([a-zA-Z0-9]{1,8})]\[([a-zA-Z0-9.:]*)]\[([a-zA-Z0-9.:$<>]*)](.*)$/,
    'yyyy-MM-dd HH:mm:ss (xx)',
    logSeverities,
    [
        new CustomLogColumn("Thread", 4),
        new CustomLogColumn("File", 5),
        new CustomLogColumn("Function", 6),
    ],
    1,
    3,
    7
)

export default createActiveConfigStore();
