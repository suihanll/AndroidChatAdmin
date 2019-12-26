# Android 聊天APP(后端) #
## 1.数据库（MySQL） ##
1. chat_android数据库
2. user表（用户名，密码，邮箱）
>     
>     create table user(
>       username varchar(255) primary key,
>       password varchar(255),
>       mail varchar(255)
>     );

3.msg表（用户，时间，消息）
    
  