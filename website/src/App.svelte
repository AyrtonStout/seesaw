<script lang="ts">
	import logStore from './logStore';
	import Header from './Header.svelte';
	import { formatISO } from 'date-fns';
	import VirtualList from '@sveltejs/svelte-virtual-list';

	const timestampWidth = 300;
	const severityWidth = 100;
</script>

<style>
	.column {
		flex-shrink: 0;
	}
</style>

<main class="full-height flex-column">
	<Header/>
	<div class="flex-column flex-grow-1">
		<div class="d-flex">
			<div class="column" style="width: {timestampWidth}px">Timestamp</div>
			<div class="column" style="width: {severityWidth}px">Severity</div>
			<div style="">Message</div>
		</div>

		<div class="flex-grow-1">
            <!-- If you omit the height, it sets to 100%, which seems like it would be what we want. But it lags uncontrollably -->
			<VirtualList items={$logStore} let:item height="1800px">
				<div class="d-flex" style="color: {item.severity.color}">
					<div class="column" style="width: {timestampWidth}px">{formatISO(item.timestamp)}</div>
					<div class="column" style="width: {severityWidth}px">{item.severity.displayName}</div>
					<div style="">{item.message}</div>
				</div>
			</VirtualList>
		</div>
	</div>
</main>
