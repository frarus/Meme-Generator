import { Button, Modal, Card, Container, Row, Col, Form } from 'react-bootstrap';

import React, { useEffect, useState } from 'react';
import API from '../API'
import BackImage from '../BackgroundStructure'
import BeatLoader from "react-spinners/BeatLoader"

const BASEURL = 'http://localhost:3000/static/'




function SentenceField(props) {
    return (<Form.Row>
        <Form.Group as={Col} xs="12" controlId={"sentence" + props.id}>
            <Form.Label>Sentence {props.id}</Form.Label>
            <Form.Control isInvalid = {props.invalidSentences} type="text" placeholder="Insert the sentence" value={props.sentence}
                onChange={(event) => props.setSentence(event.target.value)} />
                {props.invalidSentences && <Form.Control.Feedback type="invalid">At least one sentence is required.</Form.Control.Feedback>}
        </Form.Group>
    </Form.Row>)
}

function MemeForm(props) {
    return (
        <>
            <Form>
                
                <Form.Row>
                    <Form.Group as={Col} xs="12" controlId="titleForm">
                        <Form.Label>Title</Form.Label>
                        <Form.Control isInvalid={props.invalidTitle} type="text" placeholder="Insert the title" value={props.title}
                            onChange={(event) => props.setTitle(event.target.value)} />
                            {props.invalidTitle && <Form.Control.Feedback type="invalid">The title is required to at least 3 characters</Form.Control.Feedback>}
                    </Form.Group>
                </Form.Row>
                {props.loadingBacks === false &&
                    <>
                        {props.image.positionOfSentence1 && <SentenceField invalidSentences = {props.invalidSentences} id={1} sentence={props.sentence1} setSentence={props.setSentence1}></SentenceField>}
                        {props.image.positionOfSentence2 && <SentenceField invalidSentences = {props.invalidSentences} id={2} sentence={props.sentence2} setSentence={props.setSentence2}></SentenceField>}
                        {props.image.positionOfSentence3 && <SentenceField invalidSentences = {props.invalidSentences} id={3} sentence={props.sentence3} setSentence={props.setSentence3}></SentenceField>}
                    </>}
                <Form.Row>
                    <Form.Group as={Col} xs="6" controlId="fontForm">
                        <Form.Label>Set font</Form.Label>
                        <Form.Control as="select" value={props.font} onChange={(event) => props.setFont(event.target.value)}>
                            <option>Anton</option>
                            <option>Palanquin</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group as={Col} xs="6" controlId="colorForm">
                        <Form.Label>Set color</Form.Label>
                        <Form.Control as="select" value={props.color} onChange={(event) => props.setColor(event.target.value)}>
                            <option>White</option>
                            <option>Black</option>
                            <option>Magenta</option>
                            <option>Blue</option>
                        </Form.Control>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} xs="12" controlId="visibilityForm">
                        <Form.Label>Set visibility status</Form.Label>
                        <Form.Control as="select" value={props.visibility} onChange={(event) => props.setVisibility(event.target.value)}
                            disabled={props.visibilityChange === true}>
                            <option>protected</option>
                            <option>public</option>
                        </Form.Control>
                    </Form.Group>
                </Form.Row>
            </Form>
        </>)
}

