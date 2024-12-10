interface FlowItem {
    selector: string
    operateOn: "content" | "attr"
    action: "replace" | "remove"
    attribute: string
    with: "column" | "dt" | "static"
    column: number
    value: string
    dtformat: string

}