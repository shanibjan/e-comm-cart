import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

const AddProducts = () => {
  const [image, setImage] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Product name is required"),
    price: Yup.number()
      .positive("Price must be positive")
      .required("Price is required"),
    stock: Yup.number()
      .min(0, "Stock cannot be negative")
      .required("Stock is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      price: "",
      stock: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      if (!image) {
        alert("Please upload an image");
        return;
      }
      const formData = new FormData();
      formData.append("image", image);
      formData.append("name", values.name);
      formData.append("price", values.price);
      formData.append("stock", values.stock);
      setIsLoading(true);
      setError("");

      try {
        await axios.post(
          "http://localhost:7000/api/products/add-product",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        alert("Product added successfully!");
        formik.resetForm();
        setImage(null);
      } catch (error) {
        setError(error.response?.data?.message || "Failed to add Products");
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="my-[10%]">
        <h1 className="text-[40px] text-center font-gorditaBold max-[550px]:text-[30px] max-[370px]:text-[25px] text-[#244262]">
          Add Products
        </h1>
        <div className="w-[50%] text-center max-[750px]:w-[80%] max-[500px]:w-[100%] max-[650px]:text-[13px] mx-auto">
          <input
            className="bg-[#EBF5FF] w-full py-[4%] px-[4%] mb-[2%] "
            type="text"
            placeholder="Product Name"
            {...formik.getFieldProps("name")}
          />
          {formik.touched.name && formik.errors.name && (
            <div style={{ color: "red", marginTop: "4px" }}>
              {formik.errors.name}
            </div>
          )}

          <br />
          <input
            className="bg-[#EBF5FF] w-full py-[4%] px-[4%] mb-[2%] "
            type="number"
            placeholder="PRICE"
            {...formik.getFieldProps("price")}
          />
          {formik.touched.price && formik.errors.price && (
            <div style={{ color: "red", marginTop: "4px" }}>
              {formik.errors.price}
            </div>
          )}
          <br />

          <input
            className="bg-[#EBF5FF] w-full py-[4%] px-[4%] mb-[2%] "
            type="number"
            placeholder="STOCK"
            {...formik.getFieldProps("stock")}
          />
          <br />
          {formik.touched.stock && formik.errors.stock && (
            <div style={{ color: "red", marginTop: "4px" }}>
              {formik.errors.stock}
            </div>
          )}
          <input
            type="file"
            id="myFile"
            name="filename"
            multiple
            accept=".jpg,.jpeg,.png,.webp"
            className="p-[4%] bg-[#EBF5FF] w-full mb-[2%] font-gorditaRegular"
            onChange={handleFileChange}
          />
          <br />

          <button
            type="submit"
            disabled={isLoading}
            className="bg-[#94C4F7] py-[3%] px-[10%] font-gorditaBold text-[12px] tracking-[2px] mb-[5%]  text-white"
          >
            {isLoading ? "Adding..." : "Add Product"}
          </button>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
      </div>
    </form>
  );
};

export default AddProducts;
