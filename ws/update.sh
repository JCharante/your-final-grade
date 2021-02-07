#!/usr/bin/env bash
docker build -t jcharante/yfg-ws . && docker push jcharante/yfg-ws && docker-machine ssh nyc-drone-1 'docker service update --image jcharante/yfg-ws yfg-ws'
