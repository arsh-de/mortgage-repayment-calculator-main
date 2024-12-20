const button = document.querySelector("button");
const intersetOnly = document.querySelector("#interest-only")
const repayment = document.querySelector("#repayment")
const clear = document.querySelector("#Clear")

const inputs = document.querySelectorAll("input");

inputs.forEach(input => {
    input.addEventListener("focus", () => {
        const icon = input.previousElementSibling; // Get the icon before the input
        if (icon && icon.classList.contains("icon")) {
            icon.classList.add("icon-selected");
        }
    });

    input.addEventListener("blur", () => {
        const icon = input.previousElementSibling;
        if (icon && icon.classList.contains("icon")) {
            icon.classList.remove("icon-selected");
        }
    });
});

function calculate() {
    let monthly = 0;
    let r = parseFloat(document.querySelector("#percent").value);
    let p = parseFloat(document.querySelector("#amount").value);
    let y = parseFloat(document.querySelector("#years").value);

    document.querySelector(".empty-result").classList.add("hidden");
    document.querySelector(".result").classList.remove("hidden");

    if (repayment.checked) {
        r = r / 1200; // Convert annual rate to monthly rate
        y = y * 12;   // Convert years to months
        monthly = (p * r * Math.pow(1 + r, y)) / (Math.pow(1 + r, y) - 1);
        const total = monthly * y;
        document.querySelector(".monthly").innerText = '£' + monthly.toFixed(3).toLocaleString("en-US");
        document.querySelector(".total").innerText = '£' + total.toFixed(3).toLocaleString("en-US");
    } else if (intersetOnly.checked) {
        monthly = p * (r / 1200); // Interest-only formula
        const total = monthly * y * 12; // Total interest-only payment
        document.querySelector(".monthly").innerText = '£' + monthly.toFixed(3).toLocaleString("en-US");
        document.querySelector(".total").innerText = '£' + total.toFixed(3).toLocaleString("en-US");
    }
}

function checked() {
    if (repayment.checked) {
        document.querySelector(".radio1").classList.add("radio-selected")
        document.querySelector(".radio2").classList.remove("radio-selected")
    }
    else if (intersetOnly.checked) {
        document.querySelector(".radio2").classList.add("radio-selected")
        document.querySelector(".radio1").classList.remove("radio-selected")
    }
}

function empty() {
    if (!document.querySelector("#amount").value) {
        document.querySelector(".amount-icon").classList.add("icon-error");
        document.querySelector("#amount").style.borderColor = "hsl(4, 69%, 50%)";
        document.querySelector(".e1").classList.remove("hidden");
    }
    else {
        document.querySelector(".amount-icon").classList.remove("icon-error");
        document.querySelector("#amount").style.borderColor = "hsl(200, 26%, 54%)";
        document.querySelector(".e1").classList.add("hidden");
    }

    if (!document.querySelector("#years").value) {
        document.querySelector(".years-icon").classList.add("icon-error");
        document.querySelector("#years").style.borderColor = "hsl(4, 69%, 50%)";
        document.querySelector(".e2").classList.remove("hidden");
    }
    else {
        document.querySelector(".years-icon").classList.remove("icon-error");
        document.querySelector("#years").style.borderColor = "hsl(200, 26%, 54%)";
        document.querySelector(".e2").classList.add("hidden");
    }

    if (!document.querySelector("#percent").value) {
        document.querySelector(".percent-icon").classList.add("icon-error");
        document.querySelector("#percent").style.borderColor = "hsl(4, 69%, 50%)";
        document.querySelector(".e3").classList.remove("hidden");
    }
    else {
        document.querySelector(".percent-icon").classList.remove("icon-error");
        document.querySelector("#percent").style.borderColor = "hsl(200, 26%, 54%)";
        document.querySelector(".e3").classList.add("hidden");
    }

    if (repayment.checked || intersetOnly.checked) {
        document.querySelector(".e4").classList.add("hidden");
    }
    else {
        document.querySelector(".e4").classList.remove("hidden");
    }
}

function clearAll() {
    document.querySelector("#amount").value = "";
    document.querySelector("#years").value = "";
    document.querySelector("#percent").value = "";
    intersetOnly.checked = false;
    repayment.checked = false;
    document.querySelectorAll(".error").forEach(er => {
        er.classList.add("hidden");
    })
    document.querySelectorAll(".icon").forEach(i => {
        i.classList.remove("icon-error")
    })
    document.querySelectorAll("input").forEach(i => {
        i.style.borderColor = "hsl(200, 26%, 54%)";
    })
    document.querySelectorAll(".radio").forEach(radio => {
        radio.classList.remove("radio-selected");
    });
    document.querySelector(".empty-result").classList.remove("hidden");
    document.querySelector(".result").classList.add("hidden");

}
button.addEventListener("click", (e) => {
    e.preventDefault();
    empty();
    calculate();
})

repayment.addEventListener("click", checked);
intersetOnly.addEventListener("click", checked);
clear.addEventListener("click", clearAll);
