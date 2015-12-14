#!/bin/bash

#
# 此脚本用于将所有ejs模板文件中，引用less文件的link标签，改为引用同名的css文件
#

lessswitch()
{
	if [ "$1" == "css" ]; then
		TAR="css"
		SRC="less"
		SEDRULE="\://less-css: s;require;//require;"
	elif [ "$1" == "less" ]; then
		TAR="less"
		SRC="css"
		SEDRULE="\://less-css: s;.*// *r; r;"
	else
		echo argument is err!
		exit 0
	fi

	 grep -l -R views/* public/javascripts/* \
	 		-e '<!-- less-css -->'  \
	 		-e '//less-css'  \
	 		| sed 's;\([[:print:]]\{1,\}\);cp \1 \1.old;' | bash -x

	find . -name "*.old" -type f |
		while read file
		do
			sed -e '\:<!-- less-css -->: s;\([^- ]\)'$SRC';\1'$TAR';g' \
				-e "$SEDRULE"  < "$file" > "${file%.*}"
			rm "$file"
		done
}

mongodbswitch()
{
	cp ./myclass/resolve.js ./myclass/resolve.js.bp
	if [ "$1" == "deve" ]; then
		sed -e 's;user.*pass[^}]*};/*opt*/};g' -e 's;:27612;;' ./myclass/resolve.js.bp > ./myclass/resolve.js
	else
		sed -e 's;/\*opt\*/;user:"landingpage",pass:"R0ck.me@sz";' -e 's;\(mongodb://127.0.0.1\)/;\1:27612/;' ./myclass/resolve.js.bp > ./myclass/resolve.js
	fi
	rm 	./myclass/resolve.js.bp
}

if [ "$1" == "deve" ]; then
	lessswitch "less"
	mongodbswitch "deve"
elif [ "$1" == "product" ]; then
	lessswitch "css"
	mongodbswitch "product"
fi