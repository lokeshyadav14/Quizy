<template>
  <div class="center-container">
    <div class="greeting">
      <span>Nice, {{ userName }}</span>
      <img src="/smiley-face.png" alt="Smiley Face" class="icon" />
    </div>
    <div class="score">
      <span>You scored {{ Math.round(((score / 15) * 100) * 100) / 100 }}%</span>
      <img src="/checkmark.png" alt="Checkmark" class="icon" />
    </div>
    <div>{{ score }} correct out of 15.</div>
    <div class="feedback">See all the correct answers below.</div>
    <button @click="endQuiz">Or Go To Home</button>
  </div>
  <hr />
</template>

<script>
export default {
  props: {
    userName: String,
    score: Number,
  },
  emits: ['end-quiz'],
  data() {
    return {};
  },
  watch: {},
  methods: {
    endQuiz() {
      this.$emit('end-quiz');
    },
  },
};
</script>

<style scoped>
.center-container {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: 60vh;
  text-align: center;
}

.greeting {
  color: #3498db;
  font-size: 34px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
}

.icon {
  margin-left: 10px;
  height: 40px;
  width: 40px;
}

.score {
  font-size: 28px;
  color: #2ecc71;
  display: flex;
  align-items: center;
}

.feedback {
  font-size: 24px;
  color: #555;
  margin-top: 30px;
}

button {
  margin-top: 20px;
  background-color: #3498db;
  border: 2px solid #2980b9;
  color: #ffffff;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
}

button:hover {
  background-color: #2980b9;
}
</style>
