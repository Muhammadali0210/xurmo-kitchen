'use server'

import Gallery from "@/database/galery.model";
import dbConnect from "@/lib/mongodb";
import type { IGalery } from "@/types";
import { revalidatePath } from "next/cache";

export const createGallery = async (data: IGalery, pathName?: string) => {
    try {
        await dbConnect()
        await Gallery.create({...data});
        revalidatePath(pathName as string)
        return {
            success: true,
            message: "Gallery created successfully"
        };
    } catch (error) {
        return {
            success: false,
            message: "Something went wrong",
        }
    }
}

export const getAllGallery = async () => {
    try {
        await dbConnect()
        const dbgallery = await Gallery.find();
        return JSON.parse(JSON.stringify(dbgallery));
    } catch (error) {
        return {
            success: false,
            message: "Something went wrong",
            error
        }
    }
}

export const updateGallery = async (data: IGalery, id: string, pathName?: string) => {
    try {
        await dbConnect()
        const result = await Gallery.updateOne({ _id: id }, { $set: { ...data } });
        if (result.matchedCount === 0) {
            return {
                success: false,
                message: "Gallery not found"
            };
        }
        revalidatePath(pathName as string)
        return {
            success: true,
            message: "Gallery updated successfully"
        };
    } catch (error) {
        return {
            success: false,
            message: "Xato yuz berdi",
            error
        }
    }
}

export const deleteGallery = async (id: string, pathName?: string) => {
    try {
        await dbConnect()
        await Gallery.findOneAndDelete({ _id: id });
        revalidatePath(pathName as string);
        return {
            success: true,
            message: "Gallery updated successfully"
        };
    } catch (error) {
        console.log("Something went wrong", error);
    }
}

