<template>
  <div id="quiz-container">
    <result-comp v-if="quizSubmitted" @end-quiz="endQuiz" :userName="userName" :score="score" />
    <!-- Display questions and options -->
    <div v-for="(question, index) in questions" :key="index" class="question-container">
      <h3 class="question">{{ (index+1) + ". " + question.que }}</h3>
      <div v-for="(option, optionIndex) in question.options" :key="optionIndex" class="option-container">
        <input type="radio" :id="`q${index}o${optionIndex}`" :value="option" v-model="selectedAnswers[index]" :disabled="quizSubmitted"/>
        <label :for="`q${index}o${optionIndex}`" :class="{ 'correct-answer': option === question.ans && quizSubmitted }" class="option-label">{{ option }}</label>
      </div>
      <hr>
    </div>
  
    <!-- Submit button -->
    <div id="buttonDiv">
    <button @click="submitQuiz" id="btn">Submit</button>
  </div>
    <hr>
  </div>
</template>

<script>
export default {
  emits: ['end-quiz', 'quiz-submitted'],
  data() {
    return {
      questions: [],
      quizSubmitted: false,
      selectedCategories: [],
      userName: "",
      score: 0,
      selectedAnswers: Array(15).fill(''), // Array to store selected answers for each question
    };
  },
  watch: {
    '$parent.selectedCategories': {
      handler(newVal) {
        this.selectedCategories = newVal;
        if (!this.selectedCategories || this.selectedCategories.length === 0) {
          console.error("Selected Categories are empty.");
        }
        else {
          this.createQuiz();
        }
      },
      immediate: true, // Trigger the handler immediately when the component is created
    },
    '$parent.userName': {
      handler(newVal) {
        this.userName = newVal;
      },
      immediate: true, // Trigger the handler immediately when the component is created
    },
  },
  methods: {
    submitQuiz() {
      // Logic to handle quiz submission
      if (this.quizSubmitted) return;
      this.calculateScore();
      this.quizSubmitted = true;
      this.$emit('quiz-submitted'); // to stop the timer
      // alert("emitted from quiz");
      // Scroll to the top of the page
      window.scrollTo({
        top: 0,
        behavior: "smooth", // Optional: for smooth scrolling
      });
      document.getElementById("btn").classList.add("submitted");
    },
    endQuiz() {
      this.quizSubmitted = false;
      this.selectedCategories = [];
      this.$emit('end-quiz');
      this.score = 0;
      this.userName = "";
      this.selectedAnswers = Array(15).fill('');
    },
    async createQuiz() {
      try {
        const response = await fetch('/quizData.json');
        const data = await response.json();
        
        // alert(data);
        // Filter questions based on selected categories
        this.questions = data.filter(question => this.selectedCategories.includes(question.category));

        // Shuffle questions and select only the first 15
        this.questions = this.shuffleArray(this.questions).slice(0, 15);
      } catch (error) {
        console.error('Error fetching quiz data:', error);
      }
    },
    shuffleArray(array) {
      // Function to shuffle an array using Fisher-Yates algorithm
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    },
    calculateScore() {
      // Logic to calculate the score based on selected answers
      this.score = this.selectedAnswers.reduce((totalScore, answer, index) => {
        const correctAnswer = this.questions[index].ans;
        return totalScore + (answer === correctAnswer ? 1 : 0);
      }, 0);
    },
  },
};
</script>

<style scoped>
#quiz-container {
  margin-top: 75px;
}
/* Center the questions */
.question-container {
  text-align: center;
  margin-bottom: 30px;
  margin-top: 35px;
}

/* Style for questions */
.question {
  font-size: 20px;
  margin-bottom: 10px;
}

/* Style for options */
.option-container {
  display: flex;
  flex-direction: column; /* Align options in a column */
  align-items: center;
}

input[type="radio"] {
  margin-top: 8px; /* Adjust the spacing between the radio button and label */
}

.correct-answer {
  background-color: #2ecc71; /* Change to your desired color */
  color: #ffffff; /* Change to your desired text color */
}
.option-label {
  margin-left: 5px;
  padding: 5px;
  font-size: 18px;
  max-width: 500px;
  min-width: 300px;
}
#buttonDiv {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    margin: 30px;
}
#btn {
  background-color: #3498db;
  transition: background-color 0.3s;
}
#btn:hover {
  background-color: #2980b9;
  color: #ffffff;
}
#btn.submitted {
  background-color: #2980b9;
}

</style>
