'use strict'

const sqlite = require('sqlite3')

const db = new sqlite.Database('Meme generator.db', (err) => {
    if(err) throw err;
})
const bcrypt = require('bcrypt');

exports.listBackgrounds = () => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM Images';
        db.all(sql, (err, rows) => {
            if (err) {
                reject(err);
                return;
            }
            const backgrounds = rows.map((e) => ({ id: e.id, background: e.background,
                positionOfSentence1: e.positionOfSentence1, positionOfSentence2: e.positionOfSentence2,
                positionOfSentence3: e.positionOfSentence3}))
            resolve(backgrounds);
        })
    })
}

