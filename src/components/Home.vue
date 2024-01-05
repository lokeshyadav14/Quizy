<template>
    <div id="home" class="center-container">
        <div id="userName" class="center-content">
            <h2 for="name">Enter Your Name: </h2>
            <input type="text" v-model="userName" ref="nameInput">
        </div>
        <div id="categories" class="center-content">
            <h2>Select Categories:</h2>
            <div class="category-list">
                <div v-for="category in categories" :key="category" @click="toggleCategory(category)"
                :class="{ 'selected-category': selectedCategories.includes(category) }">
                {{ category }}
                </div>
            </div>
        </div>
        <button @click="startQuiz">Start Quiz</button>
    </div>
</template>
  
<script>
export default {
    emits: ['start-quiz'],
    data() {
        return {
            categories: [],
            selectedCategories: [],
            userName: ""
        };
    },
    watch: {
        // Watch for changes in the quizStarted flag
        '$parent.quizStarted': {
            handler(newVal) {
                if (newVal == false)
                    this.selectedCategories = [];
            },
            immediate: true, // Trigger the handler immediately when the component is created
        },
    },
    created() {
        // Fetch categories from JSON file
        this.fetchCategories();
    },
    methods: {
        toggleCategory(category) {
            const index = this.selectedCategories.indexOf(category);
            if (index === -1) {
                this.selectedCategories.push(category);
            } else {
                this.selectedCategories.splice(index, 1);
            }
        },
        startQuiz() {
            // Check if userName is empty
            if (this.userName.trim() === "") {
                this.$refs.nameInput.focus();
            }else if (this.selectedCategories.length < 2) {
                alert("Please select at least two categories.");
            }else {
                this.$emit("start-quiz", this.selectedCategories, this.userName);
            }
        },
        async fetchCategories() {
            try {
                const response = await fetch('/quizData.json');
                const data = await response.json();
                // Extract unique category names from questions
                const uniqueCategories = [...new Set(data.map(item => item.category))];
                this.categories = uniqueCategories;
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
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
    height: 80vh;
    margin-top: 60px;
}

.center-content {
    text-align: center;
    margin-bottom: 60px;
}

#userName,
#categories {
    width: 70%;
    /* Adjust the width as needed */
    max-width: 600px;
    /* Set a maximum width if desired */
    font-weight: bold;
}

input {
  padding: 10px;
  margin-top: 5px;
  width: 60%;
  box-sizing: border-box;
  border: 1px solid #ddd;
  border-radius: 5px;
}
.category-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}

.category-list div {
    cursor: pointer;
    padding: 10px;
    margin: 5px;
    border: 1px solid #ddd;
    border-radius: 5px;
}

.selected-category {
    background-color: #4caf50;
    color: #fff;
}
</style>
  