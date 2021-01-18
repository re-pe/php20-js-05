const saugykla = 'ebankas';
const form = document.forms['form'];
const selVeiksmas = form.veiksmas;
const inpSuma = form.suma;
const output = form.querySelector('#output');

const loadHistory = () => {
    const data = localStorage.getItem(saugykla);
    if (data === null) {
        const history = [{ time: Date.now(), value: 0 }];
        const dataStr = JSON.stringify(history);
        localStorage.setItem(saugykla, dataStr);
        return history;
    } 
    const history = JSON.parse(data);
    return history;
}

const history = loadHistory();

const getLastItemFromHistory = () => {
    return history.slice(-1)[0];
};

let suma = getLastItemFromHistory().value;
output.textContent = suma;

const getValueFromInput = () => {
    const suma = Number(inpSuma.value);
    const zenklas = Number(selVeiksmas.value);
    return suma * zenklas;
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const inputValue = getValueFromInput();
    const lastValue = getLastItemFromHistory().value;
    if (lastValue + inputValue < 0) {
        alert("Operacijos atlikti negalima: sąskaitoje nužtenka lėšų!");
        return;
    }
    suma = lastValue + inputValue;
    history.push({ time: Date.now(), value: suma });
    localStorage.setItem(saugykla, JSON.stringify(history));
    output.textContent = suma;
})


