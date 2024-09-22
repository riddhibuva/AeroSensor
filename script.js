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

// Real-time listener for sensor data
onValue(sensorRef, (snapshot) => {
  const data = snapshot.val();
  if (data) {
    // Update temperature and humidity
    document.getElementById("humidity").innerHTML = `${data.Humidity}%`;
    document.getElementById("temperature").innerHTML = `${data.Temperature}&deg;C`;

    // Update ultrasonic sensor data for radar chart
    radarChart.data.datasets[0].data = data.Ultrasonic ||  [10, 20, 10,10, 0, 0, 0]; 
    radarChart.update();

     // Update the ultrasonic sensor reading in the card
     const distance = data.Ultrasonic ? data.Ultrasonic[0] : 2; // Get the first reading or default to 0
    document.getElementById("ultrasonic").innerHTML = `${distance} cm`;
  }
});

// Initialize the radar chart
const ctx = document.getElementById("ultrasonicChart").getContext("2d");

// Add shadow effect to the canvas
ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
ctx.shadowBlur = 15;
ctx.shadowOffsetX = 5;
ctx.shadowOffsetY = 5;

const radarChart = new Chart(ctx, {
  type: "radar",
  data: {
    labels: ["0°", "30°", "60°", "90°", "120°", "150°", "180°"],
    datasets: [
      {
        label: "Distance (cm)",
        data: [10, 10, 10, 40, 10, 10, 10], // Example initial data
        backgroundColor: "rgba(0, 255, 0, 0.4)", // Light green background
        borderColor: "rgba(0, 255, 0, 1)", // Green border
        borderWidth: 3,
        pointBackgroundColor: "rgba(0, 255, 0, 1)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#ffcc00",
        pointHoverBorderColor: "#fff",
        pointRadius: 5,
        pointHoverRadius: 8,
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
          color: "rgba(255, 255, 255, 0.5)", // Lighter grid lines for contrast
        },
        ticks: {
          beginAtZero: true,
          max: 50,
          color: "#ffffff", // White tick labels
          font: {
            size: 14,
          },
        },
        title: {
          display: true,
          text: "Ultrasonic Sensor Distance",
          color: "#ffffff",
          font: {
            size: 16,
            weight: "bold",
          },
          padding: {
            top: 20,
            bottom: 20,
          },
        },
        backgroundColor: "rgba(0, 0, 0, 0.7)", // Darker background for better contrast
      },
    },
    plugins: {
      legend: {
        display: true, // Show legend if needed
        position: 'top', // Position of the legend
        labels: {
          color: "#ffffff", // Legend text color
        },
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)", // Tooltip background
        titleColor: "#ffffff", // Tooltip title color
        bodyColor: "#ffffff", // Tooltip body color
      },
    },
  },
});
