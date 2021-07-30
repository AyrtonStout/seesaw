<script lang="ts">
	import activeLogStore from './activeConfigStore';
	import ConfigEdit from './ConfigEdit.svelte';
	import configVisibleStore from './log-config/configVisibleStore';
	import logStore from './logStore';
	import Header from './Header.svelte';
	import VirtualList from '@sveltejs/svelte-virtual-list';

	const timestampWidth = 300;
	const severityWidth = 100;

	let viewportHeight = 0;
	let siteHeaderHeight = 0;
	let tableHeaderHeight = 0;

	function closeModal() {
		configVisibleStore.set(false);
	}
</script>

<style>
	.column {
		flex-shrink: 0;
	}

	#config-edit-modal-background {
		position: absolute;
		width: 100%;
		height: 100%;
		background-color: #00000099;
	}

	#config-edit-modal {
		width: 1200px;
		height: 80vh;
		overflow: auto;
		margin: 80px auto;
		background-color: #FFFFFF;
	}
</style>

<svelte:window bind:innerHeight={viewportHeight} />

<main class="full-height flex-column">
	<span bind:clientHeight={siteHeaderHeight}>
		<Header/>
	</span>

	<div class="flex-column flex-grow-1">
		<div class="d-flex" bind:clientHeight={tableHeaderHeight}>
			{#each $activeLogStore.columnOrder as columnTitle}
				<div class="column" style="width: {timestampWidth}px">{columnTitle}</div>
			{/each}
		</div>

		<div class="flex-grow-1">
            <!-- If you omit the height, it sets to 100%, which seems like it would be what we want. But it lags uncontrollably -->
            <!-- I have tried binding variables here to set the height dynamically. Even though it is set correctly in the HTML, nothing appears -->
			<VirtualList items={$logStore} let:item height="1000px">
				<div class="d-flex" style="color: {item.severity.color}">
					{#each item.getAsIterables($activeLogStore.columnOrder) as columnValue}
						<div class="column" style="width: {timestampWidth}px">{columnValue}</div>
					{/each}
				</div>
			</VirtualList>
		</div>
	</div>

	<div id="config-edit-modal-background" style="visibility: {$configVisibleStore ? 'visible' : 'hidden'}" on:click={closeModal}>
		<div id="config-edit-modal" on:click={e => e.stopPropagation()}>
			<ConfigEdit/>
		</div>
	</div>
</main>
