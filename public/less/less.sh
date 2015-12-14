#!/bin/bash

# 用于生成../css/下的文件

for file in ./*
do
    if test -f "$file"
    then
    	if [ "${file##*.}" = "less" ]
    	then
            lessc "$file" "../css/${file%.*}.css"
    	fi
    fi
done

