import { Modal, Button } from "react-bootstrap"
import { useState, Dispatch, SetStateAction } from "react"
import { Posts } from "../../../redux/interfaces";

interface ViewModalProps {
    view: boolean
    setView: Dispatch<SetStateAction<boolean>>
    cover: string | undefined
    post: Posts
}

function ViewModal({ view, setView, cover, post }: ViewModalProps) {
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
                        { post.sharedPost && 
                            <img src={post.sharedPost.media} alt='' 
                            className="img"/>
                        }
                </Modal.Body>
            </Modal>
        </>
    );
}

export default ViewModal