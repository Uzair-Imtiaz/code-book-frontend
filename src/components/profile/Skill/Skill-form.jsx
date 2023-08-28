import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

import { useMessage } from '../../context/MessageContext';

import handleSkillSubmit from './Services';

/**
 * A modal component for adding a new skill.
 * @param {Object} props - The component props.
 * @param {Function} props.onClose - A function to close the modal.
 * @returns {JSX.Element} The rendered component.
 */
function SkillForm({ onClose }) {
  const { setMessage } = useMessage();
  const [show, setShow] = useState(false);
  const [ formState, setFormState ] = useState({
    name: '',
    description: '',
  });

  const handleClose = () => {
    setShow(false);
    onClose();
  };

  useEffect(() => {
    setShow(true);
  }, []);

  /**
   * Handles the form submission.
   * @param {Event} event - The form submission event.
   */
  const handleSubmit = async (event) => {
    event.preventDefault();
    const { success, message } = await handleSkillSubmit(formState);
    setMessage({ ...message });
    if (success) {
      handleClose();
    }
  };

  /**
   * Handles changes in the input fields.
   * @param {Event} event - The input change event.
   */
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add a Skill</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" >
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                onChange={handleChange}
                value={formState.name}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
            >
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                rows={3}
                onChange={handleChange}
                value={formState.description}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default SkillForm;
