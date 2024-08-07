import React from 'react';
import { Modal } from 'react-bootstrap';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Post } from '../../../redux/interfaces';

interface Props {
  view: boolean;
  setView: React.Dispatch<React.SetStateAction<boolean>>;
  cover: string | undefined;
  post: Post;
}

const ViewModal: React.FC<Props> = ({ view, setView, cover, post }) => {
  return (
    <>
      <Modal
        id="viewModal"
        show={view}
        centered
        onHide={() => setView(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body className="d-flex justify-content-center">
          <LazyLoadImage src={cover} alt="" className="img" />
          {post.sharedPost && (
            <LazyLoadImage src={post.sharedPost.media} alt="" className="img" />
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ViewModal;
