import { dbConnection } from "@/config/db";
import { Addresses } from "@/models/Address";

import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { userId } = getAuth(request);
    const address = await request.json();

    await dbConnection();

    const newAddress = await Addresses.create({
      ...address,
      pincode: Number(address.pincode), // مهم
      userId,
    });

    return NextResponse.json({
      success: true,
      message: "Address added successfully",
      newAddress,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.message,
    });
  }
}
