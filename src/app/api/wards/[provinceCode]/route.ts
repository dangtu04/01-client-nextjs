import { IProvince } from "@/types/models/address.model";
import { fetchAddressData } from "@/utils/address.fetcher";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { provinceCode: string } },
) {
  const { provinceCode } = params;

  // console.log(">>> check provinceCode: ", provinceCode);

  // Validate provinceCode
  if (!provinceCode || isNaN(Number(provinceCode))) {
    return NextResponse.json(
      {
        type: "validation-error",
        title: "Invalid Province Code",
        status: 400,
        detail: "Province code must be a valid number",
      },
      { status: 400 },
    );
  }

  const result = await fetchAddressData({
    url: `${process.env.NEXT_PUBLIC_ADDRESS_API_URL}/p/${provinceCode}?depth=2`,
  });

  // console.log(">>> check wards result: ", result);

  // có lỗi
  if (result instanceof NextResponse) {
    return result;
  }

  // success case
  const provinceData: IProvince = result.data;

  const optimizedWards = (provinceData.wards || []).map((ward) => ({
    code: ward.code,
    name: ward.name,
  }));

  return NextResponse.json(optimizedWards, {
    status: 200,
    headers: {
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
