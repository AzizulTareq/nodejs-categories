import express from "express";
import {
  createCategory,
  updateCategory,
  deactivateCategory,
  searchCategory,
  getCategories,
} from "../controllers/categoryController";

const router = express.Router();

router.route('/create').post(createCategory)
router.route('/update/:id').put(updateCategory)
router.route('/deactive/:id').delete(deactivateCategory)
router.route('/get/:id').get(searchCategory)
router.route('/get').get(getCategories)

export default router;
