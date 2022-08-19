#!/bin/bash
set -e

docker run \
  -p 3000:3000 \
  --name reference-check \
  -dt reference-check