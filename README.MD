curl -X PATCH -H "Content-Type: application/json" -d "{\"Humidity\": \"55\", \"Temperature\": \"22\"}" "https://aircraft-monitoring-syst-dc5dc-default-rtdb.asia-southeast1.firebasedatabase.app/Sensors/sensor123.json"

TO directly update the Firebase data




curl -X PATCH -d "{\"Temperature\": 30, \"Humidity\": 55, \"Proximity\": 90}" "https://sensor-database-9bafe-default-rtdb.asia-southeast1.firebasedatabase.app/Ultrasonic.json"
