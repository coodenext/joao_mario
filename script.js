// Dados dos candidatos
const candidates = {
    vereador: {
        digits: 5,
        options: {
            '10123': {
                name: 'João Mário Machado',
                party: 'Republicanos',
                photo: 'joao.png'
            },
            '67890': {
                name: 'Maria Souza',
                party: 'Partido B',
                photo: 'images/vereador2.jpg'
            }
        }
    },
    prefeito: {
        digits: 2,
        options: {
            '40': {
                name: 'Vinicius Marques/Vice-prefeito: Erik Diniz',
                party: 'PSB',
                photo: 'vini.png'
            },
            '34': {
                name: 'Ana Pereira',
                party: 'Partido D',
                photo: 'images/prefeito2.jpg'
            }
        }
    }
};

// Estado da votação
let currentStep = 0;
let voteNumber = '';
let blankVote = false;

const steps = [
    { title: 'VEREADOR', ...candidates.vereador },
    { title: 'PREFEITO', ...candidates.prefeito }
];

// Seletores de elementos
const officeName = document.getElementById('office-name');
const numberDisplay = document.getElementById('number-display');
const candidateDetails = document.getElementById('candidate-details');
const candidatePhoto = document.getElementById('candidate-photo');
const candidateName = document.getElementById('candidate-name');
const candidateParty = document.getElementById('candidate-party');
const message = document.getElementById('message');

// Inicializa a votação
function startStep() {
    const step = steps[currentStep];
    voteNumber = '';
    blankVote = false;
    officeName.textContent = step.title;
    numberDisplay.innerHTML = '';
    candidateDetails.style.display = 'none';
    message.style.display = 'none';

    for (let i = 0; i < step.digits; i++) {
        const span = document.createElement('span');
        span.classList.add('number-box');
        if (i === 0) {
            span.classList.add('blink');
        }
        numberDisplay.appendChild(span);
    }
}

// Atualiza a interface conforme os números são digitados
function updateInterface() {
    const step = steps[currentStep];
    const candidate = step.options[voteNumber];

    if (candidate) {
        candidateDetails.style.display = 'flex';
        candidateName.textContent = candidate.name;
        candidateParty.textContent = candidate.party;
        candidatePhoto.src = candidate.photo;
    } else {
        candidateDetails.style.display = 'none';
        message.style.display = 'block';
        message.textContent = 'VOTO NULO';
    }
}

// Ações dos botões
function pressKey(n) {
    const elNumberBox = document.querySelector('.number-box.blink');
    if (elNumberBox) {
        elNumberBox.textContent = n;
        voteNumber += n;

        elNumberBox.classList.remove('blink');
        if (elNumberBox.nextElementSibling) {
            elNumberBox.nextElementSibling.classList.add('blink');
        } else {
            updateInterface();
        }
    }
}

function voteWhite() {
    if (voteNumber === '') {
        blankVote = true;
        candidateDetails.style.display = 'none';
        message.style.display = 'block';
        message.textContent = 'VOTO EM BRANCO';

        numberDisplay.innerHTML = '';
    } else {
        alert('Para votar em BRANCO, não pode ter digitado nenhum número!');
    }
}

function correct() {
    startStep();
}

function confirm() {
    const step = steps[currentStep];

    let confirmedVote = false;

    if (blankVote) {
        confirmedVote = true;
        console.log(`Voto em BRANCO para ${step.title}`);
    } else if (voteNumber.length === step.digits) {
        confirmedVote = true;
        console.log(`Voto confirmado para ${step.title}: ${voteNumber}`);
    }

    if (confirmedVote) {
        currentStep++;
        if (currentStep < steps.length) {
            startStep();
        } else {
            document.querySelector('.urna-container').innerHTML = '<div class="end-message">FIM</div>';
            console.log('Votação finalizada');

            // Redireciona automaticamente após 2 segundos
            setTimeout(() => {
                window.location.href = "index.html"; // Substitua "index.html" pelo URL correto da página principal
            }, 2000);
        }
    } else {
        alert('O voto não está completo!');
    }
}

// Inicia o primeiro passo ao carregar a página
startStep();
