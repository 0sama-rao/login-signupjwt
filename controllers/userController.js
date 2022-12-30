var express = require ('express');
const sql = require('mssql');
const config = require('../dbconfig');


async function loginUser(user) {
    try {
      let pool = await sql.connect(config);
      let request = await pool.request()
      .input('userName', sql.VarChar, user.userName)
      .input('password', sql.VarChar, user.password)
        
      .query(`SELECT * FROM UsersEg where userName = @userName`);

    
    //   .then(result => {
            if (request.recordset.length > 0) {
              return (false,{message: "Record exist"})
            }
              else{
                try{
                    let pool = await sql.connect(config);
                    let request1 = await pool.request()
                .input('userName', sql.VarChar, user.userName)
                .input('password', sql.VarChar, user.password)
                
                .query(`insert into UsersEg(userName, password) 
                values(@userName, @password)`);
                // .then(() => res.send({ message: 'Account Registered! '}));
                
                  // if('userName'== user.userName in sql ){
                  //     console.log("UserName already exist")}
                  
                  // UserAdd=addUser.recordsets;
                  //console.log(result.recordset.length)
                  return true;
                  console.log(result.recordset.length)
            }
            catch(err){
                return (false,err)
            }
            }
        // });
        }
            
            
      
    
    catch (err) { 
        return (false, err);
      console.log(err);
    }
  }


  module.exports = {
      loginUser: loginUser
  }