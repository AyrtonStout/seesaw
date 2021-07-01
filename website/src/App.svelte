<script lang="ts">
	import logStore from "./logStore";
	import parseLogs from "./parseLogs";

	function handleFileUpload(e: any) {
		const file = e.target.files[0];
		console.log("Changed", file);

		const reader = new FileReader();
		reader.onload = () => {
			const result = reader.result;
			if (typeof result !== "string") {
				console.error("Invalid type from file upload!");
				return;
			}

			logStore.set(parseLogs(result));
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
				<tr>
					<td>{logLine.timestamp}</td>
					<td>{logLine.severity.displayName}</td>
					<td>{logLine.message}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</main>
