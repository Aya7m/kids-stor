import { dbConnection } from "@/config/db";
import authSeller from "@/lib/authSeller";
import { Product } from "@/models/Product";
import { getAuth } from "@clerk/nextjs/server";
import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request) {
  try {
    const { userId } = getAuth(request);
    const formData = await request.formData();
    const isSeller = await authSeller(userId);
    if (!isSeller) {
      return NextResponse.json({ success: false, message: "not-authorized" });
    }

    const name = formData.get("name");
    const description = formData.get("description");
    const category = formData.get("category");
    const subcategory = formData.get("subcategory");
    const price = Number(formData.get("price"));
    const offerPrice = Number(formData.get("offerPrice"));
    const sizes = formData.getAll("sizes");

    const files = formData.getAll("images");

    if (!files || files.length === 0) {
      return NextResponse.json({
        success: false,
        message: "No files uploaded",
      });
    }

    const result = await Promise.all(
      files.map(async (file) => {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { resource_type: "auto" },
            (error, result) => {
              if (error) {
                reject(error);
              } else {
                resolve(result);
              }
            }
          );
          stream.end(buffer);
        });
      })
    );

    const image = result.map((result) => result.secure_url);

    await dbConnection();
    const newProduct = await Product.create({
      userId,
      name,
      description,
      category,
      subcategory,
      price,
      sizes,
      offerPrice,
      image,
      date: Date.now(),
    });
    return NextResponse.json({
      success: true,
      message: "upload successfully",
      newProduct,
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message });
  }
}
