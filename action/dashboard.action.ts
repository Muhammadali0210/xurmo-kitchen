"use server"
import Food from "@/database/food.model";
import Category from "@/database/category.model";
import dbConnect from "@/lib/mongodb";


export const getStatistics = async () => {
  try {
    await dbConnect();
    const [totalFoods, totalCategories] = await Promise.all([
      Food.countDocuments(),
      Category.countDocuments(),
    ]);

    return { totalFoods, totalCategories };
  } catch (error) {
    return {
      success: false,
      message: "Something went wrong",
    };
  }
};
