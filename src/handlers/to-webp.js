import { z, ZodError } from "zod";
import service from "../service";
import ServiceError from "../ServiceError";

const validationSchema = z.object({
  url: z.string().url(),
  quality: z.number({ coerce: true }).optional(),
  width: z.number({ coerce: true }).optional(),
  height: z.number({ coerce: true }).optional(),
  lossless: z.boolean({ coerce: true }).optional(),
  nearLossless: z.boolean({ coerce: true }).optional(),
  position: z
    .enum([
      "top",
      "right top",
      "right",
      "right bottom",
      "bottom",
      "left bottom",
      "left",
      "left top",
    ])
    .optional(),
  fit: z.enum(["contain", "cover", "fill", "inside", "outside"]).optional(),
  background: z.string().optional(),
});

/**
 * @param {import("@netlify/functions").HandlerEvent} event
 * @param {import("@netlify/functions").HandlerContext} context
 * @returns {import("@netlify/functions").HandlerResponse}
 */
export async function handler(event, context) {
  try {
    const request = await validationSchema.parseAsync(
      event.queryStringParameters
    );

    console.info("request", request);

    const result = await service.process(request);

    console.info("ok");

    return {
      statusCode: 200,
      body: result.toString("base64"),
      isBase64Encoded: true,
      headers: {
        "content-type": "image/webp",
        "cache-control":
          "public, immutable, no-transform, s-maxage=31536000, max-age=31536000",
      },
    };
  } catch (error) {
    console.error("error", error);

    const headers = {
      "content-type": "application/json",
    };

    if (error instanceof ServiceError) {
      return {
        headers,
        statusCode: error.statusCode,
        body: JSON.stringify({ message: error.message }),
      };
    }

    if (error instanceof ZodError) {
      return {
        headers,
        statusCode: 400,
        body: JSON.stringify({
          message: "Bad request.",
          errors: error.errors,
        }),
      };
    }

    return {
      headers,
      statusCode: 500,
      body: JSON.stringify({ message: "Internal server error." }),
    };
  }
}
