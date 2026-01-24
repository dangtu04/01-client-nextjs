import Profile from "@/components/customer/profile/profile";
import { IProfileUser } from "@/types/models/user.model";
import { sendAuthRequest } from "@/utils/api";

const ProfilePage = async () => {
  const res = await sendAuthRequest<IBackendRes<IProfileUser>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users/profile/me`,
    method: "GET",
    nextOption: {
      next: { tags: ["profile-user"] },
    },
  });
  return (
    <>
      <Profile userData={res.data} />
    </>
  );
};
export default ProfilePage;
