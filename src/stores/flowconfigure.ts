import { ref, computed } from "vue"
import { defineStore } from "pinia"
import type { ParseResult } from "papaparse"

export const useFlowConfigStore = defineStore("flowconfig", () => {
	const xmlText = ref<string>("")
	const csvObj = ref<ParseResult<unknown>>()
	const csvText = ref<string>()
	const hasHeaders = ref<boolean>(false)
	const currentFlowItems = ref<Array<FlowItem>>([])
	const exampleRender = ref<string>("")
	const exampleIndex = ref<number>(0)

	// const doubleCount = computed(() => count.value * 2)
	function setCSV(csv: ParseResult<unknown>, text: string) {
		csvObj.value = csv
		csvText.value = text
	}
	function setXML(text: string) {
		xmlText.value = text
	}

	function renderXML(index?: number): string {
		// render XML at current index with current flow items
		const parser = new DOMParser()
		const doc = parser.parseFromString(xmlText.value, "application/xml")

		for (var item of currentFlowItems.value) {
			// apply each flow item
			const errorNode = doc.querySelector("parsererror")
			if (errorNode) {
				console.log("error while parsing")
			} else {
                var elem = null
                try {
                    elem = doc.querySelector(item.selector)?.innerHTML
                    console.log(elem? elem : "No item found")
                } catch (e) {
                    console.log("No item found")
                }
				
			}
		}
		const serializer = new XMLSerializer()
		const modified = serializer.serializeToString(doc)

		return modified
	}

	return { xmlText, csvObj, hasHeaders, currentFlowItems, setCSV, setXML, renderXML, exampleRender, exampleIndex }
})
