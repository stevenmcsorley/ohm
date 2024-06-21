#!/bin/bash
kafka-broker-api-versions.sh --bootstrap-server localhost:9092 &> /dev/null
if [ $? -ne 0 ]; then
  exit 1
else
  exit 0
fi
