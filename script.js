// Buttons
const addMonteRowBtn = document.getElementById("add-monte-row");
const removeMonteRowBtn = document.getElementById("remove-monte-row");
const addSimulationRowBtn = document.getElementById("add-simulation-row");
const runSimulationBtn = document.getElementById("run-simulation");

let monteData = [];
let simulationData = [];

// Add Monte Data Row
addMonteRowBtn.addEventListener("click", function () {
    const table = document.getElementById("monte-data-table").getElementsByTagName("tbody")[0];
    const newRow = table.insertRow();

    for (let i = 0; i < 5; i++) {
        const newCell = newRow.insertCell();

        if (i === 0) {
            const input = document.createElement("input");
            input.type = "text";
            newCell.appendChild(input);
        }
        else if (i === 1 || i === 2) {
            const input = document.createElement("input");
            input.type = "number";
            input.step = "any";
            input.classList.add(i === 1 ? 'output-data-input' : 'probability-input');
            newCell.appendChild(input);
            if (i === 2) input.addEventListener("input", updateCumulativeAndRNI);
        }
        else {
            newCell.appendChild(document.createElement("span"));
        }
    }
    monteData.push({ label: "", outputData: 0, probability: 0, cumulativeProb: "", rni: "" });

    updateCumulativeAndRNI();
});

// Remove Monte Data Row
removeMonteRowBtn.addEventListener("click", function () {
    const table = document.getElementById("monte-data-table").getElementsByTagName("tbody")[0];

    if (table.rows.length > 0) {
        table.deleteRow(table.rows.length - 1);
        monteData.pop();
    }
    updateCumulativeAndRNI();
});

// Add Simulation Row
addSimulationRowBtn.addEventListener("click", function () {
    const table = document.getElementById("simulation-table").getElementsByTagName("tbody")[0];

    const newRow = table.insertRow();

    newRow.insertCell(0).textContent = table.rows.length;

    const randomInput = document.createElement("input");

    randomInput.type = "number";

    newRow.insertCell(1).appendChild(randomInput);

    newRow.insertCell(2).textContent = "";

    simulationData.push({ randomNum: 0, output: "" });
});

// Run Simulation
runSimulationBtn.addEventListener("click", function () {
    const monteRows = document.getElementById("monte-data-table").getElementsByTagName("tbody")[0].rows;
    let cumulativeProb = 0;

    for (let i = 0; i < monteRows.length; i++) {
        const cells = monteRows[i].cells;
        const label = cells[0].firstChild.value;
        const outputData = parseFloat(cells[1].firstChild.value);
        const probability = parseFloat(cells[2].firstChild.value);

        if (!label || isNaN(outputData) || isNaN(probability) || probability <= 0) {
            alert("Please fill out all fields correctly in the Monte Data Table.");
            return;
        }

        cumulativeProb += probability;

        cells[3].textContent = cumulativeProb.toFixed(2);

        const rniStart = Math.round((cumulativeProb - probability) * 100);

        const rniEnd = Math.round((cumulativeProb * 100) - 1);

        cells[4].textContent = `${rniStart} - ${rniEnd}`;

        monteData[i] = { label, outputData, probability, cumulativeProb, rni: `${rniStart} - ${rniEnd}` };
    }

    const simRows = document.getElementById("simulation-table").getElementsByTagName("tbody")[0].rows;

    for (let i = 0; i < simRows.length; i++) {
        const randomNum = parseInt(simRows[i].cells[1].firstChild.value);

        if (isNaN(randomNum) || randomNum < 0 || randomNum > 100) {
            alert("Please enter a valid random number between 0 and 100.");
            return;
        }

        let output = "No match";
        for (let j = 0; j < monteData.length; j++) {
            const { rni, outputData } = monteData[j];
            const [rniStart, rniEnd] = rni.split(" - ").map(num => parseInt(num));

            if (randomNum >= rniStart && randomNum <= rniEnd) {
                output = outputData;
                break;
            }
        }

        simRows[i].cells[2].textContent = output;
        simulationData[i].randomNum = randomNum;
        simulationData[i].output = output;
    }
});

// Update Cumulative and RNI
function updateCumulativeAndRNI() {
    let cumulativeSum = 0;
    let previousEnd = 0;
    const monteRows = document.getElementById("monte-data-table").getElementsByTagName("tbody")[0].rows;

    for (let i = 0; i < monteRows.length; i++) {
        const cells = monteRows[i].cells;
        const probability = parseFloat(cells[2].firstChild.value) || 0;
        if (probability > 0) {
            cumulativeSum += probability;
            cells[3].textContent = cumulativeSum.toFixed(2);
            const rangeStart = previousEnd;
            const rangeEnd = Math.round((cumulativeSum * 100) - 1);
            cells[4].textContent = `${rangeStart.toFixed(0)} - ${rangeEnd.toFixed(0)}`;
            previousEnd = rangeEnd + 1;
        }
        else {
            cells[3].textContent = "";
            cells[4].textContent = "";
        }
    }
}
