document.addEventListener('DOMContentLoaded', function() {
    const resistorInput = document.getElementById('resistor');
    const capacitorInput = document.getElementById('capacitor');
    const timeConstantOutput = document.getElementById('time-constant');
    const r1Input = document.getElementById('r1');
    const r2Input = document.getElementById('r2');
    const r3Input = document.getElementById('r3');
    const vsInput = document.getElementById('vs');
    const lInput = document.getElementById('l');

    const graphCanvas = document.getElementById('graph').getContext('2d');

    const chart = new Chart(graphCanvas, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Voltage',
                data: [],
                borderColor: '#4CAF50',
                borderWidth: 2
            }]
        },
        options: {
            scales: {
                xAxes: [{
                    type: 'linear',
                    position: 'bottom'
                }]
            }
        }
    });

    function updateGraph(resistor, capacitor) {
        const data = [];
        for (let t = 0; t <= 10; t += 0.1) {
            const voltage = Math.exp(-t / (resistor * capacitor));
            data.push({ x: t, y: voltage });
        }
        chart.data.datasets[0].data= data;
chart.update();
}
resistorInput.addEventListener('input', function() {
    updateOutput();
});
capacitorInput.addEventListener('input', function() {
    updateOutput();
});
function updateOutput() {
    const resistor = parseFloat(resistorInput.value);
    const capacitor = parseFloat(capacitorInput.value);
    const r1 = parseFloat(r1Input.value);
    const r2 = parseFloat(r2Input.value);
    const r3 = parseFloat(r3Input.value);
    const vs = parseFloat(vsInput.value);
    const l = parseFloat(lInput.value);
    
    if (!isNaN(resistor) && !isNaN(capacitor) && !isNaN(r1) && !isNaN(r2) && !isNaN(r3) && !isNaN(vs) && !isNaN(l)) {
        const timeConstant = resistor * capacitor;
        timeConstantOutput.textContent = timeConstant.toFixed(2);
        updateGraph(resistor, capacitor);
    } else {
        timeConstantOutput.textContent = '0';
    }
}
});
document.addEventListener('DOMContentLoaded', function() {
    const r1Input = document.getElementById('r1');
    const r2Input = document.getElementById('r2');
    const vsInput = document.getElementById('vs');
    const isInput = document.getElementById('is');
    // Function to calculate I1 and I2
    function calculateCurrents() {
        const r1 = parseFloat(r1Input.value);
        const r2 = parseFloat(r2Input.value);
        const vs = parseFloat(vsInput.value);
        const is = parseFloat(isInput.value);
            if (!isNaN(r1) && !isNaN(r2) && !isNaN(vs) && !isNaN(is)) {
            // Calculate I1 and I2 using the given formulas
            const i1 = (vs - r2 * is) / (r1 + r2);
            const i2 = (r1 * is + vs) / (r1 + r2);
            // Update the result elements
            document.getElementById('i1-result').textContent = i1.toFixed(2);
            document.getElementById('i2-result').textContent = i2.toFixed(2);
        } else {
            // Reset results if any input value is invalid
            document.getElementById('i1-result').textContent = '0';
            document.getElementById('i2-result').textContent = '0';
        }
    }
    // Function to handle click event on Calculate button
    function handleCalculateClick() {
        calculateCurrents();
    }
    // Add event listeners to inputs for recalculation
    r1Input.addEventListener('input', calculateCurrents);
    r2Input.addEventListener('input', calculateCurrents);
    vsInput.addEventListener('input', calculateCurrents);
    isInput.addEventListener('input', calculateCurrents);
    // Add event listener to Calculate button
    document.getElementById('calculate-button').addEventListener('click', handleCalculateClick);
    // Initial calculation on page load
    calculateCurrents();
});
    document.addEventListener('DOMContentLoaded', function() {
        const plotGraphsButton = document.getElementById('plotGraphs');
            plotGraphsButton.addEventListener('click', function() {
            // Get user input for I1 and I2
            const i1 = parseFloat(document.getElementById('i1').value);
            const i2 = parseFloat(document.getElementById('i2').value);
                // Check if input values are valid numbers
            if (!isNaN(i1) && !isNaN(i2)) {
                plotGraphs(i1, i2);
            } else {
                alert('Please enter valid numbers for I1 and I2.');
            }
        });
        function plotGraphs(i1, i2) {
            // Get canvas elements
            const currentDistributionCanvas = document.getElementById('currentDistributionChart');
            const meshCurrentCanvas = document.getElementById('meshCurrentChart');
            const powerDistributionCanvas = document.getElementById('powerDistributionChart');
        // Current distribution chart (Line chart)
            const currentDistributionChart = new Chart(currentDistributionCanvas, {
                type: 'line',
                data: {
                    labels: ['Node A', 'Node B', 'Node C'],
                    datasets: [{
                        label: 'Current Distribution',
                        data: [i1, i2, i1 - i2],
                        borderColor: 'blue',
                        borderWidth: 2,
                        fill: false
                    }]
                },
                options: getChartOptions('Current (A)')
            });
                // Mesh current chart (Bar chart)
            const meshCurrentChart = new Chart(meshCurrentCanvas, {
                type: 'bar',
                data: {
                    labels: ['Mesh 1', 'Mesh 2'],
                    datasets: [{
                        label: 'Mesh Current',
                        data: [i1, i2],
                        backgroundColor: ['green', 'orange'],
                        borderWidth: 1
                    }]
                },
                options: getChartOptions('Current (A)')
            });
            // Power distribution chart (Line chart)
            const powerDistributionChart = new Chart(powerDistributionCanvas, {
                type: 'line',
                data: {
                    labels: ['Node A', 'Node B', 'Node C'],
                    datasets: [{
                        label: 'Power Distribution',
                        data: [i1 * i1, i2 * i2, (i1 - i2) * (i1 - i2)],
                        borderColor: 'red',
                        borderWidth: 2,
                        fill: false
                    }]
                },
                options: getChartOptions('Power (W)')
            });
        }
        function getChartOptions(yAxisLabel) {
            return {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    yAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: yAxisLabel
                        }
                    }]
                }
            };
        }
    });
    