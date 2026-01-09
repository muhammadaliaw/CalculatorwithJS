let display = document.getElementById('display');

function appendToDisplay(value) {
    // Replace × with * for calculation purposes
    if (value === '×') {
        value = '*';
    }
    display.value += value;
}

function clearDisplay() {
    display.value = '';
}

function deleteLast() {
    display.value = display.value.slice(0, -1);
}

function calculate() {
    try {
        // Replace × with * and ÷ with / for evaluation
        let expression = display.value.replace(/×/g, '*').replace(/÷/g, '/');
        let result = eval(expression);
        
        // Check if result is a valid number
        if (isNaN(result) || !isFinite(result)) {
            display.value = 'Error';
        } else {
            // Format result to avoid long decimals
            if (Number.isInteger(result)) {
                display.value = result;
            } else {
                display.value = parseFloat(result.toFixed(10)).toString();
            }
        }
    } catch (error) {
        display.value = 'Error';
    }
}

// Allow Enter key to calculate
document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        calculate();
    } else if (event.key === 'Escape') {
        clearDisplay();
    } else if (event.key === 'Backspace') {
        deleteLast();
    } else if (/[0-9+\-*/.]/.test(event.key)) {
        appendToDisplay(event.key);
    } else if (event.key === '*') {
        appendToDisplay('×');
    } else if (event.key === '/') {
        appendToDisplay('/');
    }
});