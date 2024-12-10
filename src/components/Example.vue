<script setup lang="ts">
import { ref, defineProps } from "vue"
// import type { PropType, Ref } from "vue"

interface Props {
    index?: number
}

import { useFlowConfigStore } from "@/stores/flowconfigure"
const configStore = useFlowConfigStore()

configStore.$subscribe(() => {
    // update example render anytime the state changes
    configStore.exampleRender = configStore.renderXML()
})

const props = defineProps<Props>()
</script>

<template>
    <div>
        <button @click="configStore.exampleIndex--">Prev Row</button>
        <button @click="configStore.exampleIndex++">Next Row</button>
        <button @click="configStore.downloadExample()">Download</button>
    </div>
    <div>
        <highlightjs :code="configStore.exampleRender" />
    </div>
    <div>
        <table v-if="configStore.csvObj" class="csvTable">
            <tr v-for="(row, i) of configStore.csvObj.data">
                <th v-if="i == 0" v-for="(col, i) of row">{{ col }}</th>
                <td v-else v-for="(col, i) of row">{{ col }}</td>
            </tr>
        </table>
    </div>
</template>

<style>
/* highlightjs styles */
.example {
    background-color: var(--codeBG);
}

.example div:nth-child(1) {
    padding: 7px;
    display: flex;
    overflow: auto;
}
.example div:nth-child(1) button {
    margin-right: 2px;
    border-radius: 3px;
    padding: 2px 6px;
}
.example div:not(:nth-child(1)) {
    height: 50%;
    padding: 12px;

    display: flex;
    flex-direction: column;
    overflow: auto;
}
.example div:not(:nth-last-child(1)) {
    border-bottom: 1px solid var(--borderGray);
}
.example div pre .hljs {
    overflow-x: visible !important;
}
.csvTable td,
.csvTable th {
    padding: 8px;
    border: 1px solid var(--bodyBG);
    background-color: var(--bodyBG);
    border-radius: 12px;
    transition-duration: 80ms;

}
.csvTable tr:hover td,
.csvTable tr:hover th {
    border: 1px solid #282828;
    background-color: #282828;
    
}
.example div pre,
.hljs {
    /* min-height: 100%!important; */
    /* height: inherit; */
    background-color: #0000;
}
</style>
