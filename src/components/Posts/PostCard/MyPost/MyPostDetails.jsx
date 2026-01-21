import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Divider,
} from "@heroui/react";
import MyPostHeader from "./PostHeader/MyPostHeader.jsx";
import MyPostBody from "./PostBody/MyPostBody.jsx";
import MyPostAllcomment from "./PostFooter/MyPostAllComments.jsx";

export default function MyPostDetails({
  onOpenChange,
  isOpen,
  post,
  postComments,
  setPostComments,
}) {
  return (
    <Modal isOpen={isOpen} scrollBehavior="inside" onOpenChange={onOpenChange}>
      <ModalContent className="max-w-3xl">
        <>
          <ModalHeader>Post Details</ModalHeader>
          <Divider />
          <ModalBody>
            <MyPostHeader post={post} />
            <MyPostBody post={post} postComments={postComments} />
            <MyPostAllcomment
              setPostComments={setPostComments}
              post={post}
              postComments={postComments}
            />
          </ModalBody>
        </>
      </ModalContent>
    </Modal>
  );
}
