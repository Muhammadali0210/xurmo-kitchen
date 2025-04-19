'use server'

import Food from "@/database/food.model";
import dbConnect from "@/lib/mongodb";
import type { IFood } from "@/types";
import { revalidatePath } from "next/cache";

export const createFood = async (data: IFood, pathName?: string) => {
    try {
        await dbConnect()
        await Food.create({...data});
        revalidatePath(pathName as string)
        return {
            success: true,
            message: "Food created successfully"
        };
    } catch (error) {
        return {
            success: false,
            message: "Something went wrong",
            error
        }
    }
}

export const getDishesByCategoryId = async (categoryId: string) => {
    try {
        await dbConnect()
        const dbfood = await Food.find({categoryId: categoryId});
        return JSON.parse(JSON.stringify(dbfood));
    } catch (error) {
        return {
            success: false,
            message: "Something went wrong",
            error
        }
    }
}

export const getFoodById = async (id: string) => {
    try {
        await dbConnect()
        const dbfood = await Food.find({_id: id});
        return JSON.parse(JSON.stringify(dbfood));
    } catch (error) {
        return {
            success: false,
            message: "Something went wrong",
            error
        }
    }
}

export const updateFood = async (data: IFood, id: string, pathName?: string) => {
    try {
        await dbConnect()
        const result = await Food.updateOne({ _id: id }, { $set: { ...data } });
        if (result.matchedCount === 0) {
            return {
                success: false,
                message: "Food not found"
            };
        }
        revalidatePath(pathName as string)
        return {
            success: true,
            message: "Food updated successfully"
        };
    } catch (error) {
        return {
            success: false,
            message: "Xato yuz berdi",
            error
        }
    }
}

export const deleteFood = async (id: string, pathName?: string) => {
    try {
        await dbConnect()
        await Food.findOneAndDelete({ _id: id });
        revalidatePath(pathName as string);
        return {
            success: true,
            message: "Food updated successfully"
        };
    } catch (error) {
        console.log("Something went wrong", error);
    }
}
