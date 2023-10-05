'use strict'

const sqlite = require('sqlite3')

const db = new sqlite.Database('Meme generator.db', (err) => {
    if(err) throw err;
})
const bcrypt = require('bcrypt');

exports.getUser = (email, password) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM Creators WHERE email = ?';
        
        db.get(sql, [email], (err, row) => {
            if(err)
                {
                    reject(err);}
            else if(row === undefined)
                resolve(false)
            else{
                const user = {id: row.id, email: row.email, name: row.name};
                bcrypt.compare(password, row.hash).then(res =>{
                    if(res)
                        {
                            
                            resolve(user);}
                    else
                        resolve(false); // password not matching                
                });
            }

        });
    });
}

exports.getUserById = (id) =>{
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM Creators WHERE id = ?'
        db.get(sql, [id], (err, row) => {
            if(err)
                reject(err)
            else if(row === undefined)
                resolve({error: 'User not found'});
            else{
                const user = {id: row.id, email: row.email, name: row.name};
                resolve(user);
            }
        })
    })
}