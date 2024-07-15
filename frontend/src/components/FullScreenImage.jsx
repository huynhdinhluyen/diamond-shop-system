/* eslint-disable react/prop-types */
import Modal from 'react-modal';

Modal.setAppElement('#root');
const FullScreenImageModal = ({ isOpen, onClose, imageUrl }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="Full Screen Image"
            className="flex items-center justify-center h-full relative"
            overlayClassName="fixed inset-0 bg-black bg-opacity-75 z-50"
        >
            <div className="">
                <button onClick={onClose} className="absolute top-0 right-0 m-4 text-accent text-4xl">&times;</button>
                <img src={imageUrl} alt="GIA Certificate" className="max-w-full max-h-screen" />
            </div>
        </Modal>
    );
};

export default FullScreenImageModal;
