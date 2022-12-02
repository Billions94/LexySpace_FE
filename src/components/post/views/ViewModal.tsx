import { Modal } from "react-bootstrap";
import { Dispatch, SetStateAction, FC } from "react";
import { Post } from "../../../dto";

interface Props {
  view: boolean;
  setView: Dispatch<SetStateAction<boolean>>;
  cover: string | undefined;
  post: Post;
}

const ViewModal: FC<Props> = ({ view, setView, cover, post }: Props) => {
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
          <img src={cover} alt="" className="img" />
          {/* {post.sharedPost && post.sharedPost?.media && (
            <img src={String(post.sharedPost.media)} alt="" className="img" />
          )} */}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ViewModal;
