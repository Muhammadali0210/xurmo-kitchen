'use server'
import Category from "@/database/category.model";
import dbConnect from "@/lib/mongodb";
import type { ICategory } from "@/types";
import { revalidatePath } from "next/cache";

export const createCategory = async (data: ICategory) => {
    try {
        await dbConnect()
        await Category.create({...data});
        revalidatePath("/admin/categories")
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

export const getAllCategories = async () => {
    try {
        await dbConnect()
        const dbCategory = await Category.find({});
        return JSON.parse(JSON.stringify(dbCategory));
    } catch (error) {
        return {
            success: false,
            message: "Something went wrong",
            error
        }
    }
}

// export const getCategoryByType = async (type: string) => {
//     try {
//         await dbConnect()
//         const dbCategory = await Category.findOne({type: type});
//         return JSON.parse(JSON.stringify(dbCategory));
//     } catch (error) {
//         return {
//             success: false,
//             message: "Something went wrong",
//             error
//         }
//     }
// }

// export const getCategoryById = async (id: string) => {
//     try {
//         await dbConnect()
//         const dbCategory = await Category.findById(id);
//         return JSON.parse(JSON.stringify(dbCategory));
//     } catch (error) {
//         return {
//             success: false,
//             message: "Something went wrong",
//             error
//         }
//     }
// }

export const updateCategory = async (data: ICategory, id: string) => {
    try {
        await dbConnect()
        const result = await Category.updateOne({ _id: id }, { $set: { ...data } });
        if (result.matchedCount === 0) {
            return {
                success: false,
                message: "Category not found"
            };
        }
        return {
            success: true,
            message: "Category updated successfully"
        };
    } catch (error) {
        return {
            success: false,
            message: "Xato yuz berdi",
            error
        }
    }
}

export const deleteCategory = async (id: string) => {
    try {
        await dbConnect()
        await Category.findOneAndDelete({ _id: id });
        return {
            success: true,
            message: "Category updated successfully"
        };
    } catch (error) {
        console.log("Something went wrong", error);
    }
}

