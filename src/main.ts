import 'highlight.js/styles/a11y-dark.css'
import "./assets/main.css"


import { createApp } from "vue"
import { createPinia } from "pinia"

import App from "./App.vue"
import router from "./router"

import hljs from "highlight.js/lib/core"
import hlXML from "highlight.js/lib/languages/xml"
import hljsVuePlugin from "@highlightjs/vue-plugin";
hljs.registerLanguage("xml", hlXML)

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(hljsVuePlugin)

app.mount("#app")
