import { Modal, Button } from "react-bootstrap"
import { useState, Dispatch, SetStateAction } from "react"

interface ViewModalProps {
    view: boolean
    setView: Dispatch<SetStateAction<boolean>>
    cover: string | undefined
}

function ViewModal({ view, setView, cover }: ViewModalProps) {
    // const [show, setShow] = useState(false);

    return (
        <>
            <Modal id='viewModal'
                show={view}
                centered
                onHide={() => setView(false)}
                dialogClassName="modal-90w"
                aria-labelledby="example-custom-modal-styling-title">
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body className='d-flex justify-content-center'>
                    <img src={cover} alt='' 
                        className="img"/>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default ViewModal