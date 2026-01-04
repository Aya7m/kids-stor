

import { dbConnection } from "@/config/db";
import { Order } from "@/models/Order";
import { Product } from "@/models/Product";
import { User } from "@/models/User";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { userId } = getAuth(request);
    const { address, items } = await request.json();

    if (!userId || !address || !items?.length) {
      return NextResponse.json({ success: false, message: "invalid data" });
    }

    await dbConnection();

    // حساب السعر
    let amount = 0;
    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) continue;
      amount += product.offerPrice * item.quantity;
    }

    amount += Math.floor(amount * 0.02); // tax

    // ✅ إنشاء الأوردر فعليًا
    const order = await Order.create({
      userId,     // string من Clerk
      address,
      items,      // فيها size
      amount,
    });

    // تفريغ الكارت
    const user = await User.findById(userId);
    if (user) {
      user.cartItems = {};
      await user.save();
    }

    return NextResponse.json({
      success: true,
      message: "order placed",
      orderId: order._id,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      success: false,
      message: error.message,
    });
  }
}
