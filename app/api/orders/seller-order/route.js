// import { dbConnection } from "@/config/db";
// import authSeller from "@/lib/authSeller";
// import { Addresses } from "@/models/Address";
// import { Order } from "@/models/Order";
// import { getAuth } from "@clerk/nextjs/server";
// import { NextResponse } from "next/server";

// export async function GET(request) {
//   try {
//     const { userId } = getAuth(request);
//     const isSeller = await authSeller(userId);

//     if (!isSeller) {
//       return NextResponse.json({ success: false, message: "not-authorize" });
//     }
//     await dbConnection();
//     Addresses.length;
//     const orders = await Order.find({}).populate("address items.product");
//     return NextResponse.json({ success: true, orders });
//   } catch (error) {
//     return NextResponse.json({ success: false, message: error.message });
//   }
// }


import { dbConnection } from "@/config/db";
import authSeller from "@/lib/authSeller";
import { Order } from "@/models/Order";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const { userId } = getAuth(request);

    const isSeller = await authSeller(userId);
    if (!isSeller) {
      return NextResponse.json({ success: false, message: "not-authorize" });
    }

    await dbConnection();

 const orders = await Order.find({})
  .populate("items.product")
  .populate("address");


    return NextResponse.json({ success: true, orders });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      success: false,
      message: error.message,
    });
  }
}
