let currentQuestion = 0;
let score = 0;
const totalQuestions = 10;
let timer;
let timeLeft = 15;

const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const resultEl = document.getElementById('result');
const nextBtn = document.getElementById('next-btn');
const restartBtn = document.getElementById('restart-btn');
const scoreboardEl = document.getElementById('scoreboard');
const timerEl = document.getElementById('timer');

function getRandomOperator() {
    const ops = ['+', '-', '*', '/'];
    return ops[Math.floor(Math.random() * ops.length)];
}

function generateQuestion() {
    clearInterval(timer);
    timeLeft = 15;
    updateTimerDisplay();

    resultEl.textContent = '';
    optionsEl.innerHTML = '';
    nextBtn.style.display = 'none';

    const num1 = Math.floor(Math.random() * 90 + 10);
    const num2 = Math.floor(Math.random() * 90 + 10);
    const operator = getRandomOperator();

    let correctAnswer;
    let questionStr;

    switch (operator) {
        case '+':
            correctAnswer = num1 + num2;
            questionStr = `${num1} + ${num2}`;
            break;
        case '-':
            correctAnswer = num1 - num2;
            questionStr = `${num1} - ${num2}`;
            break;
        case '*':
            correctAnswer = num1 * num2;
            questionStr = `${num1} * ${num2}`;
            break;
        case '/':
            correctAnswer = Math.floor(num1 / num2);
            questionStr = `${num1} / ${num2}`;
            break;
    }

    questionEl.textContent = `Питання ${currentQuestion + 1} з ${totalQuestions}: ${questionStr}`;

    const answers = [correctAnswer];
    while (answers.length < 5) {
        const wrong = correctAnswer + Math.floor(Math.random() * 21 - 10);
        if (wrong >= 0 && !answers.includes(wrong)) {
            answers.push(wrong);
        }
    }

    answers.sort(() => Math.random() - 0.5);

    answers.forEach(answer => {
        const btn = document.createElement('button');
        btn.textContent = answer;
        btn.classList.add('option-btn');
        btn.onclick = () => handleAnswer(answer, correctAnswer, btn);
        optionsEl.appendChild(btn);
    });

    timer = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();
        if (timeLeft === 0) {
            clearInterval(timer);
            resultEl.textContent = `Час вийшов! Правильна відповідь: ${correctAnswer}`;
            disableOptions();
            nextBtn.style.display = 'inline-block';
        }
    }, 1000);
}

function handleAnswer(selected, correct, btn) {
    clearInterval(timer);
    if (selected === correct) {
        btn.classList.add('correct');
        resultEl.textContent = 'Правильно!';
        score++;
    } else {
        btn.classList.add('wrong');
        resultEl.textContent = `Неправильно! Правильна відповідь: ${correct}`;
    }
    disableOptions();
    nextBtn.style.display = 'inline-block';
}

function disableOptions() {
    Array.from(optionsEl.children).forEach(b => b.disabled = true);
}

function updateTimerDisplay() {
    timerEl.textContent = `⏱️ ${timeLeft} с`;
}

nextBtn.onclick = () => {
    currentQuestion++;
    if (currentQuestion < totalQuestions) {
        generateQuestion();
    } else {
        showFinalScore();
    }
};

restartBtn.onclick = () => {
    currentQuestion = 0;
    score = 0;
    scoreboardEl.innerHTML = '';
    restartBtn.style.display = 'none';
    generateQuestion();
};

function showFinalScore() {
    questionEl.textContent = "Гра завершена!";
    optionsEl.innerHTML = '';
    resultEl.innerHTML = '';
    timerEl.textContent = '';
    scoreboardEl.innerHTML = `Ваш результат: <strong>${score} з ${totalQuestions}</strong>`;
    nextBtn.style.display = 'none';
    restartBtn.style.display = 'inline-block';
}

generateQuestion();
