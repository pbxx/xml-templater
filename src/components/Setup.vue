<script setup lang="ts">
import { ref, toRaw} from "vue"
import Papa, { type ParseResult } from "papaparse"

interface FlowItem {
    selector: string
    operateOn: "value" | "id" | "name"
    action: "replace" | "remove"
    with: "column" | "dt" | "static"
    column?: number
    value?: string
    dtformat?: string

}

const xmlText = ref<string>("")
const csv = ref<ParseResult<unknown>>()
const hasHeaders = ref<boolean>(false)
const currentFlowItems = ref<Array<FlowItem>>([])

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
            xmlText.value = text
            console.log(text)
            console.log(toRaw(xmlText.value))
        }
    },
    csv: async function (e: Event) {
        const files = (e.target as HTMLInputElement).files
        if (files && files.length) {
            csv.value = Papa.parse(await files[0].text())
            console.log(toRaw(csv.value.data))
        }

    }

}

const flowItems = {
    new: function() {
        currentFlowItems.value.push({
            selector: "",
            operateOn: "id",
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
        <div class="flows"></div>
        <div class="setup">
            <span class="step">Step 1)</span>
            <span>Select a base <strong>XML</strong> configuration file</span>
            <input type="file" @change="processFiles.xml" />
            <span class="step">Step 2)</span>
            <span>Select a <strong>CSV</strong> file to get data from</span>
            <input type="file" @change="processFiles.csv" />
            <span class="step">Step 3)</span>
            <span>Configure a flow for editing the XML data</span>

            <button @click="flowItems.new">Add flow item</button>
            <div class="flowItem" v-for="(flowItem, i) of currentFlowItems">
                <div class="inputGroup">
                    <span>CSS Selector:</span>
                    <input type="text" v-model="flowItem.selector" />
                </div>
                <div class="inputGroup">
                    <span>Operate on:</span>
                    <select v-model="flowItem.operateOn">
                        <option value="value">Value</option>
                        <option value="id">ID</option>
                        <option value="name">Name</option>
                    </select>
                </div>
                <div class="inputGroup">
                    <span>Action:</span>
                    <select v-model="flowItem.action">
                        <option value="replace">Replace</option>
                        <option value="remove">Remove</option>
                    </select>
                </div>
                <div v-if="flowItem.action == 'replace'" class="inputGroup">
                    <span>Replace with:</span>
                    <select v-model="flowItem.with">
                        <option value="column">Column value</option>
                        <option value="dt">Date or time</option>
                        <option value="static">Static value</option>
                    </select>
                </div>
                <div v-if="flowItem.with == 'column' && flowItem.action != 'remove'" class="inputGroup">
                    <span>Column:</span>
                    <select v-model="flowItem.column">
                        <option value="0">0</option>
                    </select>
                </div>
                <div v-if="flowItem.with == 'dt' && flowItem.action != 'remove'" class="inputGroup">
                    <span>Format:</span>
                    <input type="text" v-model="flowItem.dtformat" />
                </div>
                <div v-if="flowItem.with == 'static' && flowItem.action != 'remove'" class="inputGroup">
                    <span>Static value:</span>
                    <input type="text" v-model="flowItem.value" />
                </div>
            </div>

            <button @click="downloadText('This is some awesome content', 'awesome.xml')">Test Downloading Something</button>
        </div>
        <div class="example">
            <div>
                <highlightjs :code="xmlText" />
            </div>
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

.flows {
    grid-area: flows;
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

.step {
    font-weight: bold;
    font-size: 1.8rem;
    margin-top: 18px;
    color: var(--themeColor);
}
</style>
