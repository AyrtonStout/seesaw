<script lang="ts">
	import { process_file } from '../public/build/wasm_parser'

	export let name: string;

	const parseRegex = /^\[([0-9]{4}-[0-9]{2}-[0-9]{2} [0-9:]{8} \([\-0-9]{4,8}\))](\[[\-0-9]{4,5}])\[([a-zA-Z0-9]{4,6})]\[TID ([a-zA-Z0-9]{1,8})]\[([a-zA-Z0-9.:]*)]\[([a-zA-Z0-9.:$<>]*)](.*)$/

    function processFileJs(fileContent: string) {
		const parsedResults: Array<RegExpMatchArray> = []
		let lastEntry: RegExpMatchArray

		const start = new Date();

		fileContent.split('\n').forEach(line => {
			const results = line.match(parseRegex)
			// If the result did not match, then presume that the log message contained newlines and should be associated to the previous value
			if (results == null) {
				const lastString = lastEntry[lastEntry.length - 1]
				lastEntry[lastEntry.length - 1] = lastString + "\n" + line

				return
			}

			lastEntry = results
			parsedResults.push(lastEntry)
		})

		const end = new Date();
		const time = end.getTime() - start.getTime();

		console.log(parsedResults)

		console.info(`Took ${time}`)
	}

	function processFileWasm(fileContent: string) {
		const start = new Date();

		const rustResult = process_file(fileContent)

		const end = new Date();
		const time = end.getTime() - start.getTime();

		console.log(rustResult)

		console.info(`Took ${time}`)
	}

	function handleFileUpload(e) {
		const file = e.target.files[0]
		console.log('Changed', file)

		const reader = new FileReader();
		reader.onload = () => {
			const result = reader.result
		    if (typeof result !== 'string') {
		    	console.error('Invalid type from file upload!')
				return
			}

		    processFileJs(result)
			processFileWasm(result)
		};
		reader.readAsText(file);
	}
</script>

<main>
	<h1>Hello {name}!</h1>
	<p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>

	<input id="log-upload" type="file" on:change={handleFileUpload}>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>