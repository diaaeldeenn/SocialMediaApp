import { Card, CardHeader, CardFooter, Divider, Image } from "@heroui/react";
import { Input } from "@heroui/react";
import { FaVideo } from "react-icons/fa6";
import { MdInsertPhoto } from "react-icons/md";
import { GoVideo } from "react-icons/go";
import { MdEmojiEmotions } from "react-icons/md";
import { useDisclosure } from "@heroui/react";
import { useContext } from "react";
import { userContext } from "../../../../context/UserContext/UserContext.jsx";
import PostModal from "../PostModal.jsx";

export default function CreatePostProfile({ getPost }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { userData } = useContext(userContext);


  return (
    <>
      <Card className="p-3">
        <CardHeader className="flex pb-6 gap-2">
          <Image
            alt="userImg"
            height={40}
            radius="full"
            src={userData.photo}
            width={40}
          />
          <Input
            onClick={onOpen}
            readOnly
            placeholder={`What's In Your Mind, ${userData.name} ?`}
            type="text"
          />
        </CardHeader>
        <Divider />
        <CardFooter className="flex justify-around">
          <div className="live flex items-center gap-2 cursor-pointer">
            <FaVideo className="text-2xl text-amber-600" />
            <p className="font-semibold">Go Live</p>
          </div>
          <div className="photo flex items-center gap-2 cursor-pointer">
            <MdInsertPhoto className="text-2xl text-green-500" />
            <p className="font-semibold">Photo</p>
          </div>
          <div className="video flex items-center gap-2 cursor-pointer">
            <GoVideo className="text-2xl text-fuchsia-600" />
            <p className="font-semibold">Video</p>
          </div>
          <div className="feeling flex items-center gap-2 cursor-pointer">
            <MdEmojiEmotions className="text-2xl text-blue-600" />
            <p className="font-semibold">Feeling</p>
          </div>
        </CardFooter>
      </Card>
      <PostModal
        getAllPosts={getPost}
        onOpenChange={onOpenChange}
        isOpen={isOpen}
      />
    </>
  );
}