function ModalCreate(props) {
    const addMeme = (newMeme) => {
        API.addNewMeme(newMeme).then(() =>  {props.setDirty(true); } ).catch(err=>props.setError(err.msg));
    }


    const addMemeThenCloseModal = () => {

        const newMeme = {
            title: title, sentence1: sentence1, sentence2: sentence2, sentence3: sentence3,
            font: "font-" + font.toLowerCase(), color: "color-" + color.toLowerCase(), visibility: visibility,
            background: currentImage.id
        };
        addMeme(newMeme);
        props.setDirty(true);
        
        props.setModal(false);

    }


    const handleSubmit = (event) => {

        event.preventDefault();
        if (title.length >= 3 && (sentence1 !== "" || sentence2 !== "" || sentence3 !== "")) {
            addMemeThenCloseModal();
        }

        else {
            if (title.length < 3) {
                setInvalidTitle(true)
            } else setInvalidTitle(false);
            if (sentence1 === "" && sentence2 === "" && sentence3 === "")
            setInvalidSentences(true)
            else setInvalidSentences(false)

            
        }
    };
    
    const [imageList, setImageList] = useState([]);

    const modalTitle = (props.meme.id === undefined ? "New meme" : "Copy meme");
    const [currentImage, setCurrentImage] = useState(undefined);
    const [title, setTitle] = useState(props.meme.title);
    const [font, setFont] = useState(props.meme.font);
    const [color, setColor] = useState(props.meme.color);
    const [sentence1, setSentence1] = useState(props.meme.sentence1 || "");
    const [sentence2, setSentence2] = useState(props.meme.sentence2 || "");
    const [sentence3, setSentence3] = useState(props.meme.sentence3 || "");
    const [visibility, setVisibility] = useState(props.meme.visibility);


    const [loadingBacks, setLoadingBacks] = useState(true);
  
    const [invalidTitle, setInvalidTitle] = useState(false);
    const [invalidSentences, setInvalidSentences] = useState(false);

    const image = props.meme.background;
    

    useEffect(() => {
        const getImages = () => {
            API.getAllBacks()
                .then(imagesL => {
                    imagesL = imagesL.map(i => {
                        return new BackImage(i.id, i.background, i.positionOfSentence1, i.positionOfSentence2, i.positionOfSentence3)
                    })
                    setImageList(imagesL);
                    setCurrentImage(imagesL.filter(
                        e => e.background === image)[0]);
                })
                .finally(() => {
                    setLoadingBacks(false);
                })
        }
        getImages();
    }, [image]);

    return (
        <>
            <Modal show={true} onHide={() => props.setModal(false)} backdrop="static" keyboard={false} centered animation={false} size={'lg'}>
                <Modal.Header closeButton  >
                    <Modal.Title>{modalTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container className={'card-relative'}>
                        {props.meme.id === undefined && <>
                        {loadingBacks ? <div className='text-center'><BeatLoader/></div> :

                            <div className='card-list'>
                                {imageList.map((i) => (<Button key={i.id} width={100} height={100} variant="link outline-light" as="img" src={BASEURL + i.background} onClick={() => {
                                    setCurrentImage(i);
                                    setTitle("");
                                    setFont("Anton");
                                    setColor("White");
                                    setSentence1("");
                                    setSentence2("");
                                    setSentence3("");
                                    setVisibility("Protected");
                                }} />))}
                            </div>
                        }</>}

                        <Row>

                            <Col xs={8} className={'align-self-center'} >
                                
                                <Card >
                                    {loadingBacks ? <div className='text-center'><BeatLoader/></div> :
                                        <Container className="card-relative" >
                                            <Card.Img variant="top" src={BASEURL + currentImage.background}></Card.Img>
                                            <Card.ImgOverlay className="text-center">
                                                <Card.Text className={"standard-text font-" + font.toLowerCase() + " color-" + color.toLowerCase() + " " + currentImage.positionOfSentence1}>{sentence1}</Card.Text>
                                                <Card.Text className={"standard-text font-" + font.toLowerCase() + " color-" + color.toLowerCase() + " " + currentImage.positionOfSentence2}>{sentence2}</Card.Text>
                                                <Card.Text className={"standard-text font-" + font.toLowerCase() + " color-" + color.toLowerCase() + " " + currentImage.positionOfSentence3}>{sentence3}</Card.Text>
                                            </Card.ImgOverlay>
                                        </Container>}
                                </Card>
                            </Col>
                            <Col>
                                <MemeForm invalidTitle={invalidTitle} invalidSentences={invalidSentences} image={currentImage} title={title} setTitle={setTitle} font={font} setFont={setFont} color={color} setColor={setColor}
                                    sentence1={sentence1} setSentence1={setSentence1} sentence2={sentence2} setSentence2={setSentence2} sentence3={sentence3} setSentence3={setSentence3} visibility={visibility}
                                    setVisibility={setVisibility} loadingBacks={loadingBacks} visibilityChange={props.meme.visibilityChange} />
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-info" onClick={() => props.setModal(false)}>
                        Close
                    </Button>
                    <Button variant="outline-info" onClick={handleSubmit}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>)
}

export default ModalCreate;
