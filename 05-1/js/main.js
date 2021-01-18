(() => {
    const upperLimit = 100;
    const newRandomNumber = () => Math.floor(Math.random() * Math.floor(upperLimit));
    const prompt = `Guess a number from 0 to ${upperLimit}`;
    
    let secretNumber = newRandomNumber();
    let counter = 0;
    let reset = false;
    let text = '';
    let data = []; 

    const form = document.forms['form'];
    form.querySelector('#prompt').textContent = prompt;

    const inputGroup = form.querySelector('#inputGroup');
    const outputGroup = form.querySelector('#outputGroup');
    const input = form.querySelector('#input');
    const output = form.querySelector('#output');
    const btnStart = form.btnStart;
    const btnCancel = form.btnCancel;
    const btnShow = form.btnShow;
    const btnHide = form.btnHide;
    const resultText = form.querySelector('#resultText');

    const validateValue = () => {
        value = input.value;
        if (value === '') {
            text = "You did not input a number!"
            counter--;
            return;
        }
        switch (Math.sign(Number(value) - secretNumber)) {
            case 1:
                text = 'Number is too big.';
                break;
            case 0:
                text = `Congratulations! You win! Click on "Submit" to start a new game!`;
                reset = true;
                break;
            case -1:
                text = "Number is too small.";
                break;
            default:
                text = "May be it is not a number?";
        }
        data.push([value, text]);
    }
    
    const storeData = () => {
        localStorage.setItem('data', JSON.stringify(data));
        data = [];
    }

    const showData = () => {
        const history = JSON.parse(localStorage.getItem('data'));
        const historyStr = history.reduce((accumulator, currentValue, index) => `${accumulator}\n<li>${currentValue[0]} - ${currentValue[1]}</li>`, "");
        output.innerHTML = historyStr;
        outputGroup.classList.remove('d-none');
        btnShow.classList.add('d-none');
    }

    const hideData = () => {
        outputGroup.classList.add('d-none');
        btnShow.classList.remove('d-none');
    }

    const resetGame = () => {
        secretNumber = newRandomNumber();
        text = '';
        counter = 0;
        input.value = '';
        data = [];
        reset = false;
        resultText.textContent = '';
    }
 
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        if (reset) {
            resetGame();
        } else {
            const value = event.target.elements.input.value;
            validateValue(value);
            if (reset) {
                storeData();
                hideData();
            }
            resultText.textContent = `${++counter}. ${input.value} - ${text}`;
        }
    });

    btnStart.addEventListener('click', () => {
        resetGame();
        inputGroup.classList.remove('d-none');
        btnStart.classList.add('d-none');
    })

    btnCancel.addEventListener('click', () => {
        inputGroup.classList.add('d-none');
        btnStart.classList.remove('d-none');
        storeData();
    })

    btnShow.addEventListener('click', () =>{
        showData();
    });

    btnHide.addEventListener('click', () => {
        hideData();
    });
})();
