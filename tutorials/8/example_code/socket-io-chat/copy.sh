#!/bin/bash

cat $1 | sed 's/	/    /g' | pbcopy
