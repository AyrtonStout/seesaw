<script lang="ts">
    import activeLogStore from "./activeConfigStore";

    import configVisibleStore from './log-config/configVisibleStore';

    function save() {
        console.log('Saving config')
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
        <h3>Timestamp</h3>
        <label class="section-label">
            Format
            <input class="long-width" value={$activeLogStore.timestampFormat}>
        </label>
        <label class="section-label">
            Regex Group
            <input class="small-width" value={$activeLogStore.timestampGroup}>
        </label>
    </div>

    <div class="section">
        <h3>Severity</h3>
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
        <h3>Message</h3>
        <label class="section-label">
            Regex Group
            <input class="small-width" value={$activeLogStore.messageGroup}>
        </label>
    </div>

    <div>
        <button>Save</button>
        <button on:click={() => configVisibleStore.set(false)}>Cancel</button>
    </div>
</div>
