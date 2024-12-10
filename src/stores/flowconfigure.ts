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
            var elem = null
			const errorNode = doc.querySelector("parsererror")
			if (errorNode) {
				console.log("error while parsing")
			} else {
				
				try {
					elem = doc.querySelector(item.selector)
					// console.log(elem? elem : "No item found")
				} catch (e) {
					// console.log("No item found")
				}
			}
			console.log(elem? true : false)
			if (elem) {
				// found item at provided selector
				function getReplaceData() {
					switch (item.with) {
						case "column": {
							// return column value at index
							if (csvObj.value) {
								// csv loaded
								// locate row
								if (Array.isArray(csvObj.value.data)) {
									const row = csvObj.value.data[index || exampleIndex.value]
									if (Array.isArray(row)) {
										// thanks typescript
										// locate column within row
										const val = row[item.column ? item.column : 0]
										return val
									} else {
										return "csv error in column"
									}
								} else {
									return "csv error in row"
								}
							}
                            break
						}
						case "dt": {
							// return current date and time
							return "coming soon..."
                            break
						}
						case "static": {
							return item.value
                            break
						}
					}
				}
				switch (item.operateOn) {
					case "value": {
                        console.log(item.operateOn)
						if (item.action == "replace") {
							elem.innerHTML = getReplaceData()
						} else {
                            elem.remove()
                        }
                        break
					}
					case "id": {
                        if (item.action == "replace") {
							elem.setAttribute("id", getReplaceData())
						} else {
                            elem.remove()
                        }
                        break
					}
					case "name": {
                        if (item.action == "replace") {
							elem.setAttribute("name", getReplaceData())
						} else {
                            elem.remove()
                        }
                        break
					}
				}
			}
		}
		const serializer = new XMLSerializer()
		const modified = serializer.serializeToString(doc)

		return modified
	}

	return { xmlText, csvObj, hasHeaders, currentFlowItems, setCSV, setXML, renderXML, exampleRender, exampleIndex }
})
