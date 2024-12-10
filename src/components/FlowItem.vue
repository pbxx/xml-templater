<script setup lang="ts">
import { ref, defineProps } from "vue"
// import type { PropType, Ref } from "vue"

interface Props {
    index: number
}

import { useFlowConfigStore } from "@/stores/flowconfigure"
const configStore = useFlowConfigStore()

const props = defineProps<Props>()
</script>

<template>
    <div class="flowItem">
        <div class="itemHeader">
            <div class="left">Step {{ props.index + 1 }}</div>
            <div class="right" @click="configStore.currentFlowItems.splice(props.index, 1)"><button class="danger">Delete</button></div>
        </div>
        
        <div class="inputGroup">
            <span>CSS Selector:</span>
            <input type="text" v-model="configStore.currentFlowItems[props.index].selector" />
        </div>
        <div class="inputGroup">
            <span>Action:</span>
            <select v-model="configStore.currentFlowItems[props.index].action">
                <option value="replace">Replace</option>
                <option value="remove">Remove</option>
            </select>
        </div>
        <div v-if="configStore.currentFlowItems[props.index].action == 'replace'" class="inputGroup">
            <span>Operate on:</span>
            <select v-model="configStore.currentFlowItems[props.index].operateOn">
                <option value="content">Content</option>
                <option value="attr">Attribute</option>
            </select>
        </div>
        <div  v-if="configStore.currentFlowItems[props.index].action == 'replace' && configStore.currentFlowItems[props.index].operateOn == 'attr'" class="inputGroup">
            <span>Attribute:</span>
            <input type="text" v-model="configStore.currentFlowItems[props.index].attribute" />
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
            <!-- <select v-model="configStore.currentFlowItems[props.index].column">
                <option value="0">0</option>
            </select> -->
            <input type="number" v-model="configStore.currentFlowItems[props.index].column" min="0" max="100"/>
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

<style scoped>
.itemHeader {
    display: flex;
    justify-content: space-between;
    background-color: #0c0c0c;
    background: linear-gradient(0deg, #505050, #727272);
    position: relative;
    top: -22px;
    margin-bottom: -10px;
    padding: 4px 10px;
    border-radius: 8px;
}
.itemHeader button {
    padding: 0px 8px;
    border-radius: 4px;
    color: #727272;
    cursor: pointer;
    
}
.itemHeader button:hover {
    padding: 0px 8px;
    border-radius: 4px;
    color: white;

}

.itemHeader div.left {
    /* background-color: var(--borderGray); */
    padding: 0px 8px;
    border-radius: 4px;
    font-size: .9rem;
    font-weight: bold;
}
.itemHeader div.right {
    display: flex;
    padding: 2px;
}
</style>
