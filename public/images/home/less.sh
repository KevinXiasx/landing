#!/bin/bash

for file in ./*
do
    if test -f "$file"
    then
        #lessc $file ${file%.*}.css

        if [ "${file##*.}" = "png" ]
        then
        	convert "$file" "${file%.*}.jpg"
        fi
#         if [ "${file##*.}" = "JPG" ]
 #        then
  #       	mv $file ${file%.*}.jpg
   #      fi
    fi
done

