<template>
  <div>
    <header-comp/>
    <component :is="activeComp" @start-quiz="startQuiz" @end-quiz="endQuiz" @quiz-submitted="quizSubmitted"></component>
  </div>
</template>


<script>
export default {
    data() {
      return {
        quizStarted: false,
        selectedCategories: [],
        userName: "",
        stopTimerBool:false
      }
    },
    computed: {
      activeComp() {
        if(this.quizStarted) {
          return 'quiz-comp'
        }
        else {
          return 'home-comp'
        }
      }
    },
    methods: {
      startQuiz(selectedCategories, userName) {
        this.quizStarted = true;
        this.selectedCategories = selectedCategories;
        this.userName = userName;
      },
      endQuiz() {
        this.quizStarted = false;
        this.selectedCategories = [];
        this.userName = "";
        this.stopTimerBool = false;
      },
      quizSubmitted() {
        this.stopTimerBool = true;
        // alert("quizSubmitted in app- ", this.stopTimerBool);
      }
    }
  }
</script>


<style>
button {
  display: inline-block;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  border: 2px solid #3498db;
  border-radius: 5px;
  color: #ffffff;
  background-color: #3498db;
  transition: background-color 0.3s, color 0.3s;
}

button:hover {
  background-color: #2980b9;
  color: #ffffff;
}
</style>