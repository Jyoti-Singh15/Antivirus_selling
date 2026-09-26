import { Request, Response } from "express";
import { Product } from "../models/Product.js";
import { LicenseKey } from "../models/LicenseKey.js";

// Helper function to generate slug
const slugify = (text: string): string => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");
};

export const getAdminProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await Product.find().sort({ createdAt: -1 }).lean();

    // Attach real-time available keys count per variant for admin view
    const productsWithStock = await Promise.all(
      products.map(async (prod) => {
        const variantsWithStock = await Promise.all(
          prod.variants.map(async (variant) => {
            const availableCount = await LicenseKey.countDocuments({
              productId: prod._id,
              variantId: variant.id,
              status: "AVAILABLE",
            });
            return {
              ...variant,
              availableKeysCount: availableCount,
              inStock: availableCount > 0,
            };
          })
        );

        const totalAvailableKeys = variantsWithStock.reduce(
          (acc, v) => acc + (v.availableKeysCount || 0),
          0
        );

        return {
          ...prod,
          id: prod._id.toString(),
          variants: variantsWithStock,
          totalAvailableKeys,
        };
      })
    );

    res.status(200).json({
      success: true,
      count: productsWithStock.length,
      products: productsWithStock,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch products",
    });
  }
};

export const getAdminProductById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id).lean();

    if (!product) {
      res.status(404).json({ success: false, message: "Product not found." });
      return;
    }

    const variantsWithStock = await Promise.all(
      product.variants.map(async (variant) => {
        const availableCount = await LicenseKey.countDocuments({
          productId: product._id,
          variantId: variant.id,
          status: "AVAILABLE",
        });
        return {
          ...variant,
          availableKeysCount: availableCount,
          inStock: availableCount > 0,
        };
      })
    );

    res.status(200).json({
      success: true,
      product: {
        ...product,
        id: product._id.toString(),
        variants: variantsWithStock,
      },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch product",
    });
  }
};

export const createProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      title,
      brand,
      category,
      tagline,
      description,
      keyFeatures,
      images,
      supportedOS,
      variants,
      systemRequirements,
      officialDownloadUrl,
      isAssured,
      isHotDeal,
      isBestSeller,
      activationSteps,
    } = req.body;

    if (!title || !brand || !category || !description || !variants || variants.length === 0) {
      res.status(400).json({
        success: false,
        message: "Title, Brand, Category, Description, and at least 1 Variant are required.",
      });
      return;
    }

    let baseSlug = slugify(title);
    let uniqueSlug = baseSlug;
    let count = 1;
    while (await Product.findOne({ slug: uniqueSlug })) {
      uniqueSlug = `${baseSlug}-${count}`;
      count++;
    }

    // Format variants
    const formattedVariants = variants.map((v: any, index: number) => ({
      id: v.id || `v-${v.deviceCount || 1}pc-${v.durationYears || 1}yr-${index}`,
      durationYears: Number(v.durationYears) || 1,
      deviceCount: Number(v.deviceCount) || 1,
      mrp: Number(v.mrp) || 0,
      sellingPrice: Number(v.sellingPrice) || 0,
      discountPercent:
        Number(v.discountPercent) ||
        (v.mrp > v.sellingPrice ? Math.round(((v.mrp - v.sellingPrice) / v.mrp) * 100) : 0),
      inStock: true,
      isDefault: v.isDefault ?? index === 0,
    }));

    const product = new Product({
      slug: uniqueSlug,
      title,
      brand,
      category,
      tagline: tagline || "",
      description,
      keyFeatures: keyFeatures || [],
      images: images || [],
      supportedOS: supportedOS || ["Windows"],
      variants: formattedVariants,
      systemRequirements: systemRequirements || {
        os: "Windows 11 / 10 / 8.1",
        processor: "1 GHz or faster",
        ram: "2 GB minimum",
        diskSpace: "1.5 GB free space",
        internetConnection: true,
      },
      officialDownloadUrl: officialDownloadUrl || "https://www.quickheal.co.in/installer",
      isAssured: isAssured ?? true,
      isHotDeal: isHotDeal ?? false,
      isBestSeller: isBestSeller ?? false,
      activationSteps: activationSteps || [
        "Download setup from the official download link.",
        "Install the software on your PC/Mac.",
        "Enter your 20-character license key when prompted.",
        "Your protection is now instantly activated!",
      ],
    });

    await product.save();

    res.status(201).json({
      success: true,
      message: "Product created successfully by Admin.",
      product: {
        ...product.toObject(),
        id: product._id.toString(),
      },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to create product",
    });
  }
};

export const updateProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const product = await Product.findById(id);
    if (!product) {
      res.status(404).json({ success: false, message: "Product not found" });
      return;
    }

    if (updateData.variants && Array.isArray(updateData.variants)) {
      updateData.variants = updateData.variants.map((v: any, index: number) => ({
        id: v.id || `v-${v.deviceCount || 1}pc-${v.durationYears || 1}yr-${index}`,
        durationYears: Number(v.durationYears) || 1,
        deviceCount: Number(v.deviceCount) || 1,
        mrp: Number(v.mrp) || 0,
        sellingPrice: Number(v.sellingPrice) || 0,
        discountPercent:
          Number(v.discountPercent) ||
          (v.mrp > v.sellingPrice ? Math.round(((v.mrp - v.sellingPrice) / v.mrp) * 100) : 0),
        inStock: v.inStock ?? true,
        isDefault: v.isDefault ?? false,
      }));
    }

    Object.assign(product, updateData);
    await product.save();

    res.status(200).json({
      success: true,
      message: "Product updated successfully.",
      product: {
        ...product.toObject(),
        id: product._id.toString(),
      },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to update product",
    });
  }
};

export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      res.status(404).json({ success: false, message: "Product not found" });
      return;
    }

    // Delete unused keys for this product
    await LicenseKey.deleteMany({ productId: id, status: "AVAILABLE" });

    await Product.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Product and unused license keys deleted successfully.",
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to delete product",
    });
  }
};
