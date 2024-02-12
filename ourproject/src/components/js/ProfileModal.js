

import { Box, Modal, Slider, Button } from "@mui/material";
import { useRef, useState } from "react";
import AvatarEditor from "react-avatar-editor";
import { FcAddImage } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";
import "../css/profile.modules.css";


// Styles
const boxStyle = {
  width: "300px",
  height: "300px",
  display: "flex",
  flexFlow: "column",
  justifyContent: "center",
  alignItems: "center"
};
const modalStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
};

// Modal
const CropperModal = ({ src, modalOpen, setModalOpen, setPreview, onSave }) => {
  const [slideValue, setSlideValue] = useState(10);
  const cropRef = useRef(null);

  //handle save
  const handleSave = async () => {
    if (cropRef) {
      const dataUrl = cropRef.current.getImage().toDataURL();
      const dataUrlsave = cropRef.current.getImageScaledToCanvas().toDataURL();
      const result = await fetch(dataUrl);
      const blob = await result.blob();
      setPreview(URL.createObjectURL(blob));
      console.log(blob,'info');
      onSave(dataUrlsave);
      setModalOpen(false);
    }
  };

  return (
    <Modal sx={modalStyle} open={modalOpen}>
      <Box sx={boxStyle}>
        <AvatarEditor
          ref={cropRef}
          image={src}
          style={{ width: "100%", height: "100%" }}
          border={50}
          borderRadius={150}
          color={[0, 0, 0, 0.72]}
          scale={slideValue / 10}
          rotate={0}
        />

        {/* MUI Slider */}
        <Slider
          min={10}
          max={50}
          sx={{
            margin: "0 auto",
            width: "80%",
            color: "cyan"
          }}
          size="medium"
          defaultValue={slideValue}
          value={slideValue}
          onChange={(e) => setSlideValue(e.target.value)}
        />
        <Box
          sx={{
            display: "flex",
            padding: "10px",
            border: "3px solid white",
            background: "black"
          }}
        >
          <Button
            size="small"
            sx={{ marginRight: "10px", color: "white", borderColor: "white" }}
            variant="outlined"
            onClick={(e) => setModalOpen(false)}
          >
            cancel
          </Button>
          <Button
            sx={{ background: "#5596e6" }}
            size="small"
            variant="contained"
            onClick={handleSave}
          >
            Save
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

// Container
const Cropper = ({ showModal, onClose, onSave, avatarSrc }) => {
  // image src
  const [src, setSrc] = useState(null);

   // function to handle both cropping and image selection
   const handleEditIconClick = () => {
    setModalOpen(true);
  };

  // preview
  const [preview, setPreview] = useState(null);

  // modal state
  const [modalOpen, setModalOpen] = useState(false);

  // ref to control input element
  const inputRef = useRef(null);

  // handle Click
  const handleInputClick = (e) => {
    e.preventDefault();
    inputRef.current.click();
   // handleEditIconClick();
  };
  // handle Change
  const handleImgChange = (e) => {
    if(e.target.files[0])
      setSrc(URL.createObjectURL(e.target.files[0]));
    setModalOpen(true);
    handleEditIconClick();
  };

  return (
    <>
      <main className="profilecontainer">
        <CropperModal
          modalOpen={modalOpen}
          src={src}
          setPreview={setPreview}
          setModalOpen={setModalOpen}
          onSave={onSave}
        />
        <input
          className="profile-input"
          type="file"
          accept="image/*"
          ref={inputRef}
          onChange={handleImgChange}
        />
        <div className="img-container" >
          <img
            src={
              preview || avatarSrc
            }
            alt=""
            width="150"
            height="150"
           style={{borderRadius:"50%"}}
          />
            <i
            className="edit-icon fa-regular position-absolute fa-pen-to-square " 
            onClick={handleInputClick}
          style={{color:"black",  cursor: 'pointer' , bottom: 0, right: 0 }}
          ></i>
        </div>
      </main>

     
    </>
  );
};

export default Cropper;


