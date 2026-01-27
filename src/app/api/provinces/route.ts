import { IProvince } from "@/types/models/address.model";
import { fetchAddressData } from "@/utils/address.fetcher";
import { NextResponse } from "next/server";

export async function GET() {
  const result = await fetchAddressData({
    url: `${process.env.NEXT_PUBLIC_ADDRESS_API_URL}/p`,
  });

  // lỗi
  if (result instanceof NextResponse) {
    return result;
  }

  // success case
  const fullData: IProvince[] = result.data;

  const optimizedData = fullData.map((item) => ({
    code: item.code,
    name: item.name,
  }));

  return NextResponse.json(optimizedData, {
    status: 200,
    headers: {
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
