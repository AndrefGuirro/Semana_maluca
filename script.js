// ========================================
// SEMANA DA MÃE MALUCA
// ========================================


// Elementos da página

const activities = document.querySelectorAll(".activity");

const character = document.getElementById("character");

const speech = document.getElementById("speech");

const completedElement = document.getElementById("completed");

const progress = document.getElementById("progress");

const finalMessage = document.getElementById("final-message");

const resetButton = document.getElementById("resetButton");


// Frases da personagem

const messages = {

    1: {
        emoji: "😵‍💫",
        text: "Cabelo maluco?! Mas quem teve essa ideia?!"
    },

    2: {
        emoji: "🤯",
        text: "Agora a mochila também tem que ser maluca?!"
    },

    3: {
        emoji: "😵",
        text: "Roupa colorida... vou precisar de um psicólogo."
    },

    4: {
        emoji: "🥴",
        text: "Pijama divertido... eu só queria dormir!"
    }

};


// ========================================
// QUANDO UMA ATIVIDADE É MARCADA
// ========================================

activities.forEach((activity) => {

    const checkbox =
        activity.querySelector("input");

    checkbox.addEventListener("change", () => {

        const day =
            Number(activity.dataset.day);


        if (checkbox.checked) {

            // Marca visualmente

            activity.classList.add("completed");


            // Atualiza personagem

            updateCharacter(day);


            // Atualiza progresso

            updateProgress();


            // Verifica se terminou tudo

            checkFinished();

        }

    });

});


// ========================================
// ATUALIZA PERSONAGEM
// ========================================

function updateCharacter(day) {

    const message =
        messages[day];


    // Remove animações anteriores

    character.classList.remove(
        "walking",
        "confused"
    );


    // Força o navegador a reiniciar
    // a animação

    void character.offsetWidth;


    character.textContent =
        message.emoji;


    speech.textContent =
        message.text;


    // Pequena animação

    if (day === 1) {

        character.classList.add(
            "walking"
        );

    } else {

        character.classList.add(
            "confused"
        );

    }


    // Mensagem especial

    if (day === 2) {

        speech.textContent =
            "Calma... só faltam dois. EU ACHO.";

    }


    if (day === 3) {

        speech.textContent =
            "Três dias! Minha sanidade está em 2%.";

    }


    if (day === 4) {

        speech.textContent =
            "ACABOU! EU NÃO ACREDITO!";

    }

}


// ========================================
// ATUALIZA BARRA DE PROGRESSO
// ========================================

function updateProgress() {

    const total =
        activities.length;


    const completed =
        document.querySelectorAll(
            ".activity.completed"
        ).length;


    const percentage =
        (completed / total) * 100;


    completedElement.textContent =
        completed;


    progress.style.width =
        `${percentage}%`;

}


// ========================================
// VERIFICA SE TERMINOU
// ========================================

function checkFinished() {

    const completed =
        document.querySelectorAll(
            ".activity.completed"
        ).length;


    const total =
        activities.length;


    if (completed !== total) {

        return;

    }


    // Pequeno atraso para deixar
    // a última atividade aparecer

    setTimeout(() => {

        finishWeek();

    }, 700);

}


// ========================================
// FINAL DA SEMANA
// ========================================

function finishWeek() {

    character.classList.remove(
        "walking",
        "confused"
    );


    character.classList.add(
        "falling"
    );


    character.textContent =
        "😵";


    speech.textContent =
        "Acabou... finalmente...";


    // Mostra mensagem final

    setTimeout(() => {

        finalMessage.classList.add(
            "show"
        );


        // Confetes

        launchConfetti();


    }, 900);

}


// ========================================
// CONFETES
// ========================================

function launchConfetti() {

    if (
        typeof confetti !== "function"
    ) {

        return;

    }


    // Explosão inicial

    confetti({
        particleCount: 120,
        spread: 90,
        origin: {
            y: 0.65
        }
    });


    // Segunda explosão

    setTimeout(() => {

        confetti({
            particleCount: 80,
            spread: 70,
            origin: {
                x: 0.2,
                y: 0.7
            }
        });

        confetti({
            particleCount: 80,
            spread: 70,
            origin: {
                x: 0.8,
                y: 0.7
            }
        });

    }, 350);

}


// ========================================
// REINICIAR
// ========================================

resetButton.addEventListener(
    "click",
    resetWeek
);


function resetWeek() {

    activities.forEach(
        (activity) => {

            const checkbox =
                activity.querySelector(
                    "input"
                );


            checkbox.checked =
                false;


            activity.classList.remove(
                "completed"
            );

        }
    );


    character.classList.remove(
        "falling",
        "walking",
        "confused"
    );


    character.textContent =
        "🤯";


    speech.textContent =
        "Vamos começar! Eu acho que vai dar tudo certo...";


    finalMessage.classList.remove(
        "show"
    );


    updateProgress();

}