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
    <div class="savedFlows">
        <span>Saved flows coming soon...</span>
    </div>
</template>

<style>
    .savedFlows {
        color: #fff5;
        padding: 11px;
        font-style: italic;
    }
</style>
