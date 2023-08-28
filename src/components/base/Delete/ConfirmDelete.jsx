import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';

import { useMessage } from '../../context/MessageContext';

import handleDelete from './Services';

/**
 * Confirmation modal for deleting a project.
 *
 * @param {Object} props - Component props.
 * @param {Function} props.onClose - Callback to close the modal.
 * @param {string} props.token - Authorization token.
 * @param {string} props.slug - Slug of the project to delete.
 * @returns {JSX.Element} The ConfirmDelete component.
 */
function ConfirmDelete({ onClose, token, slug }) {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const { setMessage } = useMessage();

  /**
   * Handle the modal close event.
   */
  const handleClose = () => {
    setShow(false);
    onClose();
  };
  useEffect(() => {setShow(true);},[]);

  /**
   * Handle the delete button click event.
   */
  const handleClick = async () => {
    const { success, message } = await handleDelete(slug, token);
    setMessage({ ...message });
    onClose();
    if (success) {
      navigate('/projects');
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this project?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={handleClick}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ConfirmDelete;
