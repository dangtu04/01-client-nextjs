"use server";
import { IUpdateProfileDTO, IUpdateUserDTO } from "@/types/models/user.model";
import { sendAuthRequest } from "@/utils/api";
import { revalidateTag } from "next/cache";

export const handleCreateUserAction = async (data: any) => {
  const res = await sendAuthRequest<IBackendRes<any>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users`,
    method: "POST",
    body: data,
  });

  revalidateTag("list-users");
  return res;
};

export const handleUpdateUserAction = async (id: any, data: IUpdateUserDTO) => {
  const res = await sendAuthRequest<IBackendRes<any>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users/${id}`,
    method: "PATCH",
    body: data,
  });
  revalidateTag("list-users");
  return res;
};

export const handleDeleteUserAction = async (id: any) => {
  const res = await sendAuthRequest<IBackendRes<any>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users/${id}`,
    method: "DELETE",
  });

  revalidateTag("list-users");
  return res;
};

export const handleUpdateProfileAction = async ( data: IUpdateProfileDTO) => {
  const res = await sendAuthRequest<IBackendRes<any>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users/profile/me`,
    method: "PATCH",
    body: data,
  });
  revalidateTag("profile-user");
  return res;
};