import requests
import json
import time
from kafka import KafkaProducer, errors
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)

# Function to fetch satellite data
def fetch_satellite_data():
    # url = 'https://api.n2yo.com/rest/v1/satellite/positions/25544/41.702/-76.014/0/2/&apiKey=EP8BLZ-YCNL8Q-PNS2FR-51BF'
    url = 'https://api.n2yo.com/rest/v1/satellite/positions/24946/41.702/-76.014/0/15/&apiKey=EP8BLZ-YCNL8Q-PNS2FR-51BF'

    response = requests.get(url)
    return response.json()

# Retry logic for Kafka producer connection
producer = None
while not producer:
    try:
        producer = KafkaProducer(bootstrap_servers='kafka:9092',
                                 value_serializer=lambda v: json.dumps(v).encode('utf-8'))
        logging.info("Kafka producer connected successfully.")
    except errors.NoBrokersAvailable:
        logging.error("No Kafka brokers available, retrying in 5 seconds...")
        time.sleep(5)

# Produce data to Kafka
while True:
    satellite_data = fetch_satellite_data()
    logging.info("Fetched satellite data: %s", satellite_data)
    producer.send('satellite-positions', satellite_data)
    logging.info("Data sent to Kafka topic 'satellite-positions'.")
    time.sleep(10)  # Fetch data every second
