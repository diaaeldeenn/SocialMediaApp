import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Divider,
} from "@heroui/react";
import PostHeader from "../PostCard/PostHeader/PostHeader.jsx";
import PostBody from "../PostCard/PostBody/PostBody.jsx";
import PostAllcomment from "../PostCard/PostFooter/PostAllComment.jsx";

export default function CommentIconDetails({ onOpenChange, isOpen,post,postComments,setPostComments }) {

  return (
    <Modal
      isOpen={isOpen}
      scrollBehavior="inside"
      onOpenChange={onOpenChange}
    >
      <ModalContent className="max-w-3xl">
        <>
          <ModalHeader>Post Details</ModalHeader>
          <Divider />
          <ModalBody>
            <PostHeader post={post} />
            <PostBody post={post} postComments={postComments} />
            <PostAllcomment post={post} postComments={postComments} setPostComments={setPostComments} />
          </ModalBody>
        </>
      </ModalContent>
    </Modal>
  );
}
