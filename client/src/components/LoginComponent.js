import { useState } from 'react';
import { Button } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'



function LoginForm(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    

    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            setValidated(true);
        }
        handleLogin(event);
    }

    const handleLogin = (event) => {
        event.preventDefault();
        event.stopPropagation();
        
        const credentials = { username, password };
     
        let valid = true;
       
        if (username === '' || password === '')
            valid = false;
        if (valid)
            {   
                props.login(credentials);}
        
    }

    return (
        <>
        
            <Form className="login-box" noValidate validated={validated} onSubmit={handleSubmit}>
            <h1>Enjoy creating memes</h1>
                <Form.Group className="mb-3" >
                    <Form.Label >Email address</Form.Label>
                    <Form.Control required type="email" id="email" placeholder="Enter email" value={username} onChange={ev => setUsername(ev.target.value)} />
                    <Form.Text  >
                        We'll never share your email with anyone else.
                    </Form.Text>
                    <Form.Control.Feedback type="invalid">Please, insert a valid email </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" >
                    <Form.Label>Password</Form.Label>
                    <Form.Control required type="password" id="password" placeholder="Password" value={password} onChange={ev => setPassword(ev.target.value)} />
                    <Form.Control.Feedback type="invalid">Please, insert a password </Form.Control.Feedback>
                </Form.Group>
                <div style={{
                    display: "flex", justifyContent: "center",
                    alignItems: "center"
                }}>
                    <Button variant="outline-info" type="submit" id="submit" >
                         Submit
                    </Button>
                </div>

            </Form>
        </>

    )
}

export { LoginForm }