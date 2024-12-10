import { ref, computed } from "vue"
import { defineStore } from "pinia"
import type { ParseResult } from "papaparse"

export const useFlowConfigStore = defineStore("flowconfig", () => {
	const xmlText = ref<string>("")
	const csvObj = ref<ParseResult<unknown>>()
	const csvText = ref<string>()
	const hasHeaders = ref<boolean>(false)
	const currentFlowItems = ref<Array<FlowItem>>([])

	// const doubleCount = computed(() => count.value * 2)
    function setCSV(csv: ParseResult<unknown>, text: string) {
        csvObj.value = csv
        csvText.value = text
    }
    function setXML(text: string) {
        xmlText.value = text
    }
    

	return { xmlText, csvObj, hasHeaders, currentFlowItems, setCSV, setXML }
})
