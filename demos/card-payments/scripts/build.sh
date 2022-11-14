#!/bin/bash
set -e

docker build . \
  --build-arg	USE_COOKIE_SESSION=true \
  -t card-payments