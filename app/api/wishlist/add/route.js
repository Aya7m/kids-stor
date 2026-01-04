import { dbConnection } from "@/config/db";
import { User } from "@/models/User";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function POST(request) {
  try {
    await dbConnection();

    const { userId } = getAuth(request);
    if (!userId)
      return NextResponse.json({ success: false, message: "unauthorized" });

    const { productId } = await request.json();

    const user = await User.findById(userId);
    if (!user)
      return NextResponse.json({ success: false, message: "user not found" });

    const productObjectId = new mongoose.Types.ObjectId(productId);

    const isExist = user.wishlist.some(
      (id) => id.toString() === productObjectId.toString()
    );

    if (isExist) {
      user.wishlist.pull(productObjectId);
    } else {
      user.wishlist.push(productObjectId);
    }

    await user.save();

    return NextResponse.json({
      success: true,
      message: isExist ? "Removed from wishlist" : "Added to wishlist",
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message });
  }
}
