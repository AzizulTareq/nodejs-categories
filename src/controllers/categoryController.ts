// categoryController.ts
import { Request, Response } from "express";
import Category from "../models/categoryModel";

// Create a new category
export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name, parent } = req.body;
    if (!name) {
      return res.status(400).json({ message: "Category name is required" });
    }

    const parentId = parent ? await Category.findById(parent) : null;

    const newCategory = new Category({
      name,
      parent: parentId,
      active: true,
    });

    const savedCategory = await newCategory.save();

    res.status(201).json(savedCategory);
  } catch (error) {
    console.error("Error creating category:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get all categories
export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await Category.find();

    res.json(categories);
  } catch (error) {
    console.error("Error getting categories:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update a category
export const updateCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, active } = req.body;

    const category = await Category.findById({_id: id});

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    if (name) {
      category.name = name;
    }

    if (active !== undefined) {
      category.active = active;
    }

    const updatedCategory = await category.save();

    res.json(updatedCategory);
  } catch (error) {
    console.error("Error updating category:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Deactivate a category
export const deactivateCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    category.active = false;

    // Deactivate all child categories
    await deactivateChildCategories(category);

    await category.save();

    res.json({ message: "Category deactivated successfully" });
  } catch (error) {
    console.error("Error deactivating category:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Recursively deactivate child categories
const deactivateChildCategories = async (category: any) => {
  if (category.children && category.children.length > 0) {
    for (const childId of category.children) {
      const childCategory = await Category.findById(childId);
      if (childCategory) {
        childCategory.active = false;
        await deactivateChildCategories(childCategory);
        await childCategory.save();
      }
    }
  }
};

// Get a single category with its parent (if any)
export const searchCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    const parentCategory = category.parent || null;

    // returning parent, if there is any
    res.json({ category, parentCategory });
  } catch (error) {
    console.error("Error getting category:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


