// App State
let currentQuiz = null;
let score = 0;
let streak = 0;
let totalAnswered = 0;
let correctAnswers = 0;
let currentBitMode = 8;
let activeBits = new Array(16).fill(0);

const bases = [
    { name: 'Decimal', base: 10, prefix: '' },
    { name: 'Binário', base: 2, prefix: '' },
    { name: 'Octal', base: 8, prefix: '' },
    { name: 'Hexadecimal', base: 16, prefix: '' }
];

// --- NAVIGATION LOGIC ---
function switchTab(tab) {
    ['quiz', 'converter', 'reference'].forEach(t => {
        document.getElementById(`section-${t}`).classList.add('hidden');
        const btn = document.getElementById(`tab-${t}`);
        btn.className = "px-4 py-2 rounded-lg text-sm font-medium transition flex items-center gap-2 text-slate-400 hover:text-white";
    });

    document.getElementById(`section-${tab}`).classList.remove('hidden');
    const activeBtn = document.getElementById(`tab-${tab}`);
    activeBtn.className = "px-4 py-2 rounded-lg text-sm font-medium transition flex items-center gap-2 text-brand-400 bg-dark-card shadow border border-brand-500/20";
}

// --- QUIZ LOGIC ---
function generateNewQuestion() {
    const diff = document.getElementById('difficulty-select').value;
    let maxVal = 15;
    if (diff === 'medium') maxVal = 255;
    if (diff === 'hard') maxVal = 65535;

    // Pick a random number
    const targetVal = Math.floor(Math.random() * (maxVal + 1));

    // Pick source base and target base (ensure they are different)
    let srcIdx = Math.floor(Math.random() * bases.length);
    let tgtIdx;
    do {
        tgtIdx = Math.floor(Math.random() * bases.length);
    } while (tgtIdx === srcIdx);

    const srcBase = bases[srcIdx];
    const tgtBase = bases[tgtIdx];

    currentQuiz = {
        decimalValue: targetVal,
        source: srcBase,
        target: tgtBase,
        sourceFormatted: targetVal.toString(srcBase.base).toUpperCase(),
        correctAnswer: targetVal.toString(tgtBase.base).toUpperCase()
    };

    // Update UI
    document.getElementById('question-value').innerText = currentQuiz.sourceFormatted;
    document.getElementById('question-source-base').innerText = srcBase.base;
    document.getElementById('question-target-name').innerText = tgtBase.name;
    document.getElementById('question-target-base').innerText = tgtBase.base;

    document.getElementById('quiz-input').value = '';
    document.getElementById('feedback-container').classList.add('hidden');
    document.getElementById('quiz-input').focus();
}

function checkAnswer(e) {
    e.preventDefault();
    const userInput = document.getElementById('quiz-input').value.trim().toUpperCase();
    if (!userInput) return;

    totalAnswered++;
    const isCorrect = userInput === currentQuiz.correctAnswer;

    const feedbackContainer = document.getElementById('feedback-container');
    const feedbackHeader = document.getElementById('feedback-header');
    const feedbackExp = document.getElementById('feedback-explanation');

    feedbackContainer.classList.remove('hidden');

    if (isCorrect) {
        score += 10 + (streak * 2);
        streak++;
        correctAnswers++;

        feedbackContainer.className = "max-w-2xl mx-auto mt-6 p-4 rounded-xl border text-sm space-y-3 bg-emerald-950/40 border-emerald-500/40 text-emerald-200";
        feedbackHeader.innerHTML = `<i class="fa-solid fa-circle-check text-emerald-400 text-xl"></i> <span>Resposta Correta! (+${10 + (streak-1)*2} pts)</span>`;
    } else {
        streak = 0;
        feedbackContainer.className = "max-w-2xl mx-auto mt-6 p-4 rounded-xl border text-sm space-y-3 bg-rose-950/40 border-rose-500/40 text-rose-200";
        feedbackHeader.innerHTML = `<i class="fa-solid fa-circle-xmark text-rose-400 text-xl"></i> <span>Resposta Incorreta. A resposta certa era: <strong class="mono underline">${currentQuiz.correctAnswer}</strong></span>`;
    }

    // Generate Step-by-Step Explanation
    feedbackExp.innerHTML = generateExplanationHtml(currentQuiz);

    // Update Stats
    document.getElementById('score-val').innerText = score;
    document.getElementById('streak-val').innerText = streak;
    document.getElementById('accuracy-val').innerText = Math.round((correctAnswers / totalAnswered) * 100) + '%';
}

