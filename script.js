const display = document.getElementById('display');
let current = '0';

function updateDisplay() {
    display.textContent = current;
}

function press(val) {
    if (current === '0' && val !== '.') {
        current = val;
    } else {
        current += val;
    }
    updateDisplay();
}

function clearAll() {
    current = '0';
    updateDisplay();
}

function deleteOne() {
    if (current.length > 1) {
        current = current.slice(0, -1);
    } else {
        current = '0';
    }
    updateDisplay();
}

function addDot() {
    // chia theo tất cả toán tử (bao gồm ÷ và ×)
    let parts = current.split(/[+\-×÷*/]/);
    if (!parts[parts.length - 1].includes('.')) {
        current += '.';
    }
    updateDisplay();
}

function addOperator(op) {
    // nếu ký tự cuối là toán tử thì thay, ngược lại thêm
    if (/[+\-×÷*/]$/.test(current)) {
        current = current.slice(0, -1) + op;
    } else {
        current += op;
    }
    updateDisplay();
}

function calculate() {
    try {
        // chuyển ÷, × về / và * trước khi eval
        let expr = current.replace(/÷/g, '/').replace(/×/g, '*');
        // nếu kết thúc bằng toán tử thì bỏ đi
        expr = expr.replace(/[+\-*/]$/, '');
        let result = eval(expr);
        current = String(result);
    } catch (e) {
        current = 'Error';
    }
    updateDisplay();
}
