import { Request, Response } from "express";
import { db } from "../database/models";

export async function getAllCategory(req: Request, res: Response) {
  const categoriesData = await db.CategoryDetails.findAll({ raw: true });
  if (!categoriesData.length)
    return res.status(404).json({ message: "no categories available!" });

  const organizeCategories = (categories, parentId = null) => {
    const result = [];
    categories.forEach((category) => {
      if (category.parentCategoryId === parentId) {
        const subcategories = organizeCategories(categories, category.id);
        console.log(subcategories);
        if (subcategories.length > 0) {
          category.subcategories = subcategories;
        }
        result.push(category);
      }
    });
    return result;
  };
  const nestedCategories = organizeCategories(categoriesData);
  return res.status(200).json(nestedCategories);
}

export async function getCategoryById(req: Request, res: Response) {
  const { id } = req.params;
  const category = await db.CategoryDetails.findByPk(id);

  if (!category)
    return res.status(404).json({ message: "category doesn't not exists !" });

  return res.status(200).json(category);
}
