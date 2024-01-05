import { createApp } from 'vue'

import App from './App.vue'
import Header from './components/Header.vue'
import Home from './components/Home.vue'
import Quiz from './components/Quiz.vue'
import Result from './components/Result.vue'

const app = createApp(App)

app.component('header-comp', Header)
app.component('home-comp', Home)
app.component('quiz-comp', Quiz)
app.component('result-comp', Result)

app.mount('#app')
