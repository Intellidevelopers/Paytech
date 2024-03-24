const wheel = document.getElementById("wheel");
const spinBtn = document.getElementById("spin-btn");
const finalValue = document.getElementById("final-value");
const balanceSpan = document.getElementById("balance");

const rotationValues = [
  { minDegree: 0, maxDegree: 30, value: 2 },
  { minDegree: 31, maxDegree: 90, value: 50 },
  { minDegree: 91, maxDegree: 150, value: 0 },
  { minDegree: 151, maxDegree: 210, value: 25 },
  { minDegree: 211, maxDegree: 270, value: 200 },
  { minDegree: 271, maxDegree: 330, value: 0 },
  { minDegree: 331, maxDegree: 360, value: 20 },
];

const data = [16, 16, 16, 16, 16, 16];
const pieColors = ["#8b35bc", "#b163da", "#8b35bc", "#b163da", "#8b35bc", "#b163da"];

let myChart = new Chart(wheel, {
  plugins: [ChartDataLabels],
  type: "pie",
  data: {
    labels: ['₦50', '₦20', '0', '₦200', '₦25', 'Failed!'],
    datasets: [
      {
        backgroundColor: pieColors,
        data: data,
      },
    ],
  },
  options: {
    responsive: true,
    animation: { duration: 0 },
    plugins: {
      tooltip: false,
      legend: {
        display: false,
      },
      datalabels: {
        color: "#ffffff",
        formatter: (_, context) => context.chart.data.labels[context.dataIndex],
        font: { size: 24 },
      },
    },
  },
});

// Function to retrieve balance from local storage
const getBalanceFromLocalStorage = () => {
  const balanceString = localStorage.getItem('balance');
  return balanceString ? parseFloat(balanceString) : 0; // If balance doesn't exist in local storage, return 0
};

// Function to store balance in local storage
const storeBalanceInLocalStorage = (balance) => {
  localStorage.setItem('balance', balance.toString());
};

// Initialize balance display
balanceSpan.innerText = getBalanceFromLocalStorage().toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');

// Function to display value based on the random angle
const valueGenerator = (angleValue) => {
  for (let i of rotationValues) {
    if (angleValue >= i.minDegree && angleValue <= i.maxDegree) {
      finalValue.innerHTML = `<p>You Won: ${i.value}</p>`;
      if (i.value !== 'Failed!') {
        // Update balance if it's not a failure
        let currentValue = getBalanceFromLocalStorage();
        let newValue = currentValue + i.value;
        storeBalanceInLocalStorage(newValue);
        balanceSpan.innerText = newValue.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
      }
      break;
    }
  }
};

// Spinner count
let count = 0;

// 100 rotations for animation and last rotation for result
let resultValue = 101;

// Event listener for the spin button
spinBtn.addEventListener("click", () => {
  // Increment the spin count
  count++;

  // Empty final value
  finalValue.innerHTML = `<p>Good Luck!</p>`;

  // Generate random degrees to stop at
  let randomDegree = Math.floor(Math.random() * (355 - 0 + 1) + 0);

  // Interval for rotation animation
  let rotationInterval = window.setInterval(() => {
    myChart.options.rotation = myChart.options.rotation + resultValue;
    myChart.update();

    if (myChart.options.rotation >= 360) {
      count++;
      resultValue -= 5;
      myChart.options.rotation = 0;
    } else if (count > 15 && myChart.options.rotation == randomDegree) {
      valueGenerator(randomDegree);
      clearInterval(rotationInterval);
      count = 0;
      resultValue = 101;
    }
  }, 10);
});
