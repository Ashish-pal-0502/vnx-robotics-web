import BlogContent from "./../../../components/Blog/BlogContent";
import apiClient from "./../../../api/client";

export async function generateMetadata({ params }) {
  const awaitedParams = await params;
  const blogid = awaitedParams.blogDetail;

  const { data } = await apiClient.get(`/blog/blogbyid/${blogid}`);

  return {
    title: data?.mtitle,

    description: data?.mdesc,

    openGraph: {
      images: [String(data?.image)],
    },
  };
}

const page = async ({ params }) => {
  const awaitedParams = await params;
  const blogid = awaitedParams.blogDetail;

  return (
    <>
      <BlogContent blogid={blogid} />
    </>
  );
};

export default page;
