<script lang="ts">
    import activeLogStore from './activeConfigStore';
    import { get } from 'svelte/store';
    import configVisibleStore from './log-config/configVisibleStore';
    import {CustomLogColumn} from "./LogConfig";

    function save() {
        console.log('Saving config')
    }

    function deleteCustomColumn(index) {
        const config = get(activeLogStore);

        const newColumns = config.customColumns.slice(0)
        newColumns.splice(index, 1);

        config.customColumns = newColumns;
        activeLogStore.set(config);
    }

    function addCustomColumn() {
        const customColumn = new CustomLogColumn("Custom Column", 0)

        const config = get(activeLogStore);
        const newColumns = config.customColumns.slice(0)

        newColumns.push(customColumn)

        config.customColumns = newColumns;
        activeLogStore.set(config);
    }
</script>

<style>
  #config-edit {
    padding: 10px;
  }

  input {
    background: #F2F2F2;
    border-radius: 2px;
    font-size: 17px;
    color: #686868;
    line-height: 1.2;
    padding: 0 8px;
    height: 42px;
    display: block;
    box-sizing: border-box;
    border: none;
  }

  label {
    display: inline-block;
  }

  .long-width {
    width: 300px;
  }

  .medium-width {
    width: 200px;
  }

  .medium-small-width {
    width: 75px;
  }

  .small-width {
    width: 40px;
  }

  .section-label {
    font-size: 14px;
    color: #555555;
    line-height: 1.5;
    margin-bottom: 10px;
    margin-top: 5px;
  }

  h3 {
    margin-top: 10px;
    margin-bottom: 5px;
  }

  .section {
    margin-bottom: 30px;
  }

  .severity-row {
    margin-bottom: 4px;
  }

  .color-preview {
    width: 20px;
    height: 20px;
    position: absolute;
    right: 10px;
    top: calc(50% - 10px);
  }

  .column-name {
    margin-right: 10px;
    width: 200px;
    display: inline-block;
    margin-top: 8px;
  }

  .delete-button {
    margin-left: 10px;
  }

  #add-new-custom-column {
    margin-top: 10px;
  }
</style>

<div id="config-edit">
    <h1 class="text-center">Configure Log Parsing</h1>

    <div class="section">
        <h3>Config Name</h3>
        <input class="long-width" value={$activeLogStore.configName}>
    </div>

    <div class="section">
        <h3>Regular Expression</h3>
        <input class="full-width" value={$activeLogStore.logRegex}>
    </div>

    <div class="section">
        <h3>Severities</h3>
        <label class="section-label">
            Regex Group
            <input class="small-width" value={$activeLogStore.severityGroup}>
        </label>

        <label class="section-label d-block">Severity Mapping</label>

        <div class="d-flex">
            <div class="medium-width">Log name</div>
            <div class="medium-width">Display name</div>
            <div class="medium-small-width">Priority</div>
            <div class="medium-width">Color</div>
        </div>

        {#each [...$activeLogStore.logSeverities.values()] as severity}
            <div class="d-flex severity-row">
                <input class="medium-width" value={severity.nameInLog}>
                <input class="medium-width" value={severity.displayName}>
                <input class="medium-small-width" value={severity.priority}>
                <div class="medium-width p-relative">
                    <input class="" value={severity.color}>
                    <div class="color-preview" style="background-color: {severity.color}"></div>
                </div>
            </div>
        {/each}
    </div>

    <div class="section">
        <h3>Columns</h3>
        <div>
            <div class="column-name">Timestamp</div>
            <label class="section-label">
                Regex Group
                <input class="small-width" value={$activeLogStore.timestampGroup}>
            </label>
            <label class="section-label">
                Format
                <input class="long-width" value={$activeLogStore.timestampFormat}>
            </label>
        </div>

        <div>
            <div class="column-name">Message</div>
            <input class="small-width d-inline-block" value={$activeLogStore.messageGroup}>
        </div>

        {#each $activeLogStore.customColumns as customColumn, i}
            <div>
                <input class="column-name" value={customColumn.columnName}>
                <input class="small-width d-inline-block" value={customColumn.regexGroup}>

                <button class="delete-button" on:click={() => deleteCustomColumn(i)}>Delete</button>
            </div>
        {/each}

        <div id="add-new-custom-column">
            <button on:click={addCustomColumn}>Add new</button>
        </div>
    </div>

    <div>
        <button>Save</button>
        <button on:click={() => configVisibleStore.set(false)}>Cancel</button>
    </div>
</div>
