
import { CardColumns, Card, Button, Row, Col } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import ModalDetails from './ModalDetails'
import ModalCreate from './ModalCreate'
import {DeleteModal} from './ModalDelete'
import {MdLock} from "react-icons/md";




const BASEURL = 'http://localhost:3000/static/'
const fonts = {
    "font-palanquin": "Palanquin",
    "font-anton": "Anton"
}
const colors = {
    "color-blue": "Blue",
    "color-white": "White",
    "color-black": "Black",
    "color-magenta": "Magenta"
}

function SingleMeme(props) {

    const [deleteModal, setDeleteModal] = useState(false)

    return (<>
        <Card>
            <Card.Body>
                <Card.Title>{props.meme.title}</Card.Title>
            </Card.Body>
            <Container onClick={() => {
                props.setShowModalDetailsMeme(props.meme);
                props.setShowModal(true);
            }} className="card-list-relative" >

                <Card.Img variant="top" src={BASEURL + props.meme.background}></Card.Img>
                <Card.ImgOverlay className="text-center">
                    {props.meme.sentence1 && <Card.Text key={1} className={"standard-text " +
                        props.meme.font + " " + props.meme.color + " " + props.meme.positionOfSentence1}>
                        {props.meme.sentence1}</Card.Text>}
                    {props.meme.sentence2 && <Card.Text key={2} className={"standard-text " +
                        props.meme.font + " " + props.meme.color + " " + props.meme.positionOfSentence2}>
                        {props.meme.sentence2}</Card.Text>}
                    {props.meme.sentence3 && <Card.Text key={3} className={"standard-text " +
                        props.meme.font + " " + props.meme.color + " " + props.meme.positionOfSentence3}>
                        {props.meme.sentence3}</Card.Text>}
                </Card.ImgOverlay>
                <Row>
                    {props.meme.visibility === 'protected' &&
                    <Col xs={1}><MdLock/></Col>}
                    <Col>
                <small className="text-muted">Created by {props.meme.creator}</small>
                </Col>
                
                </Row>
            </Container>
            {props.isLogged && <><Card.Footer className="d-flex justify-content-between">

                <Button variant="outline-info" onClick={() => {
                    
                    props.setShowModalCreateMeme({
                        id: props.meme.id,
                        title: props.meme.title,
                        background: props.meme.background,
                        sentence1: props.meme.sentence1,
                        sentence2: props.meme.sentence2,
                        sentence3: props.meme.sentence3,
                        font: fonts[props.meme.font],
                        color: colors[props.meme.color],
                        visibility: props.meme.visibility,
                        creator: props.userName,
                        
                        visibilityChange: props.creatorid !== props.meme.creatorid && props.meme.visibility === 'protected'

                    })
                    props.setShowModalCreate(true);
                }
                }
                >Copy</Button>

                <Button variant="outline-info" onClick={() => {
                    setDeleteModal(true);
                }} disabled={props.creatorid !== props.meme.creatorid}>
                    Delete</Button>
            </Card.Footer>
            <DeleteModal deleteModal={deleteModal} setDeleteModal={setDeleteModal} setDirty={props.setDirty}  setError={props.setError} id={props.meme.id} />
            </>
            }

        </Card>
         
    </>
         )

}

function Memes(props) {

    const [showModalDetails, setShowModalDetails] = useState(false);
    const [showModalDetailsMeme, setShowModalDetailsMeme] = useState(undefined);
    



    return (<><CardColumns>
        {props.memesList.map((m) => (<SingleMeme key={m.id}
            setShowModalCreate={props.setShowModalCreate} setShowModalCreateMeme={props.setShowModalCreateMeme}
            setShowModal={setShowModalDetails}
            setShowModalDetailsMeme={setShowModalDetailsMeme} username={props.username} isLogged={props.isLogged}
            meme={m} setMemesList={props.setMemesList} setDirty={props.setDirty} creatorid={props.creatorid} 
            setError={props.setError}
        ></SingleMeme>))}
    </CardColumns>

        {showModalDetails &&
            (<ModalDetails meme={showModalDetailsMeme} setModal={setShowModalDetails} />)}



        {props.showModalCreate &&
            <ModalCreate meme={props.showModalCreateMeme} images={props.images} 
            setModal={props.setShowModalCreate} username={props.username} setDirty={props.setDirty}  >
                
            </ModalCreate>

        }

    </>
    )

}

export { Memes }