# to-webp

## Overview
This microservice allows image processing by accepting various parameters through query strings. It supports resizing, quality adjustments, and different fitting modes. All images are converted to WebP format.

## Base URL
```
https://to-webp.netlify.app
```

## Endpoint
```
GET /
```

## Query Parameters

| Parameter     | Type    | Required | Description |
|--------------|---------|----------|-------------|
| `url`        | string  | ✅       | The URL of the image to be processed. Must be a valid URL. |
| `quality`    | number  | ❌       | The quality of the output WebP image (e.g., 0-100). Default is `75`. |
| `width`      | number  | ❌       | The desired width of the output image. |
| `height`     | number  | ❌       | The desired height of the output image. |
| `lossless`   | boolean | ❌       | If `true`, the image will be encoded in WebP lossless mode. |
| `nearLossless` | boolean | ❌       | If `true`, the image will use WebP near-lossless compression. |
| `position`   | enum    | ❌       | Defines the cropping position. Options: `top`, `right top`, `right`, `right bottom`, `bottom`, `left bottom`, `left`, `left top`. |
| `fit`        | enum    | ❌       | Defines how the image should be resized to fit the given dimensions. Options: `contain`, `cover`, `fill`, `inside`, `outside`. |
| `background` | string  | ❌       | Background color to be used when `fit=contain`. Example: `#ffffff`. |

## Example Requests

### Basic Usage
```
GET /?url=https://example.com/image.jpg
```

### Resizing and Quality Adjustment
```
GET /?url=https://example.com/image.jpg&width=500&height=300&quality=80
```

### Using Fit and Background
```
GET /?url=https://example.com/image.jpg&width=400&height=400&fit=contain&background=%23ff0000
```

### Lossless Compression
```
GET /?url=https://example.com/image.jpg&lossless=true
```

### Specifying Position
```
GET /?url=https://example.com/image.jpg&width=400&height=400&position=left%20top
```

## Response
The API returns the processed image as a binary stream with the `Content-Type: image/webp` header.

## Error Handling
- `400 Bad Request`: Invalid or missing query parameters. This includes malformed input data. When caused by validation errors, the response includes a list of errors.
- `404 Not Found`: Image URL not accessible.
- `500 Internal Server Error`: Unexpected server error.

### Example Error Responses
#### Validation Error (400 Bad Request)
```json
{
  "message": "Bad request.",
  "errors": [
    {
      "path": ["width"],
      "message": "Expected number, received string"
    }
  ]
}
```

#### Image Not Found (404 Not Found)
```json
{
  "message": "Image not found."
}
```

#### Internal Server Error (500)
```json
{
  "message": "Internal server error."
}
```

## Notes
- The `url` parameter is mandatory.
- If `width` or `height` is omitted, the original dimensions are maintained.
- If `fit=contain`, `background` can be used to specify the fill color.
- `quality`, `lossless`, and `nearLossless` apply to WebP format.
- `position` allows precise control over cropping alignment.
- **All images are converted to WebP format.**