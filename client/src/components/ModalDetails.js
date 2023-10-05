import { Modal, Card, Container, Row, Col } from 'react-bootstrap';

const BASEURL = 'http://localhost:3000/static/'

function ModalDetails(props) {
  
    return (
        <Modal show={true} onHide={() => props.setModal(false)} backdrop="static"
            keyboard={false} centered animation={false} size={'lg'}>
            <Modal.Header closeButton>
                <Modal.Title>Properties of the meme</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <Row>
                        <Col xs={8}>
                            <Card>
                                <Container className="card-relative" >
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
                                </Container>
                            </Card>
                        </Col>
                        <Col className={'align-self-center'}>
                        <p>

                            Title: {props.meme.title} <br/>
                            Visibility: {props.meme.visibility}<br/>
                            Creator Name: {props.meme.creator}
                        </p>
                        </Col>
                    </Row>
                </Container>
            </Modal.Body>
        </Modal>
    )
}

export default ModalDetails;