function generateExplanationHtml(quiz) {
    const val = quiz.decimalValue;
    const srcBase = quiz.source.base;
    const tgtBase = quiz.target.base;

    let html = `<div class="font-sans font-bold text-slate-300 border-b border-dark-border pb-1 mb-2">Passo a Passo da Solução:</div>`;

    // Case 1: Convert to Decimal
    if (tgtBase === 10) {
        html += `<p>Para converter de <strong>Base ${srcBase}</strong> para <strong>Decimal</strong>, multiplicamos cada dígito pela potência da base correspondente à sua posição:</p>`;
        const str = quiz.sourceFormatted;
        let terms = [];
        for (let i = 0; i < str.length; i++) {
            const digitChar = str[str.length - 1 - i];
            const digitVal = parseInt(digitChar, srcBase);
            terms.unshift(`(${digitVal} × ${srcBase}<sup>${i}</sup>)`);
        }
        html += `<div class="text-cyan-400 my-1">${terms.join(' + ')}</div>`;
        html += `<div>= ${quiz.correctAnswer}<sub>10</sub></div>`;
    }
    // Case 2: Convert from Decimal
    else if (srcBase === 10) {
        html += `<p>Para converter de <strong>Decimal</strong> para <strong>Base ${tgtBase}</strong>, realizamos divisões sucessivas por ${tgtBase} e pegamos os restos do último para o primeiro:</p>`;
        let temp = val;
        let steps = [];
        if (temp === 0) steps.push(`0 ÷ ${tgtBase} = 0, resto 0`);
        while (temp > 0) {
            let q = Math.floor(temp / tgtBase);
            let r = temp % tgtBase;
            let rChar = r.toString(tgtBase).toUpperCase();
            steps.push(`${temp} ÷ ${tgtBase} = ${q}, resto <strong>${rChar}</strong> (${r})`);
            temp = q;
        }
        html += `<ul class="list-disc pl-5 text-slate-400 my-1 space-y-0.5">` + steps.map(s => `<li>${s}</li>`).join('') + `</ul>`;
        html += `<div>Leitura dos restos de baixo para cima: <strong class="text-cyan-400">${quiz.correctAnswer}<sub>${tgtBase}</sub></strong></div>`;
    }
    // Case 3: Binary <-> Hex / Octal shortcuts or general via Decimal
    else if ((srcBase === 2 && (tgtBase === 16 || tgtBase === 8))) {
        const groupSize = tgtBase === 16 ? 4 : 3;
        html += `<p>Conversão direta agrupando os bits de <strong>${groupSize} em ${groupSize}</strong> da direita para a esquerda:</p>`;
        let binPadded = val.toString(2);
        while (binPadded.length % groupSize !== 0) binPadded = '0' + binPadded;

        let groups = [];
        for (let i = 0; i < binPadded.length; i += groupSize) {
            let grp = binPadded.substr(i, groupSize);
            let grpVal = parseInt(grp, 2).toString(tgtBase).toUpperCase();
            groups.push(`${grp} ➔ ${grpVal}`);
        }
        html += `<div class="text-cyan-400 my-1">${groups.join(' | ')}</div>`;
        html += `<div>Resultado: <strong class="text-brand-400">${quiz.correctAnswer}<sub>${tgtBase}</sub></strong></div>`;
    }
    else {
        // General route via Decimal
        html += `<p>1. Primeiro converta o valor para Decimal:</p>`;
        html += `<div class="text-slate-400 pl-3"> ${quiz.sourceFormatted}<sub>${srcBase}</sub> = ${val}<sub>10</sub></div>`;
        html += `<p class="mt-2">2. Em seguida, converta ${val}<sub>10</sub> para a Base ${tgtBase}:</p>`;
        html += `<div class="text-brand-400 pl-3"> ${val}<sub>10</sub> = ${quiz.correctAnswer}<sub>${tgtBase}</sub></div>`;
    }

    return html;
}

function convertFrom(source) {
    const decInput = document.getElementById('conv-dec');
    const binInput = document.getElementById('conv-bin');
    const hexInput = document.getElementById('conv-hex');
    const octInput = document.getElementById('conv-oct');

    let num = NaN;

    if (source === 'dec') {
        num = parseInt(decInput.value, 10);
    } else if (source === 'bin') {
        num = parseInt(binInput.value.replace(/[^01]/g, ''), 2);
    } else if (source === 'hex') {
        num = parseInt(hexInput.value.replace(/[^0-9a-fA-F]/g, ''), 16);
    } else if (source === 'oct') {
        num = parseInt(octInput.value.replace(/[^0-7]/g, ''), 8);
    }

    if (isNaN(num) || num < 0) {
        if (source !== 'dec') decInput.value = '';
        if (source !== 'bin') binInput.value = '';
        if (source !== 'hex') hexInput.value = '';
        if (source !== 'oct') octInput.value = '';
        updateBitsFromNumber(0);
        return;
    }

    // Cap maximum to avoid infinity/oversize issues in visualizer
    if (num > 65535) num = 65535;

    if (source !== 'dec') decInput.value = num.toString(10);
    if (source !== 'bin') binInput.value = num.toString(2);
    if (source !== 'hex') hexInput.value = num.toString(16).toUpperCase();
    if (source !== 'oct') octInput.value = num.toString(8);

    updateBitsFromNumber(num);
}

