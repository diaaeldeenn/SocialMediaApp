import PostSkeleton from "../../PostSkeleton/PostSkeleton.jsx";
import MyPostCard from "./MyPostCard.jsx";

export default function MyPost({ posts, isLoading, getPost }) {
  return (
    <>
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="col-span-2 space-y-10">
            {isLoading
              ? [0, 1, 2, 3, 4].map(() => <PostSkeleton />)
              : posts &&
                posts.map((post) => (
                  <MyPostCard getPost={getPost} key={post._id} post={post} />
                ))}
          </div>
        </div>
      </div>
    </>
  );
}
