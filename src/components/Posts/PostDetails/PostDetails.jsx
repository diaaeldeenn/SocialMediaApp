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

export default function PostDetails({ onOpenChange, isOpen,post,postComments,setPostComments }) {

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
            <PostAllcomment setPostComments={setPostComments} post={post} postComments={postComments} />
          </ModalBody>
        </>
      </ModalContent>
    </Modal>
  );
}