function renderBitSwitches() {
    const container = document.getElementById('bit-switches-container');
    container.innerHTML = '';

    for (let i = currentBitMode - 1; i >= 0; i--) {
        const bitVal = Math.pow(2, i);
        const isActive = activeBits[i] === 1;

        const switchEl = document.createElement('div');
        switchEl.className = `flex flex-col items-center p-2 rounded-xl border cursor-pointer select-none transition-all ${
            isActive
                ? 'bg-brand-600/20 border-brand-500 text-brand-400 shadow-lg shadow-brand-500/10'
                : 'bg-dark-bg border-dark-border text-slate-500 hover:border-slate-600'
        }`;
        switchEl.onclick = () => toggleBit(i);

        switchEl.innerHTML = `
            <span class="text-[10px] font-mono text-slate-400 mb-1">2<sup>${i}</sup></span>
            <div class="w-8 h-8 rounded-lg flex items-center justify-center font-mono font-bold text-lg mb-1 ${
                isActive ? 'bg-brand-500 text-white' : 'bg-dark-card text-slate-400'
            }">
                ${activeBits[i]}
            </div>
            <span class="text-[10px] font-mono text-slate-400">${bitVal}</span>
        `;

        container.appendChild(switchEl);
    }
}

function toggleBit(index) {
    activeBits[index] = activeBits[index] === 1 ? 0 : 1;
    renderBitSwitches();
    updateInputsFromBits();
}

function setBitMode(mode) {
    currentBitMode = mode;
    document.getElementById('btn-bit-8').className = mode === 8
        ? "px-3 py-1 rounded text-xs font-bold transition bg-brand-600 text-white"
        : "px-3 py-1 rounded text-xs font-bold transition text-slate-400 hover:text-white";
    document.getElementById('btn-bit-16').className = mode === 16
        ? "px-3 py-1 rounded text-xs font-bold transition bg-brand-600 text-white"
        : "px-3 py-1 rounded text-xs font-bold transition text-slate-400 hover:text-white";

    renderBitSwitches();
}

function updateBitsFromNumber(num) {
    for (let i = 0; i < 16; i++) {
        activeBits[i] = (num & (1 << i)) ? 1 : 0;
    }
    renderBitSwitches();
}

function updateInputsFromBits() {
    let total = 0;
    for (let i = 0; i < currentBitMode; i++) {
        if (activeBits[i] === 1) {
            total += Math.pow(2, i);
        }
    }

    document.getElementById('conv-dec').value = total.toString(10);
    document.getElementById('conv-bin').value = total.toString(2);
    document.getElementById('conv-hex').value = total.toString(16).toUpperCase();
    document.getElementById('conv-oct').value = total.toString(8);
}

function buildReferenceTable() {
    const tbody = document.getElementById('reference-table-body');
    tbody.innerHTML = '';

    for (let i = 0; i <= 15; i++) {
        const dec = i.toString(10);
        const bin = i.toString(2).padStart(4, '0');
        const oct = i.toString(8);
        const hex = i.toString(16).toUpperCase();

        const tr = document.createElement('tr');
        tr.className = "hover:bg-dark-bg/50 transition";
        tr.innerHTML = `
            <td class="p-3 text-white font-bold">${dec}</td>
            <td class="p-3 text-cyan-400">${bin}</td>
            <td class="p-3 text-emerald-400">${oct}</td>
            <td class="p-3 text-purple-400 font-bold">${hex}</td>
            <td class="p-3">
                <div class="flex gap-1">
                    ${bin.split('').map(b => `
                        <span class="w-3 h-3 rounded-sm ${b === '1' ? 'bg-brand-500' : 'bg-dark-border'}"></span>
                    `).join('')}
                </div>
            </td>
        `;
        tbody.appendChild(tr);
    }
}

/* ===== Event wiring (replaces removed inline on* attributes) ===== */
document.getElementById('tab-quiz').addEventListener('click', () => switchTab('quiz'));
document.getElementById('tab-converter').addEventListener('click', () => switchTab('converter'));
document.getElementById('tab-reference').addEventListener('click', () => switchTab('reference'));

document.getElementById('difficulty-select').addEventListener('change', generateNewQuestion);
document.getElementById('btn-skip-question').addEventListener('click', generateNewQuestion);
document.getElementById('btn-next-question').addEventListener('click', generateNewQuestion);

document.getElementById('quiz-form').addEventListener('submit', checkAnswer);

document.getElementById('conv-dec').addEventListener('input', () => convertFrom('dec'));
document.getElementById('conv-bin').addEventListener('input', () => convertFrom('bin'));
document.getElementById('conv-hex').addEventListener('input', () => convertFrom('hex'));
document.getElementById('conv-oct').addEventListener('input', () => convertFrom('oct'));

document.getElementById('btn-bit-8').addEventListener('click', () => setBitMode(8));
document.getElementById('btn-bit-16').addEventListener('click', () => setBitMode(16));

window.onload = function() {
    generateNewQuestion();
    setBitMode(8);
    buildReferenceTable();
};
