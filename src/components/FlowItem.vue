<script setup lang="ts">
import { ref, defineProps } from "vue"
// import type { PropType, Ref } from "vue"

interface Props {
    index: number
}

import { useFlowConfigStore } from "@/stores/flowconfigure";
const configStore = useFlowConfigStore()

const props = defineProps<Props>()
</script>

<template>
    <div class="flowItem">
        <div class="inputGroup">
            <span>CSS Selector:</span>
            <input type="text" v-model="configStore.currentFlowItems[props.index].selector" />
        </div>
        <div class="inputGroup">
            <span>Operate on:</span>
            <select v-model="configStore.currentFlowItems[props.index].operateOn">
                <option value="value">Value</option>
                <option value="id">ID</option>
                <option value="name">Name</option>
            </select>
        </div>
        <div class="inputGroup">
            <span>Action:</span>
            <select v-model="configStore.currentFlowItems[props.index].action">
                <option value="replace">Replace</option>
                <option value="remove">Remove</option>
            </select>
        </div>
        <div v-if="configStore.currentFlowItems[props.index].action == 'replace'" class="inputGroup">
            <span>Replace with:</span>
            <select v-model="configStore.currentFlowItems[props.index].with">
                <option value="column">Column value</option>
                <option value="dt">Date or time</option>
                <option value="static">Static value</option>
            </select>
        </div>
        <div v-if="configStore.currentFlowItems[props.index].with == 'column' && configStore.currentFlowItems[props.index].action != 'remove'" class="inputGroup">
            <span>Column:</span>
            <select v-model="configStore.currentFlowItems[props.index].column">
                <option value="0">0</option>
            </select>
        </div>
        <div v-if="configStore.currentFlowItems[props.index].with == 'dt' && configStore.currentFlowItems[props.index].action != 'remove'" class="inputGroup">
            <span>Format:</span>
            <input type="text" v-model="configStore.currentFlowItems[props.index].dtformat" />
        </div>
        <div v-if="configStore.currentFlowItems[props.index].with == 'static' && configStore.currentFlowItems[props.index].action != 'remove'" class="inputGroup">
            <span>Static value:</span>
            <input type="text" v-model="configStore.currentFlowItems[props.index].value" />
        </div>
    </div>
</template>
