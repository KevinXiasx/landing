#!/bin/bash

#
# 此脚本用于将项目中的文件，在开发配置和生产配置之间进行转换
#
# ./switch deve  进入开发配置
# ./switch product　进入工作配置


# 将ejs中引用less的标签改为引用css，或反向转换
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

# 将mongodb数据库的链接地址在服务器的配置和本地配置之间转换
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

# CDN,本地开发时，某些资源应为本地地址，上线时，某些库文件可以链向公共CDN,能大大减小服务器数据的传输量
cdn()
{
	grep -l -R views/* -e '<!--.*product.*-->' | sed 's;\([[:print:]]\{1,\}\);cp \1 \1.old;' | bash -x
	find . -name "*.old" -type f |
		while read file
		do
			sed -e '\:<!--'$1'-->: s;\(.\{10,\}\)\(<!--\);\2\1;' \
				-e '\:<!--.\{10,\}'$2'-->: s;\(<!--\)\(.\('$2'\);\2\1\3;' \
				< "$file" > "${file%.*}"
			rm "$file"
		done
}

if [ "$1" == "deve" ]; then
	lessswitch "less"
	mongodbswitch "deve"
	cdn product deve
elif [ "$1" == "product" ]; then
	lessswitch "css"
	mongodbswitch "product"
	cdn deve product 
	cd ./public/less/
	./less.sh　
fi