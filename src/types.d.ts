interface FlowItem {
    selector: string
    operateOn: "value" | "id" | "name"
    action: "replace" | "remove"
    with: "column" | "dt" | "static"
    column?: number
    value?: string
    dtformat?: string

}