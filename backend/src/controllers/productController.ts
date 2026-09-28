import { Request, Response } from "express";
import { Product } from "../models/Product.js";
import { LicenseKey } from "../models/LicenseKey.js";

export const getPublicProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      brand,
      category,
      devices,
      duration,
      os,
      minPrice,
      maxPrice,
      search,
      sort,
      isHotDeal,
      isBestSeller,
    } = req.query;

    const query: any = {};

    if (brand) {
      const brands = (brand as string).split(",").map((b) => b.trim());
      query.brand = { $in: brands };
    }

    if (category) {
      const categories = (category as string).split(",").map((c) => c.trim());
      query.category = { $in: categories };
    }

    if (os) {
      const osList = (os as string).split(",").map((o) => o.trim());
      query.supportedOS = { $in: osList };
    }

    if (isHotDeal === "true") {
      query.isHotDeal = true;
    }

    if (isBestSeller === "true") {
      query.isBestSeller = true;
    }

    if (search) {
      const searchStr = (search as string).trim();
      query.$or = [
        { title: { $regex: searchStr, $options: "i" } },
        { brand: { $regex: searchStr, $options: "i" } },
        { category: { $regex: searchStr, $options: "i" } },
        { tagline: { $regex: searchStr, $options: "i" } },
      ];
    }

    let sortOptions: any = { createdAt: -1 };
    if (sort === "price-low-high") {
      sortOptions = { "variants.0.sellingPrice": 1 };
    } else if (sort === "price-high-low") {
      sortOptions = { "variants.0.sellingPrice": -1 };
    } else if (sort === "rating") {
      sortOptions = { rating: -1 };
    } else if (sort === "newest") {
      sortOptions = { createdAt: -1 };
    }

    const products = await Product.find(query).sort(sortOptions).lean();

    // Map products and dynamically verify stock against LicenseKey vault
    let result = await Promise.all(
      products.map(async (prod) => {
        const variantsWithStock = await Promise.all(
          prod.variants.map(async (v) => {
            const availableCount = await LicenseKey.countDocuments({
              $or: [
                { productId: prod._id },
                { productId: prod._id.toString() },
                { productTitle: prod.title },
              ],
              variantId: v.id,
              status: "AVAILABLE",
            });
            return {
              ...v,
              inStock: availableCount > 0,
              availableKeysCount: availableCount,
            };
          })
        );

        return {
          ...prod,
          id: prod._id.toString(),
          variants: variantsWithStock,
        };
      })
    );

    // Filter by device count if requested
    if (devices) {
      const devArray = (devices as string).split(",").map(Number);
      result = result.filter((p) => p.variants.some((v) => devArray.includes(v.deviceCount)));
    }

    // Filter by duration if requested
    if (duration) {
      const durArray = (duration as string).split(",").map(Number);
      result = result.filter((p) => p.variants.some((v) => durArray.includes(v.durationYears)));
    }

    // Filter by min/max price if requested
    if (minPrice || maxPrice) {
      const min = minPrice ? Number(minPrice) : 0;
      const max = maxPrice ? Number(maxPrice) : Infinity;
      result = result.filter((p) => p.variants.some((v) => v.sellingPrice >= min && v.sellingPrice <= max));
    }

    res.status(200).json({
      success: true,
      count: result.length,
      products: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch products",
    });
  }
};

export const getPublicProductBySlug = async (req: Request, res: Response): Promise<void> => {
  try {
    const { slug } = req.params;
    const product = await Product.findOne({ slug }).lean();

    if (!product) {
      res.status(404).json({ success: false, message: "Product not found" });
      return;
    }

    // Check stock for each variant from vault
    const variantsWithStock = await Promise.all(
      product.variants.map(async (v) => {
        const availableCount = await LicenseKey.countDocuments({
          $or: [
            { productId: product._id },
            { productId: product._id.toString() },
            { productTitle: product.title },
          ],
          variantId: v.id,
          status: "AVAILABLE",
        });
        return {
          ...v,
          inStock: availableCount > 0,
          availableKeysCount: availableCount,
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
      message: error.message || "Failed to fetch product details",
    });
  }
};

export const getTopDeals = async (req: Request, res: Response): Promise<void> => {
  try {
    const hotDeals = await Product.find({ isHotDeal: true }).limit(8).lean();
    const bestSellers = await Product.find({ isBestSeller: true }).limit(8).lean();

    res.status(200).json({
      success: true,
      hotDeals: hotDeals.map((p) => ({ ...p, id: p._id.toString() })),
      bestSellers: bestSellers.map((p) => ({ ...p, id: p._id.toString() })),
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch top deals",
    });
  }
};
