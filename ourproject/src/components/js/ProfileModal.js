import React, { useState ,useEffect, useRef} from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import Avatar from "react-avatar-edit";

function ProfileModal({ showModal, onClose, onSave, avatarSrc }) {
  const [newAvatarSrc, setNewAvatarSrc] = useState(avatarSrc);
  const [preavatar, setPreavatar] = useState(avatarSrc);
  const avatarRef = useRef(null);
  useEffect(() => {
    // Update preavatar state when avatarSrc prop changes (initially and when changed from outside)
    setPreavatar(avatarSrc);
  }, [avatarSrc]);

  const handleAvatarChange = (newSrc) => {
    setNewAvatarSrc(newSrc);
  };

  const handleSave = () => {
    console.log(newAvatarSrc)
    // Call the onSave callback with the updated avatar source
    onSave(newAvatarSrc);
    

    // Close the modal
    onClose();
  };
  const handleModalClose = () => {
    // Reset the Avatar component by calling its cancel method
    if (avatarRef.current) {
      avatarRef.current.cancelCrop();
    }

    // Reset newAvatarSrc to preavatar when the modal is closed
    setNewAvatarSrc(preavatar);

    // Close the modal
    onClose();
  };

  const onBeforeFileLoad = (elem) => {
    // if (elem.target.files[0].size > 71680) {
    //   alert("File is too big!");
    //   elem.target.value = "";
    // }
  };


  return (
    <Modal show={showModal}  onHide={handleModalClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Profile</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formAvatar">
            <Form.Label>Avatar</Form.Label>
            <Avatar
              width={300}
              height={300}
              round={true}
              src={newAvatarSrc}
              onBeforeFileLoad={onBeforeFileLoad}
              onCrop={(newSrc) => handleAvatarChange(newSrc)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleModalClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ProfileModal;
