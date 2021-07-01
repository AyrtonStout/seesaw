import { LogLine, LogSeverity } from './LogLyfe';

const parseRegex = /^\[([0-9]{4}-[0-9]{2}-[0-9]{2} [0-9:]{8} \([\-0-9]{4,8}\))](\[[\-0-9]{4,5}])\[([a-zA-Z0-9]{4,6})]\[TID ([a-zA-Z0-9]{1,8})]\[([a-zA-Z0-9.:]*)]\[([a-zA-Z0-9.:$<>]*)](.*)$/;

export default (fileContent: string): Array<LogLine> => {
	const parsedResults: Array<LogLine> = [];

	fileContent.split('\n').forEach(line => {
		const results = line.match(parseRegex);
		// If the result did not match, then presume that the log message contained newlines and should be associated to the previous value
		if (results == null) {
			const lastLogLine = parsedResults.slice(-1)[0];
			lastLogLine.message.concat(`\n${line}`);

			return;
		}

		const logLine = new LogLine(
			results[7],
			new LogSeverity(results[3], 1),
			new Date(results[1])
		);

		parsedResults.push(logLine);
	})

	return parsedResults;
};
