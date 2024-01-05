<template>
    <div id="header">
        <div class="left-content"><img src="/logo.png" alt="Smiley Face" class="logo" /> Quizy</div>
        <div class="mid-content">{{ page }}</div>
        <div class="right-content">
            <div class="timer">Timer: {{ time }}</div>
        </div>
    </div>
</template>
  
<script>

export default {
    data() {
        return {
            page: 'Home',
            time: '00:00',
            timerInterval: null,
            seconds: 0,
        }
    },
    watch: {
        // Watch for changes in the quizStarted flag
        '$parent.quizStarted': {
            handler(newVal) {
                if (newVal) {
                    this.page = 'Quiz Page';
                    this.startTimer();
                } else {
                    this.page = 'Home';
                    this.time = '00:00';
                }
            },
            immediate: true, // Trigger the handler immediately when the component is created
        },
        '$parent.stopTimerBool': {
            handler(newVal) {
                // alert("quiz submitted in header- ", newVal);
                if (newVal == true)
                    this.stopTimer();
            },
            immediate: true, // Trigger the handler immediately when the component is created
        },
    },
    methods: {
        startTimer() {
            this.timerInterval = setInterval(() => {
                this.seconds++;
                this.updateTime();
            }, 1000);
        },
        stopTimer() {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
            this.seconds = 0;
        },
        updateTime() {
            const minutes = Math.floor(this.seconds / 60);
            const seconds = this.seconds % 60;
            this.time = `${this.formatTime(minutes)}:${this.formatTime(seconds)}`;
        },
        formatTime(value) {
            return value < 10 ? `0${value}` : `${value}`;
        },
    },

};
</script>
  
<style scoped>
#header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background-color: black;
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    font-family: 'Arial', sans-serif;
    font-weight: bold;
    font-size: 20px;
    z-index: 100;
}

.logo {
    height: 25px;
    width: 25px;
    padding-right: 2px;
}

.left-content {
    order: 1;
    font-size: 24px;
    margin-left: 10px;
}

.mid-content {
    order: 2;
    padding-left: 7%;
}

.right-content {
    display: flex;
    align-items: center;
    order: 3;
    margin-right: 10px;
}

.timer {
    padding-right: 50px;
}

@media screen and (max-width: 600px) {
    #header {
        font-size: 15px;
    }

    .left-content {
        font-size: 18px;
    }

}
</style>
  