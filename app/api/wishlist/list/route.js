import { dbConnection } from "@/config/db";
import { User } from "@/models/User";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    await dbConnection();

    const { userId } = getAuth(request);
    if (!userId) {
      return NextResponse.json({ success: false, message: "unauthorized" });
    }

    const user = await User.findById(userId).populate("wishlist");

    if (!user) {
      return NextResponse.json({ success: false, message: "user not found" });
    }

    return NextResponse.json({
      success: true,
      wishlist: user.wishlist,
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message });
  }
}
