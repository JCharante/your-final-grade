#!/usr/bin/env bash
docker build -t jcharante/yfg-api . && docker push jcharante/yfg-api && docker-machine ssh nyc-drone-1 'docker service update --image jcharante/yfg-api yfg-api'
