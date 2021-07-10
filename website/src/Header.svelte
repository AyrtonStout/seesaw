<script lang="ts">
	import activeConfigStore from './activeConfigStore';
	import configVisibleStore from './log-config/configVisibleStore';
	import logStore from "./logStore";
	import parseLogs from "./parseLogs";
	import { get } from "svelte/store";

	function editLogConfig() {
        configVisibleStore.set(true);
	}

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
			const logs = parseLogs(result, get(activeConfigStore))
			logStore.set(logs);
		};
		reader.readAsText(file);
	}
</script>

<style>
	#header {
		display: flex;
		justify-content: space-between;
		border-bottom: 1px black solid;
		padding: 5px;
	}
</style>

<div id="header">
	<span>
		Upload log file:
		<input id="log-upload" type="file" on:change={handleFileUpload} />
	</span>
	<span>
		Active config:
		<button on:click={editLogConfig}>{$activeConfigStore.configName}</button>
	</span>
</div>
