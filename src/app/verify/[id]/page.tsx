import Verify from "@/components/auth/verify";

const VerifyPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  console.log(">>> check id: ", id);
  return (
    <>
      <Verify id={id} />
    </>
  );
};

export default VerifyPage;
