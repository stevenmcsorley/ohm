import requests
import json
import time
from kafka import KafkaProducer, errors
import logging
from datetime import datetime, timedelta

# Configure logging
# logging.basicConfig(level=logging.INFO)

# Constants
API_KEY = 'EP8BLZ-YCNL8Q-PNS2FR-51BF'  # Replace with your actual API key
BASE_URL = 'https://api.n2yo.com/rest/v1/satellite'
TOPIC = 'satellite-positions'
REQUESTS_PER_ROUND = 11  # Number of requests per round

# List of NORAD IDs for the NAVSTAR satellites
SATELLITE_NORAD_IDS = [
    45854, 44506, 41019, 40730, 40534, 39533, 39166,
    32711, 32260, 27704, 27663
]

# Observer's location
OBSERVER_LAT = 41.702
OBSERVER_LNG = -76.014
OBSERVER_ALT = 0
SECONDS = 60  # Number of future positions to return

# Rate limiting variables
RATE_LIMIT = 1000
ROUNDS_PER_HOUR = RATE_LIMIT // REQUESTS_PER_ROUND
INTERVAL_BETWEEN_ROUNDS = 3600 / ROUNDS_PER_HOUR

# Function to fetch satellite data
def fetch_satellite_data(satid):
    url = f'{BASE_URL}/positions/{satid}/{OBSERVER_LAT}/{OBSERVER_LNG}/{OBSERVER_ALT}/{SECONDS}/&apiKey={API_KEY}'
    response = requests.get(url)
    return response.json()

# Retry logic for Kafka producer connection
producer = None
while not producer:
    try:
        producer = KafkaProducer(bootstrap_servers='kafka:9092',
                                 value_serializer=lambda v: json.dumps(v).encode('utf-8'))
        # logging.info("Kafka producer connected successfully.")
    except errors.NoBrokersAvailable:
        # logging.error("No Kafka brokers available, retrying in 5 seconds...")
        time.sleep(5)

# Produce data to Kafka
while True:
    for i in range(0, len(SATELLITE_NORAD_IDS), REQUESTS_PER_ROUND):
        current_batch = SATELLITE_NORAD_IDS[i:i + REQUESTS_PER_ROUND]
        for satid in current_batch:
            satellite_data = fetch_satellite_data(satid)
            # logging.info("Fetched satellite data: %s", satellite_data)
            producer.send(TOPIC, satellite_data)
            # logging.info("Data sent to Kafka topic '%s'.", TOPIC)
        time.sleep(INTERVAL_BETWEEN_ROUNDS)
