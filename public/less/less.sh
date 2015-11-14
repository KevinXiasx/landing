#!/bin/bash

for file in ./*
do
    if test -f "$file"
    then
	if [ "${file##*.}" = "less" ]
	then
        	lessc "$file" "../css/${file%.*}.css"
	fi
        # if [ "${file##*.}" = "png" ]
        # then
        # 	convert $file ${file%.*}.jpg
        # fi

#         if [ "${file##*.}" = "JPG" ]
 #        then
  #       	echo $file
   #      fi
    fi
done

