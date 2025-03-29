export default class ChartSystem {
	constructor() {
		this.datasetsOptions = []
		this.highestX = []

		this.aspectRation = 2

		this.MyChart = ""
	}

	createCharts() {
		if (this.MyChart !== "") {
			this.MyChart.destroy()
		}

		this.MyChart = new Chart("myChart", {
			type: "line",
			data: {
				labels: this.highestX,
				datasets: this.datasetsOptions
			},
			options: {
				responsive: true,
				aspectRatio: this.aspectRation,
				plugins: {
					title: {
						display: true,
						text: "Распределение Максвелла-Больцмана"
					},
					legend: {
						display: true
					}
				},
				scales: {
					x: {
						title: {
							display: true,
							text: "V (м/с)", // title for OX
							align: "end",
							color: "rgb(0, 0, 0)"
						}
					},
					y: {
						title: {
							display: true,
							text: "F(v)*10^3 (с/м)", // title for OY
							align: "end",
							color: "rgb(0, 0, 0)"
						}
					}
				}
			}
		})
	}

	addChart(vmax, M, T, id) {
		let xValues = []
		let yValues = []
		const step = 50

		for (let x = 0; x <= vmax; x += step) {
			xValues.push(x)
			yValues.push(maksvelsChart(x, M, T))
		}

		if (this.highestX.length < xValues.length) {
			this.highestX = xValues
		}

		let newChart = {
			id: id,
			label: `${String(id)} график`,
			data: yValues,
			borderColor: `rgba(${Math.floor(Math.random() * 255)}, 
				${Math.floor(Math.random() * 255)}, 
				${Math.floor(Math.random() * 255)}, .6)` // random color
		}

		this.datasetsOptions.push(newChart)

		this.createCharts()
	}

	changeAspectRation(newValue) {
		this.aspectRation = newValue
	}

	delChart() {
		// in future
	}
}

function maksvelsChart(v, M, T) {
	const R = 8.314
	const coefficient = Math.pow(M / (2 * Math.PI * R * T), 3 / 2)
	const exponential = Math.exp(-(M * Math.pow(v, 2)) / (2 * R * T))

	let result = 4 * Math.PI * coefficient * Math.pow(v, 2) * exponential * 1000

	return result
}
