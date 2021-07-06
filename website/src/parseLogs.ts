import { LogLine, LogSeverity } from './LogLyfe';
import { LogConfig } from './LogConfig';
import { parse } from 'date-fns';

const unknownSeverity = new LogSeverity(
	"UNKNOWN",
	10
)

// FIXME: temporary until this is saved and read from JSON or w/e
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

export default (fileContent: string): Array<LogLine> => {
	const config = new LogConfig(
		/^\[([0-9]{4}-[0-9]{2}-[0-9]{2} [0-9:]{8} \([\-0-9]{4,8}\))](\[[\-0-9]{4,5}])\[([a-zA-Z0-9]{4,6})]\[TID ([a-zA-Z0-9]{1,8})]\[([a-zA-Z0-9.:]*)]\[([a-zA-Z0-9.:$<>]*)](.*)$/,
		'yyyy-MM-dd HH:mm:ss (xx)',
		logSeverities,
		1,
		3,
		7
	)

	const parsedResults: Array<LogLine> = [];

	fileContent.split('\n').forEach(line => {
		const results = line.match(config.logRegex);
		// If the result did not match, then presume that the log message contained newlines and should be associated to the previous value
		if (results == null) {
			const lastLogLine = parsedResults.slice(-1)[0];
			lastLogLine.message.concat(`\n${line}`);

			return;
		}

		const logLine = new LogLine(
			results[config.messageGroup],
			config.logSeverities.get(results[config.severityGroup]) ?? unknownSeverity,
			parse(results[config.timestampGroup], config.timestampFormat, new Date())
		);

		parsedResults.push(logLine);
	})

	return parsedResults;
};
