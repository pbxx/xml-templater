<script setup lang="ts">
import { ref, toRaw} from "vue"
import Papa, { type ParseResult } from "papaparse"

import FlowItem from "./FlowItem.vue"
import Example from "./Example.vue"
import SavedFlows from "./SavedFlows.vue"

import { useFlowConfigStore } from "@/stores/flowconfigure";


// const xmlText = ref<string>("")
// const csv = ref<ParseResult<unknown>>()
// const hasHeaders = ref<boolean>(false)
// const currentFlowItems = ref<Array<FlowItem>>([])
const configStore = useFlowConfigStore()

async function downloadText(content: string, filename: string) {
    const link = document.createElement("a")
    const file = new Blob([content], { type: "text/plain" })
    link.href = URL.createObjectURL(file)
    link.download = filename
    link.click()
    URL.revokeObjectURL(link.href)
    link.remove()
}

const processFiles = {
    xml: async function (e: Event) {
        const files = (e.target as HTMLInputElement).files
        if (files && files.length) {
            const text = await files[0].text()
            configStore.xmlText = text
            // console.log(text)
            // console.log(toRaw(configStore.xmlText))

            // render xml
            configStore.exampleRender = configStore.renderXML()
        }
    },
    csv: async function (e: Event) {
        const files = (e.target as HTMLInputElement).files
        if (files && files.length) {
            const csvText = await files[0].text()
            configStore.setCSV(Papa.parse(csvText), csvText)
            console.log(toRaw(configStore.csvObj))
        }

    }

}

const flowItems = {
    new: function() {
        configStore.currentFlowItems.push({
            selector: "",
            operateOn: "content",
            attribute: "",
            action: "replace",
            with: "column",
            column: 0,
            value: "",
            dtformat: "MM-DD-YYYY",

        })
    }
}
</script>

<template>
    <div class="container">
        <div class="flows pane">
            <SavedFlows></SavedFlows>
        </div>
        <div class="setup pane">
            <span class="step">Step 1)</span>
            <span>Select a base <strong>XML</strong> configuration file</span>
            <input type="file" @change="processFiles.xml" />
            <span class="step">Step 2)</span>
            <span>Select a <strong>CSV</strong> file to get data from</span>
            <input type="file" @change="processFiles.csv" />
            <div class="checkboxBox">
                <input type="checkbox" v-model="configStore.hasHeaders">My data has headers
            </div>
            
            <span class="step">Step 3)</span>
            <span>Configure a flow for editing the XML data</span>

            <FlowItem v-for="(flowItem, i) of configStore.currentFlowItems" :index="i"></FlowItem>

            <button @click="flowItems.new">Add flow item</button>

            <button @click="downloadText('This is some awesome content', 'awesome.xml')">Test Downloading Something</button>
        </div>
        <div class="example pane">
            <Example></Example>
        </div>
    </div>
</template>

<style scoped>
.container {
    display: grid;
    grid-template-columns: 0.5fr 1.3fr 1.2fr;
    grid-template-rows: 1fr;
    gap: 0px 0px;
    grid-auto-flow: row;
    grid-template-areas: "flows setup example";
    height: 100%;
}
.container .pane {
    border: .5px solid var(--borderGray);
    border-left: 0px;
}

.flows {
    grid-area: flows;
    background-color: var(--codeBG);
}

.flows div {
    height: 100%;
}

.setup {
    grid-area: setup;
    display: flex;
    flex-direction: column;
    padding: 18px;
    height: 100%;
    overflow: hidden auto;
}

.example {
    grid-area: example;
    display: flex;
    flex-direction: column;
    overflow: auto;
    max-height: 100%;
    font-size: 0.98rem;
}
.example div {
    /* height: 200px; */
    /* width: 200px; */
    overflow: auto;
}

.setup,
input,
button {
    font-size: 1.2rem;
}

.setup > * {
    margin-bottom: 18px;
}
.setup > *:nth-last-child(2) {
    margin-bottom: 48px;
}

/* for checkboxes */
.setup.pane > div {
    display: flex;
}
.checkboxBox {
    font-size: .9rem;
}
.checkboxBox > * {
    margin-right: 8px;
}

.step {
    font-weight: bold;
    font-size: 1.8rem;
    margin-top: 18px;
    color: var(--themeColor);
}
</style>
