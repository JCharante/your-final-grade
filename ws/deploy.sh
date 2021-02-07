#!/usr/bin/env bash
CMD="docker service create --name yfg-ws -p 3002:3002 -e YFG_API_ATLAS_URL=\"${YFG_API_ATLAS_URL}\" jcharante/yfg-ws"
CONT="docker-machine ssh nyc-drone-1 '${CMD}'"
docker build -t jcharante/yfg-ws . && docker push jcharante/yfg-ws && eval "docker-machine ssh nyc-drone-1 '${CMD}'"
