const BASEURL = 'http://localhost:3000/api'; 

function ResponseException(msg) {
  this.msg = msg;
}

// ************ User API *****************
async function getUserInfo() {
  const response = await fetch(BASEURL + '/sessions/current');
  try {
    const userInfo = await response.json();
    if (response.ok) {
      return userInfo;
    } else {
      throw userInfo;  
    }
  } catch (err) {
    throw new ResponseException(response.status);
  }
}

async function logIn(credentials) {
  const res = await fetch(BASEURL + '/sessions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials)
  });
  if (res.ok) {
    const user = await res.json();
    return user; //user.name
  }
  else {
    try {
      const errDetail = await res.json();
      throw errDetail.message;
    }
    catch (err) {

      throw new ResponseException(res.status);
    }
  }
}

async function logOut() {
  await fetch(BASEURL + '/sessions/current', { method: 'DELETE' });
}

// ************ Memes API *****************

async function getAllMemes() {
  const res = await fetch(BASEURL + `/memes`);

  if (res.ok) {

    const jsonRes = await res.json()
    return (jsonRes)
  }
  else {
    throw new ResponseException(res.status);
  }
}

async function getPublicMemes() {
  const res = await fetch(BASEURL + '/memes/filter=public');
  if (res.ok) {

    const jsonRes = await res.json()
    return (jsonRes)
  }
  else {
    throw new ResponseException(res.status);
  }

}

async function getAllBacks() {
  const res = await fetch(BASEURL + `/backs`);

  if (res.ok) {
    const jsonRes = await res.json()

    return (jsonRes.map((e) => ({
      id: e.id, background: e.background,
      positionOfSentence1: e.positionOfSentence1, positionOfSentence2: e.positionOfSentence2,
      positionOfSentence3: e.positionOfSentence3
    })))
  }
  else {
    throw new ResponseException(res.status);
  }
}

async function addNewMeme(meme) {
  
  const res = await fetch(BASEURL + '/memes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "title": meme.title,
      "sentence1": (meme.sentence1 === null || meme.sentence1 === undefined) ? "" : meme.sentence1,
      "sentence2": (meme.sentence2 === null || meme.sentence2 === undefined) ? "" : meme.sentence2,
      "sentence3": (meme.sentence3 === null || meme.sentence3 === undefined) ? "" : meme.sentence3,
      "visibility": meme.visibility.toLowerCase(),
      "background": meme.background,
      "color": meme.color,
      "font": meme.font,

    })
  });

  if (res.ok) {
    return true
  } else {
    throw new ResponseException(res.status);
  }
}

async function deleteMemebyId(id) {

  const res = await fetch(BASEURL + `/memes/` + id, {
    method: 'DELETE'
  });
  if (res.ok) {
    return undefined;
  } else {
    throw new ResponseException(res.status);
  }

}


const API = {
  logIn, logOut, getUserInfo, deleteMemebyId, addNewMeme, getAllMemes,
  getAllBacks, getPublicMemes
}
export default API;