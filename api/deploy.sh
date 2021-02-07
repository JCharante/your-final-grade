#!/usr/bin/env bash
CMD="docker service create --name yfg-api -p 3001:3001 -e YFG_API_ATLAS_URL=\"${YFG_API_ATLAS_URL}\" jcharante/yfg-api"
CONT="docker-machine ssh nyc-drone-1 '${CMD}'"
docker build -t jcharante/yfg-api . && docker push jcharante/yfg-api && eval "docker-machine ssh nyc-drone-1 '${CMD}'"
