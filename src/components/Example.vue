<script setup lang="ts">
import { ref, defineProps } from "vue"
// import type { PropType, Ref } from "vue"

interface Props {
    index?: number
}

import { useFlowConfigStore } from "@/stores/flowconfigure"
const configStore = useFlowConfigStore()

const props = defineProps<Props>()
</script>

<template>
    <div>
        <highlightjs :code="configStore.xmlText" />
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

.example div {
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
