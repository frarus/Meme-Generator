import { Navbar, Button } from 'react-bootstrap';
import { BiHome } from "react-icons/bi";
import { Route, Switch } from 'react-router-dom';


function UserLogs(props) {
    return (<>

        {
            props.isLogged ?
                <> <Navbar.Brand className="text-info "> Have fun, {props.userName}
                </Navbar.Brand >
                    <Button variant="outline-info" onClick={props.logout}>Logout</Button>
                </>
                : <Button variant="outline-info" onClick={() => {props.setGoToLogin(true);props.setGoHomePage(false)}}>Login</Button>}
    </>

    )
}

function TopBar(props) {

    return (
        <Switch>

            <Route path="/" exact render={() =>
                <Navbar className="justify-content-between" bg="dark" variant="dark">

                    <Navbar.Brand >Create your meme</Navbar.Brand>
                    <Navbar.Collapse className="justify-content-end">
                        <UserLogs {...props} />
                    </Navbar.Collapse>

                </Navbar>
            }>
            </Route>

            <Route path="/login" exact render={() =>
                <Navbar className="justify-content-between" bg="dark" variant="dark">
                    <Button variant="outline-info" onClick={()=>{
                        props.setGoToLogin(false);
                        props.setGoHomePage(true);}}>
                        <BiHome />
                    </Button>
                    <Navbar.Brand >Create your meme</Navbar.Brand>
                </Navbar>
            }>

            </Route>
        </Switch>
      

    );

}

export { TopBar }