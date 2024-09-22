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
  databaseURL:
    "https://aircraft-monitoring-syst-dc5dc-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "aircraft-monitoring-syst-dc5dc",
  storageBucket: "aircraft-monitoring-syst-dc5dc.appspot.com",
  messagingSenderId: "320070089409",
  appId: "1:320070089409:web:662f5a82fcee4d9e00b240",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Reference to the sensor data in the database
const sensorRef = ref(database, "Sensors/sensor123"); // Update to your specific sensor path

// Real-time listener for sensor data (Temperature and Humidity)
onValue(sensorRef, (snapshot) => {
  const data = snapshot.val();
  if (data) {
    // Update temperature and humidity
    document.getElementById("humidity").innerHTML = `${data.Humidity}%`;
    document.getElementById(
      "temperature"
    ).innerHTML = `${data.Temperature}&deg;C`;

    // Update ultrasonic sensor data for radar chart
    radarChart.data.datasets[0].data = data.Ultrasonic || [
      5, 10, 15, 20, 25, 30, 35,
    ]; // Add fallback data
    radarChart.update();
  }
});

// Initialize the radar chart (after sensorRef declaration)
const ctx = document.getElementById("ultrasonicChart").getContext("2d");

// Add shadow effect to the canvas
ctx.shadowColor = "rgba(0, 0, 0, 0.5)"; // Shadow color
ctx.shadowBlur = 10; // Blur amount
ctx.shadowOffsetX = 5; // Horizontal shadow offset
ctx.shadowOffsetY = 5; // Vertical shadow offset

const radarChart = new Chart(ctx, {
  type: "radar",
  data: {
    labels: ["0°", "30°", "60°", "90°", "120°", "150°", "180°"],
    datasets: [
      {
        label: "Distance (cm)",
        data: [5, 10, 15, 20, 25, 30, 35],
        backgroundColor: "rgba(0, 255, 0, 0.4)", // Light green background
        borderColor: "rgba(0, 255, 0, 1)", // Green border
        borderWidth: 3, // Thicker border for better visibility
        pointBackgroundColor: "rgba(0, 255, 0, 1)", // Point color
        pointBorderColor: "#fff", // Point border color
        pointHoverBackgroundColor: "#ffcc00", // Hover color for points
        pointHoverBorderColor: "#fff", // Hover border for points
        pointRadius: 5, // Size of points
        pointHoverRadius: 7, // Size of points on hover
      },
    ],
  },
  options: {
    maintainAspectRatio: false,
    aspectRatio: 2,
    scales: {
      r: {
        angleLines: {
          color: "#ffffff", // White angle lines
        },
        grid: {
          color: "#000000", // Bold dark black grid line
        },
        label: {
          color: "#000000",
        },
        ticks: {
          beginAtZero: true,
          max: 50,
          color: "#000000", // White tick labels
          font: {
            size: 14, // Font size for tick labels
          },
        },
        title: {
          display: true,
          text: "Ultrasonic Sensor",
          color: "#000000", // Title color
          font: {
            size: 16,
            weight: "bold",
          },
          padding: {
            top: 20,
            bottom: 20,
          },
        },
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Dark background for the radar area
      },
    },
    plugins: {
      legend: {
        display: false, // Hiding legend since we're using a title
      },
    },
  },
});
