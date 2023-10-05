# Exam #2: "Meme Generator"
## Student: RUSSO FRANCESCA

## React Client Application Routes

- Route `/`: home page where the visitors can see the public memes and the creators, once logged, can see all the memes, operate on them (copy/delete) and create new ones
- Route `/login`: login page

## API Server
### APIs to perform the access

- GET `/api/sessions/current`  
  - description: API used to recover the current accessed user
  - request parameters: None
  - response body content: 
  ```http
  {
  "id": 1,
  "email": "f.russo123@studenti.polito.it",
  "name": "Francesca"
  }
  ```

- POST `/api/sessions`  
  - description: API used to perform the login
  - request body content:
  ```http
    {   
      "username": "f.russo123@studenti.polito.it",
      "password": "cane"
    }
  ```
  - response body content:
  ```http
  {
    "id": 1,
    "email": "f.russo123@studenti.polito.it",
    "name": "Francesca"
  }
  ```

- DELETE `/api/sessions/current`
  - description: API used to perfom the logout
  - request body content: Empty
  - response body content: Empty

### APIs to handle memes

- GET `/api/memes`
  - description: API user to get all memes, public and protected ones
  - request body content: Empty
  - response body content: 
  ```http
  [
    {
      "id": 43,
      "title": "Italy wins Euro 2020",
      "sentence1": "IT'S COMING ROME",
      "sentence2": "",
      "sentence3": "",
      "visibility": "public",
      "color": "color-white",
      "font": "font-anton",
      "positionOfSentence1": "bottom-single-text",
      "positionOfSentence2": null,
      "positionOfSentence3": null,
      "creator": "Francesca",
      "background": "victory.png",
      "creatorid": 1
    },
    {
      "id": 45,
      "title": "Exams",
      "sentence1": "Pass PDS exam",
      "sentence2": "",
      "sentence3": "",
      "visibility": "protected",
      "color": "color-blue",
      "font": "font-anton",
      "positionOfSentence1": "center-left2",
      "positionOfSentence2": null,
      "positionOfSentence3": null,
      "creator": "Francesca",
      "background": "uno.png",
      "creatorid": 1
    },
    {
      "id": 46,
      "title": "My life choices",
      "sentence1": "Computer engineering",
      "sentence2": "Social life",
      "sentence3": "Me",
      "visibility": "protected",
      "color": "color-white",
      "font": "font-palanquin",
      "positionOfSentence1": "top-right2",
      "positionOfSentence2": "center-left",
      "positionOfSentence3": "bottom-single-text",
      "creator": "Ciccio",
      "background": "car.png",
      "creatorid": 2
    }
  ]
  ```

- GET `/api/memes/filter=public`
  - description: API used to get only public memes
  - request body content: Empty
  - response body content: 
  ```http
  [
    {
      "id": 43,
      "title": "Italy wins Euro 2020",
      "sentence1": "IT'S COMING ROME",
      "sentence2": "",
      "sentence3": "",
      "visibility": "public",
      "color": "color-white",
      "font": "font-anton",
      "positionOfSentence1": "bottom-single-text",
      "positionOfSentence2": null,
      "positionOfSentence3": null,
      "creator": "Francesca",
      "background": "victory.png",
      "creatorid": 1
    }
  ]
  ```

- POST `/api/memes`
  - description: API used to save a meme
  -  request body content:
  ```http
    {
    "background": 3,
    "color": "color-white",
    "font": "font-anton",
    "sentence1": " cx",
    "sentence2": "",
    "sentence3": "",
    "title": "hgfdsa",
    "visibility": "protected"
  }
  ```
  - response body content:
  ```http
  {
    "id of the new meme": 47
  }
  ```

- DELETE `/api/memes/:id`
  - description: API to delete a meme with a given id
  - request parameter: id of the meme to delete
  - response body content:
  ```http
  {
    "id of the deleted meme": "47"
  }
  ```

### APIs to recover the backgrounds

- GET `/api/backs`
  - description: API used to recover all the backgrounds to create new memes
  - request body content: Empty
  - response body content:
  ```http
  [
    {
      "id": 1,
      "background": "winnie.png",
      "positionOfSentence1": "top-right",
      "positionOfSentence2": "bottom-right",
      "positionOfSentence3": null
    },
    {
      "id": 2,
      "background": "uno.png",
      "positionOfSentence1": "center-left2",
      "positionOfSentence2": null,
      "positionOfSentence3": null
    },
    {
      "id": 3,
      "background": "toystory.png",
      "positionOfSentence1": "bottom-single-text",
      "positionOfSentence2": null,
      "positionOfSentence3": null
    },
    {
      "id": 4,
      "background": "car.png",
      "positionOfSentence1": "top-right2",
      "positionOfSentence2": "center-left",
      "positionOfSentence3": "bottom-single-text"
    },
    {
      "id": 5,
      "background": "buttons.png",
      "positionOfSentence1": "center-left",
      "positionOfSentence2": "top-right",
      "positionOfSentence3": null
    },
    {
      "id": 6,
      "background": "bike.png",
      "positionOfSentence1": "top-right",
      "positionOfSentence2": "center-right",
      "positionOfSentence3": "bottom-single-text"
    },
    {
      "id": 7,
      "background": "victory.png",
      "positionOfSentence1": "bottom-single-text",
      "positionOfSentence2": null,
      "positionOfSentence3": null
    }
  ]
  ```





## Database Tables

- Table `Creators`:  
  - stores the information of the creators
  - contains id, email, name, hash
- Table `Images`:
  - stores the information of the available backgrounds
  - contains id, background, positionOfSentence1, positionOfSentence2, positionOfSentence3
- Table `Memes`:
  - stores the information of the created memes
  - contains id, title, sentence1, sentence2, sentence3, visibility, creator, background, color, font

## Main React Components

- `ErrorDisplay` in `ErrorManager.js` is a component to display images in case of errors;
- `Memes` in `GroupOfMemes.js` is the component used to display the list of Memes, it contains also the component `SingleMeme` used to render the single meme;
- `LoginForm` in `LoginComponent.js` is the component used to login the application;
- `Main` in `Main.js` is the main component used display the list of memes and the other components (`TopBar`, `NewButton`);
- `ModalCreate` in `ModalCreate.js` is the modal that is used to create/copy a meme. It contains the component `ModalForm` that is used to render the form to personalize the meme;
- `DeleteModal` in `ModalDelete.js` is used to confirm the deletion for a meme;
- `ModalDetails` in `ModalDetails.js` is used to display the details of a meme;
- `NewButton` in `NewButton.js` is used to add a new meme;
- `TopBar` in `TopBar.js` is rendered according the Rote. It contains the buttons to allow the user to login, logout the application (Home Route) or to go back to the home page (Login Route).


## Screenshot

![Screenshot](./img/screenshot.png)

## Users Credentials


| Username (e-mail) | Password | IDs of his/her memes |
| :------------- |:-------------| :-------------|
|	f.russo123@studenti.polito.it | cane | 1, 2, 3, 10|
|	ciccio.pasticcio@studenti.polito.it | ciccio | 4, 5, 6|
| gianni.gianni@studenti.polito.it | Salvia | 7, 8, 9|

Memes that are created by making a copy are denoted as "- Copy" in the title.
