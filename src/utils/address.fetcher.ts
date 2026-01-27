import {
  ValidationErrorResponse,
  ClientServerErrorResponse,
} from "@/types/models/address.model";
import { NextResponse } from "next/server";

interface FetchAddressOptions {
  url: string;
}

export async function fetchAddressData({ url }: FetchAddressOptions) {
  try {
    const response = await fetch(url, {
      cache: "force-cache",
    });

    // handle lỗi
    if (!response.ok) {
      const errorData = await response.json();

      // 422
      if (response.status === 422) {
        const validationError = errorData as ValidationErrorResponse;
        return NextResponse.json(
          {
            type: validationError.type || "validation-error",
            title: validationError.title || "Validation Error",
            status: 422,
            detail:
              validationError.errors?.[0]?.msg || "Invalid request parameters",
            errors: validationError.errors,
          },
          { status: 422 },
        );
      }

      // 4XX
      if (response.status >= 400 && response.status < 500) {
        const clientError = errorData as ClientServerErrorResponse;
        return NextResponse.json(
          {
            type: clientError.type || "client-error",
            title: clientError.title || "Client Error",
            status: response.status,
            detail: clientError.detail || "Bad request",
          },
          { status: response.status },
        );
      }

      // 5XX
      if (response.status >= 500) {
        const serverError = errorData as ClientServerErrorResponse;
        return NextResponse.json(
          {
            type: serverError.type || "server-error",
            title: serverError.title || "Server Error",
            status: response.status,
            detail: serverError.detail || "Internal server error",
          },
          { status: response.status },
        );
      }
    }

    // 200 success
    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error("Error fetching address data:", error);

    return NextResponse.json(
      {
        type: "internal-error",
        title: "Internal Server Error",
        status: 500,
        detail:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred",
      },
      { status: 500 },
    );
  }
}
