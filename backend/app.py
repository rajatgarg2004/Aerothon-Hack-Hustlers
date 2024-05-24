from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np
import requests
app = Flask(__name__)
CORS(app, resources={r"/classify": {"origins": "http://localhost:5173"}})

# Load the models
with open('scaler.pkl', 'rb') as file:
    scaler = pickle.load(file)

with open('gmm_model.pkl', 'rb') as file:
    gmm = pickle.load(file)

# Predefined weather to float dictionary
weather_to_float = {'Smoke': -0.026775820527341013, 'Clear': -0.051904099218437326, 'Haze': 0.015248380370697288, 'Unknown': -0.030526148904270137, 'Scattered Clouds': 0.0009865273799026925, 'Shallow Fog': 0.0009865273799026925, 'Mostly Cloudy': 0.0009865273799026925, 'Fog': 0.02605020412632472, 'Partly Cloudy': 0.0009865273799026925, 'Patches of Fog': 0.0009865273799026925, 'Thunderstorms and Rain': 0.0009865273799026925, 'Overcast': -0.05279675142216545, 'Rain': -0.011830033387927227, 'Light Rain': 0.0009865273799026925, 'Light Drizzle': 0.0009865273799026925, 'Drizzle': 0.008022861679456572, 'Mist': 0.026851750772547596, 'Volcanic Ash': 0.0009865273799026925, 'Thunderstorm': -0.01583717356488261, 'Light Thunderstorms and Rain': 0.0009865273799026925, 'Light Thunderstorm': 0.0009865273799026925, 'Squalls': 0.01857211992880415, 'Heavy Rain': 0.0009865273799026925, 'Light Haze': 0.0009865273799026925, 'Sandstorm': 0.0682884708898208, 'Widespread Dust': 0.0009865273799026925, 'Funnel Cloud': 0.0009865273799026925, 'Heavy Thunderstorms and Rain': 0.0009865273799026925, 'Heavy Thunderstorms with Hail': 0.0009865273799026925, 'Light Rain Showers': 0.0009865273799026925, 'Thunderstorms with Hail': 0.0009865273799026925, 'Partial Fog': 0.0009865273799026925, 'Light Fog': 0.0009865273799026925, 'Heavy Fog': 0.0009865273799026925, 'Blowing Sand': 0.0009865273799026925, 'Light Hail Showers': 0.0009865273799026925, 'Light Sandstorm': 0.0009865273799026925, 'Light Freezing Rain': 0.0009865273799026925, 'Rain Showers': 0.0009865273799026925}

# This should match your previous weather_to_float dictionary

condition_labels = ['optimal', 'bad']

def get_weather(city):
    api_key = "9e75102f2a1049a78a382719242005"
    api_url = f"https://api.weatherapi.com/v1/current.json?key={api_key}&q={city}&aqi=no"

    try:
        response = requests.get(api_url)
        response.raise_for_status()  # Raise an exception for non-2xx status codes
        weather_data = response.json()
        return weather_data
    except requests.exceptions.RequestException as e:
        print(f"Error fetching weather data: {e}")
        return None

@app.route('/classify', methods=['POST'])
def classify_weather():
    data = request.json
    condition = data['condition']
    
    if condition not in weather_to_float:
        return jsonify({'error': 'Condition not found'}), 404
    
    new_entry = [weather_to_float[condition]]
    new_entry_scaled = scaler.transform([new_entry])
    
    # Predict the cluster for the new entry
    cluster_label = gmm.predict(new_entry_scaled)[0]
    flight_condition = condition_labels[cluster_label]
    
    score = np.exp(gmm.score_samples(new_entry_scaled)[0])
    
    return jsonify({
        'condition': condition,
        'float_value': new_entry[0],
        'cluster_label': cluster_label,
        'flight_condition': flight_condition,
        'score': score
    })

if __name__ == '__main__':
    app.run(debug=True)
