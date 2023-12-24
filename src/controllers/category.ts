import { Request, Response } from "express";
import { db } from "../database/models";

export async function getAllCategory(req: Request, res: Response) {
  const categoriesData = await db.CategoryDetails.findAll();
  if (!categoriesData.length)
    return res.status(404).json({ message: "no categories available!" });

  return res.status(200).json(categoriesData);
}

export function getCategoryById() {
  return { status: "success" };
}
