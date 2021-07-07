<script lang="ts">
	import logStore from './logStore';
	import activeConfigStore from './activeConfigStore';
	import parseLogs from './parseLogs';
	import { formatISO } from 'date-fns';
	import { get } from 'svelte/store';

	function handleFileUpload(e: any) {
		const file = e.target.files[0];

		const reader = new FileReader();
		reader.onload = () => {
			const result = reader.result;
			if (typeof result !== "string") {
				console.error("Invalid type from file upload!");
				return;
			}

			// The fact that Svelte made "get" a helper function (that isn't even performant [it's just a helper that subscribes and unsubscribes]) is a giant joke, imo
			logStore.set(parseLogs(result, get(activeConfigStore)));
		};
		reader.readAsText(file);
	}
</script>

<main>
	<input id="log-upload" type="file" on:change={handleFileUpload} />
	<table>
		<thead>
			<tr>
				<th>Timestamp</th>
				<th>Severity</th>
				<th>Message</th>
			</tr>
		</thead>
		<tbody>
			{#each $logStore as logLine}
				<tr style="color: {logLine.severity.color}">
					<td>{formatISO(logLine.timestamp)}</td>
					<td>{logLine.severity.displayName}</td>
					<td>{logLine.message}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</main>
