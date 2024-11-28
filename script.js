const elements = [
    {name: "Hydrogen", symbol: "H", number: 1, valency: [1, -1]},
    {name: "Helium", symbol: "He", number: 2, valency: [0]},
    {name: "Lithium", symbol: "Li", number: 3, valency: [1]},
    {name: "Beryllium", symbol: "Be", number: 4, valency: [2]},
    {name: "Boron", symbol: "B", number: 5, valency: [3]},
    {name: "Carbon", symbol: "C", number: 6, valency: [4, 2, -4]},
    {name: "Nitrogen", symbol: "N", number: 7, valency: [3, -3]},
    {name: "Oxygen", symbol: "O", number: 8, valency: [-2]},
    {name: "Fluorine", symbol: "F", number: 9, valency: [-1]},
    {name: "Neon", symbol: "Ne", number: 10, valency: [0]},
    {name: "Sodium", symbol: "Na", number: 11, valency: [1]},
    {name: "Magnesium", symbol: "Mg", number: 12, valency: [2]},
    {name: "Aluminium", symbol: "Al", number: 13, valency: [3]},
    {name: "Silicon", symbol: "Si", number: 14, valency: [4, -4]},
    {name: "Phosphorus", symbol: "P", number: 15, valency: [3, 5, -3]},
    {name: "Sulfur", symbol: "S", number: 16, valency: [2, 4, 6, -2]},
    {name: "Chlorine", symbol: "Cl", number: 17, valency: [1, 3, 5, 7, -1]},
    {name: "Argon", symbol: "Ar", number: 18, valency: [0]},
    {name: "Potassium", symbol: "K", number: 19, valency: [1]},
    {name: "Calcium", symbol: "Ca", number: 20, valency: [2]},
    {name: "Scandium", symbol: "Sc", number: 21, valency: [3]},
    {name: "Titanium", symbol: "Ti", number: 22, valency: [2, 3, 4]},
    {name: "Vanadium", symbol: "V", number: 23, valency: [2, 3, 4, 5]},
    {name: "Chromium", symbol: "Cr", number: 24, valency: [2, 3, 6]},
    {name: "Manganese", symbol: "Mn", number: 25, valency: [2, 3, 4, 6, 7]},
    {name: "Iron", symbol: "Fe", number: 26, valency: [2, 3]},
    {name: "Cobalt", symbol: "Co", number: 27, valency: [2, 3]},
    {name: "Nickel", symbol: "Ni", number: 28, valency: [2, 3]},
    {name: "Copper", symbol: "Cu", number: 29, valency: [1, 2]},
    {name: "Zinc", symbol: "Zn", number: 30, valency: [2]}
];

let selectedElements = [];
let currentQuestionIndex = 0;
let score = 0;
let learnedElements = [];
let toLearnElements = [];
let debugTimer;
let debugTime = 0;

function initializeElementSelection() {
    const elementButtons = document.getElementById('elementButtons');
    elements.forEach(element => {
        const button = document.createElement('button');
        button.innerHTML = `${element.name}<sub>${element.number}</sub>`;
        button.classList.add('element-btn');
        button.addEventListener('click', () => toggleElementSelection(button, element));
        elementButtons.appendChild(button);
    });
}

function toggleElementSelection(button, element) {
    button.classList.toggle('selected');
    const index = selectedElements.findIndex(e => e.name === element.name);
    if (index > -1) {
        selectedElements.splice(index, 1);
    } else {
        selectedElements.push(element);
    }
    document.getElementById('startQuiz').style.display = selectedElements.length > 0 ? 'block' : 'none';
}

function startQuiz() {
    document.getElementById('elementSelection').style.display = 'none';
    document.getElementById('quiz').style.display = 'block';
    currentQuestionIndex = 0;
    score = 0;
    learnedElements = [];
    toLearnElements = [];
    debugTime = 0;
    clearInterval(debugTimer);
    debugTimer = setInterval(() => {
        debugTime++;
        document.getElementById('debugTime').textContent = debugTime;
    }, 1000);
    showQuestion();
}

function showQuestion() {
    if (currentQuestionIndex < selectedElements.length) {
        const element = selectedElements[currentQuestionIndex];
        document.getElementById('quizQuestion').innerHTML = `What is the valency of ${element.name}<sub>${element.number}</sub> (${element.symbol})?`;
        
        const answerButtons = document.getElementById('answerButtons');
        answerButtons.innerHTML = '';
        
        [-4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7].forEach(valency => {
            const button = document.createElement('button');
            button.textContent = valency;
            button.addEventListener('click', () => checkAnswer(valency));
            answerButtons.appendChild(button);
        });
    } else {
        showResults();
    }
}

function checkAnswer(selectedValency) {
    const element = selectedElements[currentQuestionIndex];
    if (element.valency.includes(selectedValency)) {
        score++;
        learnedElements.push(element.name);
    } else {
        toLearnElements.push(element.name);
    }
    currentQuestionIndex++;
    showQuestion();
}

function showResults() {
    document.getElementById('quiz').style.display = 'none';
    document.getElementById('results').style.display = 'block';
    clearInterval(debugTimer);
    
    const scorePercentage = (score / selectedElements.length) * 100;
    document.getElementById('score').textContent = `Your score: ${score} out of ${selectedElements.length} (${scorePercentage.toFixed(2)}%)`;
    
    document.getElementById('learnedElements').textContent = `Elements you've learned: ${learnedElements.join(', ')}`;
    document.getElementById('toLearnElements').textContent = `Elements to study more: ${toLearnElements.join(', ')}`;
}

function restartQuiz() {
    document.getElementById('results').style.display = 'none';
    document.getElementById('elementSelection').style.display = 'block';
    selectedElements = [];
    document.querySelectorAll('.element-btn').forEach(btn => btn.classList.remove('selected'));
    document.getElementById('startQuiz').style.display = 'none';
    debugTime = 0;
    document.getElementById('debugTime').textContent = debugTime;
}

document.addEventListener('DOMContentLoaded', () => {
    initializeElementSelection();
    document.getElementById('startQuiz').addEventListener('click', startQuiz);
    document.getElementById('restartQuiz').addEventListener('click', restartQuiz);
});

