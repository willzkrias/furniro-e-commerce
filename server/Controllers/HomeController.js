
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const searchProduct = async (req, res) => {
    const { query } = req.query
    const searchQuery = query.toLowerCase();

    if (!query) {
        return res.status(404).json({
            msg: "Query parameter is required"
        });
    }

    try {
        const product = await prisma.product.findMany({
            where: {
                OR: [
                    {
                        name: {
                            contains: searchQuery
                        }
                    },
                    {
                        description: {
                            contains: searchQuery
                        }
                    },
                ]
            }
        });
        if (product.length === 0) {
            return res.status(404).json({ msg: "Product not found" })
        }

        res.status(200).json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: error.message });
    }
}