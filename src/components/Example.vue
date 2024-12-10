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
        <highlightjs :code="configStore.xmlText" />
    </div>
</template>

<style>
/* highlightjs styles */
.example {
  background-color: var(--codeBG);
}

.example div {
  height: 100%;
}
.example div pre .hljs {
  overflow-x: visible!important;
}
.example div pre, .hljs {
  /* min-height: 100%!important; */
  /* height: inherit; */
  background-color: #0000;
}
</style>