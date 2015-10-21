#!/bin/bash

for file in ./*
do
    if test -f $file
    then
        lessc $file ${file%.*}.css
    fi
done

