import Verify from "@/components/auth/verify";

export const metadata = {
  title: "Xác minh email",
};
const VerifyPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  // console.log(">>> check id: ", id);
  return (
    <>
      <Verify id={id} />
    </>
  );
};

export default VerifyPage;
