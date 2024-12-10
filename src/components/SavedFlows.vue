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
    <div>
        
    </div>
</template>

<style>

</style>
