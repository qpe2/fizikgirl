document.addEventListener('DOMContentLoaded', function() {
    const plotButton = document.getElementById('plotButton');
    const temperatureInput = document.getElementById('temperature');
    const molarMassInput = document.getElementById('molarMass');

    plotButton.addEventListener('click', function() {
        const temperature = parseFloat(temperatureInput.value);
        const molarMass = parseFloat(molarMassInput.value);

        // Константы
        const R = 8.314; // Универсальная газовая постоянная

        // Функция распределения Максвелла-Больцмана
        function maxwellBoltzmann(v, M, T) {
            return 4 * Math.PI * Math.pow((M / (2 * Math.PI * R * T)), 1.5) * v * v * Math.exp(-M * v * v / (2 * R * T));
        }

        // Создаем данные для графика
        const vValues = [];
        const fValues = [];
        const vMax = []; // Максимальная скорость
        const step = 20; // Шаг для вычисления значений
        for (let v = 0; v <= vMax; v += step) {
            vValues.push(v);
            fValues.push(maxwellBoltzmann(v, molarMass, temperature));
        }

        const trace = {
            x: vValues,
            y: fValues,
            type: 'scatter',
            mode: 'lines',
            name: 'Распределение'
        };

        const layout = {
            title: 'Распределение Максвелла-Больцмана',
            xaxis: { title: 'Скорость (м/с)' },
            yaxis: { title: 'f(v)' }
        };

        Plotly.newPlot('plot', [trace], layout);
    });
});
