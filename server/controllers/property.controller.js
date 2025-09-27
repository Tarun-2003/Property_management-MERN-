import Property from "../mongodb/models/property.js";
import User from "../mongodb/models/user.js";

import mongoose from "mongoose";
import * as dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
const getAllProperties = async (req, res) => {
  const {
    _end,
    _order,
    _start,
    _sort,
    title_like = "",
    propertyType = "",
  } = req.query;

  const query = {};

  if (propertyType !== "") {
    query.propertyType = propertyType;
  }

  if (title_like) {
    query.title = { $regex: title_like, $options: "i" };
  }

  try {
    const count = await Property.countDocuments({query});

    let mongoQuery = Property.find(query);

    if (_end) mongoQuery = mongoQuery.limit(Number(_end));
    if (_start) mongoQuery = mongoQuery.skip(Number(_start));

    // ✅ Safe sorting
    if (
      _sort &&
      _order &&
      _sort !== "undefined" &&
      _order !== "undefined"
    ) {
      mongoQuery = mongoQuery.sort({ [_sort]: _order });
    } else {
      mongoQuery = mongoQuery.sort({ createdAt: -1 }); // fallback
    }

    const properties = await mongoQuery.exec();

    res.header("x-total-count", count);
    res.header("Access-Control-Expose-Headers", "x-total-count");

    res.status(200).json(properties);
  } catch (error) {
    console.error("❌ Error in getAllProperties:", error.message);
    res.status(500).json({ message: error.message });
  }
};
// ==================== GET ALL PROPERTIES ====================
// const getAllProperties = async (req, res) => {
//   const {
//     _end,
//     _order,
//     _start,
//     _sort,
//     title_like = "",
//     propertyType = "",
//   } = req.query;

//   const query = {};

//   if (propertyType !== "") {
//     query.propertyType = propertyType;
//   }

//   if (title_like) {
//     query.title = { $regex: title_like, $options: "i" };
//   }

//   try {
//     const count = await Property.countDocuments(query);

//     let mongoQuery = Property.find(query);

//     if (_end) mongoQuery = mongoQuery.limit(Number(_end));
//     if (_start) mongoQuery = mongoQuery.skip(Number(_start));

//     // ✅ only apply sort if both _sort and _order are valid
//     if (
//       _sort &&
//       _order &&
//       _sort !== "undefined" &&
//       _order !== "undefined"
//     ) {
//       console.log("Sorting by:", { [_sort]: _order });
//       mongoQuery = mongoQuery.sort({ [_sort]: _order });
//     } else {
//       console.log("Sorting by default: createdAt desc");
//       mongoQuery = mongoQuery.sort({ createdAt: -1 });
//     }

//     const properties = await mongoQuery.exec();

//     res.header("x-total-count", count);
//     res.header("Access-Control-Expose-Headers", "x-total-count");

//     res.status(200).json(properties);
//   } catch (error) {
//     console.error("Error in getAllProperties:", error);
//     res.status(500).json({ message: error.message });
//   }
// };

// ==================== GET PROPERTY DETAIL ====================
const getPropertyDetail = async (req, res) => {
  const { id } = req.params;
  const propertyExists = await Property.findOne({ _id: id }).populate("creator");

  if (propertyExists) {
    res.status(200).json(propertyExists);
  } else {
    res.status(404).json({ message: "Property not found" });
  }
};

// ==================== CREATE PROPERTY ====================
const createProperty = async (req, res) => {
  try {
    const { title, description, propertyType, location, price, photo, email } =
      req.body;

    const session = await mongoose.startSession();
    session.startTransaction();

    const user = await User.findOne({ email }).session(session);

    if (!user) throw new Error("User not found");

    const photoUrl = await cloudinary.uploader.upload(photo);

    const newProperty = await Property.create({
      title,
      description,
      propertyType,
      location,
      price,
      photo: photoUrl.url,
      creator: user._id,
    });

    user.allProperties.push(newProperty._id);
    await user.save({ session });

    await session.commitTransaction();

    res.status(200).json({ message: "Property created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ==================== UPDATE PROPERTY ====================
// const updateProperty = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { title, description, propertyType, location, price, photo } = req.body;

//     const photoUrl = await cloudinary.uploader.upload(photo);

//     await Property.findByIdAndUpdate(
//       { _id: id },
//       {
//         title,
//         description,
//         propertyType,
//         location,
//         price,
//         photo: photoUrl.url || photo,
//       }
//     );

//     res.status(200).json({ message: "Property updated successfully" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

const updateProperty = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, propertyType, location, price, photo } = req.body;

    let updatedPhoto = photo;

    // ✅ Only upload if it's a new base64 image (starts with "data:image")
    if (photo && photo.startsWith("data:image")) {
      const photoUrl = await cloudinary.uploader.upload(photo);
      updatedPhoto = photoUrl.url;
    }

    await Property.findByIdAndUpdate(
      id,
      {
        title,
        description,
        propertyType,
        location,
        price,
        photo: updatedPhoto,
      },
      { new: true } // return the updated doc
    );

    res.status(200).json({ message: "Property updated successfully" });
  } catch (error) {
    console.error("❌ Error updating property:", error.message);
    res.status(500).json({ message: error.message });
  }
};


// ==================== DELETE PROPERTY ====================
const deleteProperty = async (req, res) => {
  try {
    const { id } = req.params;

    const propertyToDelete = await Property.findById(id).populate("creator");

    if (!propertyToDelete) throw new Error("Property not found");

    const session = await mongoose.startSession();
    session.startTransaction();

    // ✅ delete property document
    await propertyToDelete.deleteOne({ session });

    // ✅ remove from creator’s property list
    propertyToDelete.creator.allProperties.pull(propertyToDelete._id);
    await propertyToDelete.creator.save({ session });

    await session.commitTransaction();

    res.status(200).json({ message: "Property deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting property:", error.message);
    res.status(500).json({ message: error.message });
  }
};


export {
  getAllProperties,
  getPropertyDetail,
  createProperty,
  updateProperty,
  deleteProperty,
};
