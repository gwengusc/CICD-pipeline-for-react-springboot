#!/bin/bash

# Set exit on error
set -e

# If the STAGE set, then it is AWS CodePipeline, otherwise local execution
if [ -z "${STAGE}" ]
then
    echo "There is no STAGE variable found."
    echo "Make sure you deployed the stack manually"
    STAGE="Dev"
else
    echo "Testing for ${STAGE} stage"
fi
