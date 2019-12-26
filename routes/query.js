const mysql = require('mysql');

const connection = mysql.createConnection({
	host:'localhost',
	port:3306,
	user:'root',
	password:'@lulu022351',
	database:'chat_android'
});
connection.on('error',function(err){
	console.log('发生错误'+err);
})

const query = function(tableName,msg,callback){
	let sql;
	let result;
	sql = "select * from "+tableName+" where ";
	for(let i in msg){
        if(msg[i]!=null)
		  sql = sql+i+"='"+msg[i]+"' and ";
	}
	sql = sql.slice(0,-4);
	console.log(sql);
    connection.query(sql,function(err,rows){
	    if(err){
	    	result = {
                status:false,
            	msg:err
        	};
            return callback(result);
        }else{
        	
        	result = {
            	status:true,
            	msg:rows
            };
            return callback(result);
        }
    });
}

const add = function(tableName,msg,callback){
    let result;
	let sql = "insert into "+tableName+" values(";
	for(let i in msg){
		sql = sql+"'"+msg[i]+"',";
	}
    sql = sql.slice(0,-1);
	sql+=");";
    console.log(sql);
    connection.query(sql,function(err,rows){
	    if(err){
            result = {
                status:false,
                msg:err
            };
            return callback(result);
        }else{        
            result = {
                status:true,
                msg:rows
            };
            return callback(result);
        }
    });
}

const del = function(tableName,id,callback){
	const sql = "delete from "+tableName+" where Id='"+id+"';";
    console.log(sql);
    connection.query(sql,function(err,rows){
	    if(err){
            return callback({
            	status:false,
            	msg:err
            });
        }else{
            return callback({
            	status:true,
            	msg:rows
            });
        }
    });
}

const update = function(tableName,id,msg,callback){
	del(tableName,id,function(d){
        add(tableName,msg,function(a){
            return callback({del:d.status,add:a.status})
        });
    });
}

module.exports = {
	'query':query,
	'add':add,
	'del':del,
	'update':update
}
