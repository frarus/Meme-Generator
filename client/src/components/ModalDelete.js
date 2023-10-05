import { Button, Modal } from "react-bootstrap";

import API from "../API";

function DeleteModal(props) {

  
    const handleDelete = (event, id) => {
        event.preventDefault();
        
        API.deleteMemebyId(id)
        .then(()=>props.setDirty(true))
       .catch (err => {props.setError(err.msg)})
       .finally (()=>props.setDeleteModal(false))
    }

    

    return (
      <Modal show={props.deleteModal} size="lg" aria-labelledby="contained-modal-title-vcenter" centered animation={false} onHide={()=>props.setDeleteModal(false)} >
        <Modal.Header closeButton >
          <Modal.Title id="contained-modal-title-vcenter">
            Delete meme?
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            This operation cannot be reverted. Are you sure to delete this meme? 
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary"  onClick={props.onHide}>Dismiss</Button>
          <Button variant="danger"onClick={(event) => handleDelete(event, props.id)}>Confirm</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  export { DeleteModal }