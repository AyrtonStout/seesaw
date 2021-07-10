<script lang="ts">
	import activeLogStore from "./activeConfigStore";
	import { get } from "svelte/store";
    import {LogLine} from "./LogLyfe";

    import configVisibleStore from './log-config/configVisibleStore';

	function save() {
		console.log('Saving config')
	}

</script>

<style>
	#config-edit {
        padding: 10px;
	}
</style>

<div id="config-edit">
    <div>
        <strong>Regular Expression</strong>
        <input value={$activeLogStore.logRegex}>
    </div>

    <div>
        <strong>Timestamp</strong>
        <label>
            Format
            <input value={$activeLogStore.timestampFormat}>
        </label>
    </div>

    <div>
        <button>Save</button>
        <button on:click={() => configVisibleStore.set(false)}>Cancel</button>
    </div>
</div>
