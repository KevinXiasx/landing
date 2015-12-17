网站开始运行前，应该先运行./switch.sh脚本，将一些配置改为线上服务器的配置（less文件的编译，mongodb服务器的地址等）


下面是文档的目录结构，

如果需要修改前端的视图，应该在public/less, public/jacascript, views/中修改．若只是修改文本，则在views/底下的md,txt中修改

    ├── app.js　　//express框架的设置都在这
    ├── bin
    │   └── www　　//启动文件，创建服务器的位置
    ├── ipMongoData.js　　　//数据库中存储的ip地址源
    ├── log    //运行log的记录点
    │   ├── logconfig.json
    │   ├── log.js
    │   └── logs
    ├── myclass  //后端的主要工作的类
    │   ├── email.js　　//发送邮件
    │   ├── mark.js　        //markdown文件的读取
    │   └── resolve.js　     //ip地址解析
    ├── node_modules　　　　　   //第三方库
    ├── package.json　       //项目配置文件
    ├── public　             //静态文件访问路径
    │   ├── css             //由less文件生成的css文件，由switch脚本生成
    │   ├── fonts　          
    │   ├── images
    │   ├── javascripts　    //非三方库的js文件
    │   ├── jquery　         
    │   ├── less　           //修改样式应该在这修改
    │   ├── loadfont.js　    //用于自动加载字体的脚本（基本无用了）
    │   ├── seajs-3.0.0　    
    │   └── stylesheets　    //bootstrap, font-awesone,存放位置
    ├── README.md
    ├── routes              //url解析，　处理业务请求的文件
    │   └── index.js
    ├── switch.sh　          //转换配置的bash脚本
    └── views　　             //前端模板
        ├── bottom.ejs
        ├── bottom.txt
        ├── design
        ├── error.ejs
        ├── header.ejs
        ├── header.txt
        ├── home
        ├── more
        ├── project
        └── seajs.ejs　      

