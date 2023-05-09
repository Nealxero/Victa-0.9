import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import CurrentMealCard from './Currentmeal-card.jsx';

export function CurrentMealModal() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
        <>
      <Button variant="primary" onClick={handleShow}>
        Current Meal Modal
      </Button>
    
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>
            <CurrentMealCard/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Delete
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Next
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Back
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CurrentMealModal;