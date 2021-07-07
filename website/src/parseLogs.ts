import { LogLine, LogSeverity } from './LogLyfe';
import type { LogConfig } from './LogConfig';
import { parse } from 'date-fns';

const unknownSeverity = new LogSeverity(
	"UNKNOWN",
	10
)

export default (fileContent: string, config: LogConfig): Array<LogLine> => {
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
