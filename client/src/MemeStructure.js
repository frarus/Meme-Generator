function Meme(id, title, sentence1, sentence2, sentence3, visibility, color,
    font, positionOfSentence1, positionOfSentence2, positionOfSentence3,
    creator, background, creatorid) {

    this.id = id;
    this.title = title;
    this.sentence1 = sentence1;
    this.sentence2 = sentence2;
    this.sentence3 = sentence3;
    this.visibility = visibility;
    this.color = color;
    this.font = font;
    this.positionOfSentence1 = positionOfSentence1;
    this.positionOfSentence2 = positionOfSentence2;
    this.positionOfSentence3 = positionOfSentence3;
    this.creator = creator;
    this.background = background;
    this.creatorid = creatorid;

}

export default Meme;