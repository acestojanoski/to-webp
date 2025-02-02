import sharp from "sharp";
import repository from "./repository";
import ServiceError from "./ServiceError";

/**
 * @typedef {Object} Options
 * @property {string} url
 * @property {number} [quality]
 * @property {boolean} [lossless]
 * @property {boolean} [nearLossless]
 * @property {number} [width]
 * @property {number} [height]
 * @property {import("sharp").ResizeOptions['fit']} [fit]
 * @property {import("sharp").ResizeOptions['position']} [position]
 * @property {string} [background]
 */

/**
 * @param {Options} options
 */
const process = async (options) => {
  const {
    url,
    quality,
    lossless,
    nearLossless,
    width,
    height,
    fit,
    position,
    background,
  } = options;

  const image = await repository.fetchImage(url);

  if (!image) {
    throw new ServiceError(404, "Image not found.");
  }

  let imageProcessor = sharp(image).webp({
    lossless,
    nearLossless,
    quality: quality || 75,
  });

  /** @type {import("sharp").ResizeOptions} */
  const resizeOptions = {};

  if (width) {
    resizeOptions.width = width;
  }

  if (height) {
    resizeOptions.height = height;
  }

  if (position) {
    resizeOptions.position = position;
  }

  if (fit) {
    resizeOptions.fit = fit;
  }

  if (background) {
    resizeOptions.background = background;
  }

  if (
    resizeOptions.width ||
    resizeOptions.height ||
    resizeOptions.position ||
    resizeOptions.fit ||
    resizeOptions.background
  ) {
    imageProcessor = imageProcessor.resize(resizeOptions);
  }

  return imageProcessor.toBuffer();
};

const service = {
  process,
};

export default service;
