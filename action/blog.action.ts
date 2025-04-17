'use server'

import Blog from "@/database/blog.model";
import dbConnect from "@/lib/mongodb";
import { revalidatePath } from "next/cache";
// import { auth } from "@clerk/nextjs";

export const createBlog = async (data: any, userId: string) => {
    try {
        await dbConnect()
        await Blog.create({...data, userId});
        revalidatePath("/products");
        return {
            success: true,
            message: "Blog created successfully"
        };
    } catch (error) {
        console.log("Something went wrong", error);
    }
}

export const getAllBlog = async () => {
    try {
        await dbConnect()
        const dbblogs = await Blog.find();
        return JSON.parse(JSON.stringify(dbblogs));
    } catch (error) {
        console.log("Something went wrong", error);
    }
}

export const getLastBlog = async () => {
    try {
        await dbConnect()
        const dbblogs = await Blog.find().limit(4);
        return JSON.parse(JSON.stringify(dbblogs));
    } catch (error) {
        console.log("Something went wrong", error);
    }
}