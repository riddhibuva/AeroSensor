// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import {
  getDatabase,
  ref,
  onValue,
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBK2pCmtWpVd0L4Y4DWuEvJ1dGi4ByIz4s",
  authDomain: "aircraft-monitoring-syst-dc5dc.firebaseapp.com",
  databaseURL: "https://aircraft-monitoring-syst-dc5dc-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "aircraft-monitoring-syst-dc5dc",
  storageBucket: "aircraft-monitoring-syst-dc5dc.appspot.com",
  messagingSenderId: "320070089409",
  appId: "1:320070089409:web:662f5a82fcee4d9e00b240",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Reference to the sensor data in the database
const sensorRef = ref(database, "Sensors/sensor123");

// Initialize the line chart
const ctx = document.getElementById("ultrasonicChart").getContext("2d");

// Add shadow effect to the canvas
ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
ctx.shadowBlur = 15;
ctx.shadowOffsetX = 5;
ctx.shadowOffsetY = 5;

const ultrasonicChart = new Chart(ctx, {
  type: "line",
  data: {
    labels: [], // Initialize empty labels
    datasets: [
      {
        label: "Distance (cm)",
        data: [], // Initialize empty data array
        backgroundColor: "rgba(0, 255, 0, 0.4)", 
        borderColor: "rgba(0, 255, 0, 1)", // Green border initially
        borderWidth: 3,
        pointBackgroundColor: "rgba(0, 255, 0, 1)",
        pointBorderColor: "#fff",
        pointRadius: 5,
        pointHoverRadius: 8,
      },
    ],
  },
  options: {
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Time',
          color: '#ffffff'
        },
        ticks: {
          color: '#ffffff'
        }
      },
      y: {
        beginAtZero: true,
        max: 50, // Adjust based on expected range
        title: {
          display: true,
          text: 'Distance (cm)',
          color: '#ffffff'
        },
        ticks: {
          color: '#ffffff'
        }
      }
    },
    plugins: {
      legend: {
        display: true,
        labels: {
          color: "#ffffff", // Legend text color
        },
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)", // Tooltip background
        titleColor: "#ffffff",
        bodyColor: "#ffffff",
      },
    },
  },
});

// Real-time listener for sensor data
onValue(sensorRef, (snapshot) => {
  const data = snapshot.val();
  if (data) {
    // Update temperature and humidity
    document.getElementById("humidity").innerHTML = `${data.Humidity}%`;
    document.getElementById("temperature").innerHTML = `${data.Temperature}&deg;C`;

    // Update the ultrasonic sensor reading in the card
    const distance = data.Ultrasonic || 0; // Get the distance directly, default to 0 if not available
    document.getElementById("ultrasonic").innerHTML = `${distance} cm`;

    // Update the line chart with the ultrasonic reading
    const time = new Date().toLocaleTimeString();
    if (ultrasonicChart.data.labels.length >= 20) {
      ultrasonicChart.data.labels.shift(); // Remove the oldest label
      ultrasonicChart.data.datasets[0].data.shift(); // Remove the oldest data point
    }
    ultrasonicChart.data.labels.push(time); // Add new label
    ultrasonicChart.data.datasets[0].data.push(distance); // Add new distance value

    // Change line color based on the distance threshold
    ultrasonicChart.data.datasets[0].borderColor = distance <= 15 ? "rgba(255, 0, 0, 1)" : "rgba(0, 255, 0, 1)"; // Red if <= 15, green otherwise

    ultrasonicChart.update(); // Update the chart
  }
});
