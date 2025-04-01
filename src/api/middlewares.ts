import {
  defineMiddlewares,
  validateAndTransformBody,
} from "@medusajs/framework/http";
import { createDigitalProductsSchema } from "./validation-schemas";

export default defineMiddlewares({
  routes: [
    {
      matcher: "/admin/digital-products",
      method: "POST",
      middlewares: [validateAndTransformBody(createDigitalProductsSchema)],
    },
  ],
});
