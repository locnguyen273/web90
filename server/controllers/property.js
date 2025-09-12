import Property from "../models/property.js";
import cloudinary from "../configs/cloudinary.js";

const uploadImageToCloudinary = (file) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder: "properties" }, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve({ url: result.secure_url, public_id: result.public_id });
        }
      })
      .end(file.buffer);
  });
};

export const createProperty = async (req, res) => {
  try {
    const { address, price, area } = req.body;
    const files = req.files;

    const images = [];
    if (files && files.length > 0) {
      const uploadPromises = files.map((file) => uploadImageToCloudinary(file));
      const uploaded = await Promise.all(uploadPromises);
      images.push(...uploaded);
    }

    const property = new Property({
      address,
      price,
      area,
      images,
    });
    await property.save();
    res.status(201).json({ message: "Tạo nhà ở thành công", data: property });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProperty = async (req, res) => {
  try {
    const { id } = req.params;
    const { price, address, area, status, removeImages } = req.body;

    const property = await Property.findById(id);
    if (!property) {
      return res.status(404).json({ message: "Không tìm thấy nhà ở." });
    }

    if (removeImages && removeImages.length > 0) {
      for (const public_id of removeImages) {
        await cloudinary.uploader.destroy(public_id);
        property.images = property.images.filter(
          (img) => img.public_id !== public_id
        );
      }
    }

    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const uploaded = await uploadImageToCloudinary(file.buffer);
        property.images.push(uploaded);
      }
    }

    if (address) property.address = address;
    if (price) property.price = price;
    if (area) property.area = area;
    if (status) property.status = status || "Đang bán";
    await property.save();

    return res.json({ message: "Nhà ở cập nhật thành công", data: property });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
