import { TopBar } from './TopBar';
import { Toast } from 'react-bootstrap';
import API from '../API';
import { useEffect, useState} from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import { LoginForm } from './LoginComponent';
import { Memes } from './GroupOfMemes';
import NewButton from './NewButton';

import Meme from "../MemeStructure";
import BounceLoader from "react-spinners/BounceLoader"
import { ErrorDisplay } from './ErrorManager';


const Main = () => {

    const [goToLogin, setGoToLogin] = useState(false);
    const [goHomePage, setGoHomePage] = useState(false);

    const [isLogged, setLogged] = useState(false) // must be init to false
    const [message, setMessage] = useState('');
    const [userInfo, setUserInfo] = useState({ id: '', name: '' });
    const [showToast, setShowToast] = useState(false);

    const [dirty, setDirty] = useState(true);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [memesList, setMemesList] = useState([]);


    const [showModalCreate, setShowModalCreate] = useState(false);
    const [showModalCreateMeme, setShowModalCreateMeme] = useState({
        title: "",
        background: "toystory.png",

        positionOfSentence1: "bottom-single-text",
        positionOfSentence2: "",
        positionOfSentence3: "",
        font: "Anton",
        color: "White",
        visibility: "protected",
        creator: "props.username"
    });



    useEffect(() => {
        const checkAuth = async () => {
            try {
                const user = await API.getUserInfo();
                setUserInfo({ id: user.id, name: user.name })
                setLogged(true);
            } catch (err) {
                console.log(err);
            }

        };
        checkAuth();
    }, []);

    const doLogIn = async (credentials) => {
        try {
            const user = await API.logIn(credentials);
            setMessage({ msg: `Welcome, ${user.name}!`, type: 'success' });

            setUserInfo({ id: user.id, name: user.name })
            setLogged(true);
            setDirty(true);

            setGoToLogin(false);
            setGoHomePage(true);


        } catch (err) {
            if (err.msg === 500) {
                setMessage({ msg: "Unable to contact Server, please reload the page", type: 'danger' });
            }
            else
                setMessage({ msg: "Username or password are wrong", type: 'danger' })
        }
        setShowToast(true);
    }

    const doLogout = async () => {
        await API.logOut();
        setLogged(false);

        setUserInfo({ id: '', name: '' })
        setMessage({ msg: `Successful logout`, type: 'success' });
        setDirty(true);
        setGoHomePage(true);


    }

    useEffect(() => {
        if (dirty && !isLogged) {
            setLoading(true);
            API.getPublicMemes()
                .then(memesL => {

                    memesL = memesL.map(m => {
                        return new Meme(m.id, m.title, m.sentence1, m.sentence2,
                            m.sentence3, m.visibility, m.color,
                            m.font, m.positionOfSentence1, m.positionOfSentence2, m.positionOfSentence3,
                            m.creator, m.background, m.creatorid);
                    })
                    setMemesList(memesL);

                })
                .catch(err => setError(err.msg))
                .finally(() => { setDirty(false); setLoading(false); })
        } else if (dirty && isLogged) {
            setLoading(true);
            API.getAllMemes()
                .then(memesL => {

                    memesL = memesL.map(m => {
                        return new Meme(m.id, m.title, m.sentence1, m.sentence2,
                            m.sentence3, m.visibility, m.color,
                            m.font, m.positionOfSentence1, m.positionOfSentence2, m.positionOfSentence3,
                            m.creator, m.background, m.creatorid);
                    })
                    setMemesList(memesL);

                }).catch(err => setError(err.msg))
                .finally(() => { setDirty(false); setLoading(false); })
        }
    }, [dirty, isLogged])


    return (
        <Router>

            {!loading && <TopBar userName={userInfo.name} logout={doLogout} isLogged={isLogged} setGoToLogin={setGoToLogin} goToLogin={goToLogin}
                setGoHomePage={setGoHomePage} goHomePage={goHomePage} />}

            <Container fluid>
                {goHomePage && <Redirect to="/" />}
                {goToLogin && <Redirect to="/login" />}

                <Switch>

                    <Route exact path="/login" render={() =>
                        <LoginForm login={doLogIn} goToLogin={setGoToLogin} />
                    } />

                    <Route exact path='/' render={() =>
                        error ? <ErrorDisplay error={error} /> :
                            loading ?
                                <div className='spinner'>
                                    <BounceLoader loading={loading} /> </div> :
                                <>
                                    {isLogged && <NewButton showModalCreateMeme={showModalCreateMeme} setShowModalCreateMeme={setShowModalCreateMeme}
                                        setShowModalCreate={setShowModalCreate} setError={setError} />}
                                    <Memes setShowModalCreate={setShowModalCreate} showModalCreate={showModalCreate}
                                        showModalCreateMeme={showModalCreateMeme} setShowModalCreateMeme={setShowModalCreateMeme}
                                        isLogged={isLogged} memesList={memesList} creatorid={userInfo.id} setDirty={setDirty} setError={setError}></Memes>

                                </>}
                    >
                    </Route>

                </Switch>

                <Row className="row-h-100">
                    {
                        message && <Row className="below-nav position-toast" ><Toast className={`m-3`} animation={false} onClose={() => { setMessage(''); setShowToast(false) }} show={showToast} autohide={message.type === 'success' ? true : false} delay={3000}>
                            <Toast.Header className={`toast-style-${message.type}`} closeButton={message.type === 'success' ? false : true}>{message.msg}</Toast.Header>
                        </Toast>
                        </Row>
                    }</Row>
            </Container>
        </Router>
    );

}

export default Main