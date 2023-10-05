'use strict'

const sqlite = require('sqlite3')

const db = new sqlite.Database('Meme generator.db', (err) => {
    if (err) throw err;
})
const bcrypt = require('bcrypt');

exports.listAllMemes = () => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT Memes.ID, Memes.title, Memes.sentence1,
        Memes.sentence2, Memes.sentence3, Memes.visibility, Memes.color, Memes.font,
        Images.positionOfSentence1, Images.positionOfSentence2, Images.positionOfSentence3,
        Creators.name, Images.background, memes.creator FROM Memes, Creators, Images
        WHERE Memes.background=Images.id AND Memes.creator=Creators.id`;

        db.all(sql, (err, rows) => {
            if (err) {
                reject(err);
                return;
            }

            const memes = rows.map((e) => ({
                id: e.id, title: e.title, sentence1: e.sentence1,
                sentence2: e.sentence2, sentence3: e.sentence3,
                visibility: e.visibility, color: e.color,
                font: e.font, positionOfSentence1: e.positionOfSentence1,
                positionOfSentence2: e.positionOfSentence2,
                positionOfSentence3: e.positionOfSentence3,
                creator: e.name, background: e.background, creatorid: e.creator
            }))
            resolve(memes);
        })
    })

}

exports.listOnlyPublicMemes = () => {
    return new Promise((resolve, reject) => {

        const sql = `SELECT memes.id, memes.title, memes.sentence1,
        memes.sentence2, memes.sentence3, memes.visibility, memes.color, memes.font,
        images.positionOfSentence1, images.positionOfSentence2, images.positionOfSentence3,
        creators.name, images.background, memes.creator  FROM memes, creators, images
        WHERE visibility= "public" AND memes.background=images.id AND 
        memes.creator=creators.id`;

        db.all(sql, (err, rows) => {
            if (err) {
                reject(err);
                return;
            }
            const memes = rows.map((e) => ({
                id: e.id, title: e.title, sentence1: e.sentence1,
                sentence2: e.sentence2, sentence3: e.sentence3,
                visibility: e.visibility, color: e.color,
                font: e.font, positionOfSentence1: e.positionOfSentence1,
                positionOfSentence2: e.positionOfSentence2,
                positionOfSentence3: e.positionOfSentence3,
                creator: e.name, background: e.background, creatorid: e.creator
            }))
            resolve(memes);
        })
    })

}

exports.deleteMemeById = (memeId, userid) => {
    return new Promise((resolve, reject) => {

        const sql = `delete from Memes where id = ? and creator=?`

        db.run(sql, [memeId, userid], (err) => {
            if (err) {
                reject(err);
                return;
            }

            resolve(`meme '${memeId}' is deleted as requested`);

        })
    })

}


exports.createNewMeme = (meme, user) => {

    const title = meme.title;
    const sentence1 = meme.sentence1;
    const sentence2 = meme.sentence2;
    const sentence3 = meme.sentence3;
    const visibility = meme.visibility.toLowerCase();
    const background = meme.background;
    const creator = user;
    const color = meme.color;
    const font = meme.font;


    return new Promise((resolve, reject) => {

        const sql = ` INSERT INTO Memes ( title, sentence1, sentence2, sentence3, visibility, 
            creator, background, color, font) VALUES (?,?,?,?,?,?,?,?,?) ; `;
        db.run(sql, [title, sentence1, sentence2, sentence3, visibility, creator, background, color, font],
            function (err) {
                if (err) {
                    reject(err);
                    return;
                }
                if (this.changes === 0)
                    reject(401)
                else resolve(this.lastID);
            });
    });
}
