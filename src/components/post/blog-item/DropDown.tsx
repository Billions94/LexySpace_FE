import React, { SetStateAction } from "react";
import PostAuthor from "../author/PostAuthor";
import Edit from "../crud/EditPost";
import DeleteModal from "../crud/DeleteModal";
import { Dropdown } from "react-bootstrap";
import { Post } from "../../../dto";

interface Props {
  data: {
    me: string;
    post: Post;
    reload: boolean;
    setReload: React.Dispatch<SetStateAction<boolean>>;
    smShow: boolean;
    setSmShow: React.Dispatch<SetStateAction<boolean>>;
  };
}

export const DropDown: React.FC<Props> = ({ data }: Props) => {
  const { post, reload, setReload, me, smShow, setSmShow } = data;

  const updatePostProps = {
    postId: post.id,
    reload,
    setReload,
    media: String(post.media)
  };

  return (
    <div
      className="authorinfo d-flex "
      style={{ justifyContent: "space-between" }}
    >
      <PostAuthor {...post.author} />
      <Dropdown className="dropdowntext ml-auto">
        <Dropdown.Toggle className="btn btn-dark dropdownbtn">
          <div className="text-muted dots">
            <b>
              <strong>•••</strong>
            </b>
          </div>
        </Dropdown.Toggle>
        <Dropdown.Menu className="dropdownmenu">
          {post.author!.id !== me ? null : (
            <>
              <Edit data={updatePostProps} />
              <div className="d-flex customLinks">
                <div className="mr-3">
                  <img
                    alt=""
                    className="lrdimg"
                    width="17px"
                    src="https://img.icons8.com/fluency/50/000000/delete-sign.png"
                  />
                </div>
                <div onClick={() => setSmShow(true)}>delete</div>
              </div>
              <DeleteModal
                postId={post.id}
                smShow={smShow}
                setSmShow={setSmShow}
              />
            </>
          )}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};
