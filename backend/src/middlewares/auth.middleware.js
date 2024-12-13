// import { asyncHandler } from "../utils/asyncHandler.js";
// import { ApiError } from "../utils/ApiError.js";
// import jwt from "jsonwebtoken";
// import { User } from "../models/user.model.js";

// // Middleware to verify JWT token and check if user exists

// const verifyJWT = asyncHandler(async (req, res, next) => {
//   try {
//     // 1. Retrieve the token from cookies or Authorization header
//     // We first check if the token is present in cookies. If not, we check the Authorization header.

//     const token =
//       req.cookies?.accessToken ||
//       req.header("Authorization")?.replace("Bearer ", "");

//     // If no token is found, return an "Unauthorized Request" error

//     if (!token) {
//       throw new ApiError(401, "Unauthorized Request");
//     }

//     // 2. Verify the JWT token using the secret key from environment variables
//     // jwt.verify will decode the token and also check its validity.

//     const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

//     // 3. Find the user associated with the decoded token's _id
//     // The _id is extracted from the decoded token and used to look up the user in the database.

//     const user = await User.findById(decodedToken?._id).select(
//       "-userPassword -refreshToken"
//     );

//     // 4. If no user is found, throw an error indicating "Invalid Access Token"

//     if (!user) {
//       throw new ApiError(401, "Invalid Access Token");
//     }

//     // 5. Attach the found user to the request object for use in other middleware or routes
//     // Now that we've verified the token and found the user, attach it to the request for future use.

//     req.user = user;

//     // 6. Proceed to the next middleware or route handler
//     // The next function is called to continue processing the request.

//     next();
//   } catch (error) {
//     // 7. Catch any errors (invalid token, expired token, etc.) and throw a generic "Invalid Operation" error
//     // If any errors occur (e.g., JWT verification failure), we catch them here and return an error.

//     if (error instanceof jwt.TokenExpiredError) {
//       // If the token has expired

//       throw new ApiError(401, "Token has expired. Please log in again.");
//     } else if (error instanceof jwt.JsonWebTokenError) {
//       // If the token is invalid or tampered with

//       throw new ApiError(401, "Invalid token. Please log in again.");
//     } else {
//       // General error fallback for other cases

//       throw new ApiError(401, "Invalid Operation!");
//     }
//   }
// });

// export { verifyJWT };

import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

// Middleware to verify JWT token and check if user exists
const verifyJWT = asyncHandler(async (req, res, next) => {
   try {
      // 1. Retrieve the token from cookies or Authorization header
      const token =
         req.cookies?.accessToken ||
         req.header("Authorization")?.replace("Bearer ", "");

      console.log("Received Token:", token); // Debugging: Log the received token

      // 2. If no token is found, throw an "Unauthorized Request" error
      if (!token) {
         throw new ApiError(401, "Unauthorized Request - No Token Provided");
      }

      // 3. Verify the JWT token using the secret key from environment variables
      const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

      console.log("Decoded Token:", decodedToken); // Debugging: Log the decoded token

      // 4. Find the user associated with the decoded token's _id
      const user = await User.findById(decodedToken._id).select(
         "-userPassword -refreshToken"
      );

      // 5. If no user is found, throw an error indicating "Invalid Access Token"
      if (!user) {
         throw new ApiError(401, "Invalid Access Token");
      }

      // 6. Attach the found user to the request object for use in other middleware or routes
      req.user = user;

      // 7. Proceed to the next middleware or route handler
      next();
   } catch (error) {
      // 8. Catch any errors (invalid token, expired token, etc.) and throw a specific error message

      console.error("JWT Verification Error:", error); // Debugging: Log error

      if (error instanceof jwt.TokenExpiredError) {
         // Token has expired
         throw new ApiError(401, "Token has expired. Please log in again.");
      } else if (error instanceof jwt.JsonWebTokenError) {
         // Invalid token (e.g., tampered or malformed)
         throw new ApiError(401, "Invalid token. Please log in again.");
      } else {
         // Other errors (generic)
         throw new ApiError(401, "Invalid Operation!");
      }
   }
});

export { verifyJWT };
