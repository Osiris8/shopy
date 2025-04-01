import {
  AuthenticatedMedusaRequest,
  MedusaResponse,
} from "@medusajs/framework/http";
import { ContainerRegistrationKeys } from "@medusajs/framework/utils";

export const GET = async (
  req: AuthenticatedMedusaRequest,
  res: MedusaResponse
) => {
  const { fields, limit = 20, offset = 0 } = req.validatedQuery || {};
  const query = req.scope.resolve(ContainerRegistrationKeys.QUERY);

  const { data: digitalProducts, metadata: { count, take, skip } = {} } =
    await query.graph({
      entity: "digital_product",
      fields: ["*", "medias.*", "product_variant.*", ...(fields || [])],
      pagination: {
        skip: offset,
        take: limit,
      },
    });

  res.json({
    digital_products: digitalProducts,
    count,
    limit: take,
    offset: skip,
  });
};
