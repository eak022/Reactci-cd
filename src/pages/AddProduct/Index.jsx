import { useState } from "react";
import Swal from "sweetalert2";
import ProductService from "../../services/product.service";

const Index = () => {
  const [product, setProduct] = useState({
    postType: "",
    postName: "",
    category: "",
    image: null,
    price: "",
    description: "",
    condition: "",
    // postAd: "", // อย่าลืมเพิ่ม Backendนะ
  });

  const handlePostTypeChange = (e) => {
    setProduct((prev) => ({ ...prev, postType: e.target.value }));
  };

  const handlePostconditionChange = (e) => {
    setProduct((prev) => ({ ...prev, condition: e.target.value }));
  };

  const handleCategoryChange = (e) => {
    setProduct((prev) => ({ ...prev, category: e.target.value }));
  };

  // const handlePostAdChange = (e) => {
  //   setProduct((prev) => ({ ...prev, postAd: e.target.value }));
  // };

  // const handleChange = (e) => {
  //   const { name, value, files } = e.target;
  //   if (name === "image") {
  //     setProduct({ ...product, [name]: files[0] });
  //   } else {
  //     setProduct({ ...product, [name]: value });
  //   }
  // };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setProduct({ ...product, [name]: files[0] });
    } else if (name === "price") {
      const numericValue = value.replace(/[^0-9.]/g, "");
      setProduct({ ...product, [name]: numericValue });
    } else {
      setProduct({ ...product, [name]: value });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProduct((prev) => ({ ...prev, image: file }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("postType", product.postType);
    formData.append("productName", product.productName);
    formData.append("price", product.price);
    formData.append("category", product.category);
    formData.append("file", product.image);
    formData.append("description", product.description);
    formData.append("condition", product.condition);
    formData.append("postAd", product.postAd);

    ProductService.addProduct(formData)
      .then((response) => {
        Swal.fire({
          icon: "success",
          title: "กรุณารอเจ้าหน้าที่ตรวจสอบ",
          text: "โพสต์แบบฟรี!",
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "There was an error posting the product. Please try again.",
        });
      });
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   // ตรวจสอบว่ามีการกรอกข้อมูลที่จำเป็นครบถ้วน
  //   if (
  //     !product.productName ||
  //     !product.price ||
  //     !product.category ||
  //     !product.image ||
  //     !product.description
  //   ) {
  //     alert("กรุณากรอกข้อมูลให้ครบถ้วนก่อนโพสต์");
  //     return; // หยุดการทำงานถ้าข้อมูลไม่ครบถ้วน
  //   }

  //   // สร้าง FormData และเพิ่มข้อมูลที่จำเป็น
  //   const formData = new FormData();
  //   formData.append("postType", product.postType);
  //   formData.append("productName", product.productName);
  //   formData.append("price", product.price);
  //   formData.append("category", product.category);
  //   formData.append("file", product.image); // ตรวจสอบว่า product.image เป็นไฟล์หรือไม่
  //   formData.append("description", product.description);
  //   formData.append("condition", product.condition);
  //   formData.append("postAd", product.postAd);

  //   // ส่งข้อมูลไปยัง API
  //   ProductService.addProduct(formData)
  //     .then((response) => {
  //       alert("กรุณารอเจ้าหน้าที่ตรวจสอบ\nโพสต์แบบฟรี!");
  //     })
  //     .catch((error) => {
  //       alert("เกิดข้อผิดพลาดในการโพสต์สินค้า\nกรุณาลองใหม่อีกครั้ง");
  //     });
  // };

  return (
    <div className="section-container-add-product pt-24 ">
      <form className="mb-4" onSubmit={handleSubmit}>
        {/* เลือกข้อเสนอ */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-black ">เลือกข้อเสนอ</h2>

          <input
            type="radio"
            id="sell"
            name="postType"
            value="WTS"
            className="sr-only"
            onChange={handlePostTypeChange}
            checked={product.postType === "WTS"}
          />
          <label
            htmlFor="sell"
            className={`btn ${
              product.postType === "WTS"
                ? " bg-vivid text-white text-lg rounded-xl p-6 w-48 h-18 m-2"
                : "text-vivid hover:bg-vivid hover:text-white border-vivid rounded-xl text-lg p-6 w-48 h-18 m-2"
            }`}
          >
            Want To Sell
          </label>

          <input
            type="radio"
            id="buy"
            name="postType"
            value="WTB"
            className="sr-only "
            onChange={handlePostTypeChange}
            checked={product.postType === "WTB"}
          />
          <label
            htmlFor="buy"
            className={`btn ${
              product.postType === "WTB"
                ? "bg-vivid text-white text-lg rounded-xl p-6 w-48 h-18 m-2"
                : "text-vivid hover:bg-vivid hover:text-white border-vivid rounded-xl text-lg p-6 w-48 h-18 m-2"
            }`}
          >
            Want To Buy
          </label>
        </div>

        {/* ชื่อสินค้า */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-black ">ชื่อสินค้า</h2>
          <input
            id="postName"
            name="postName"
            required
            className="mt-1 p-4 text-base w-full border-gray-400 rounded-xl shadow-sm"
            onChange={handleChange}
          ></input>
        </div>

        {/* เลือกหมวดหมู่ให้ตรงกับสินค้า */}
        <div className="mt-8 ">
          <h2 className="text-xl font-semibold text-black ">
            เลือกหมวดหมู่ให้ตรงกับสินค้า
          </h2>
          <select
            className="flex mt-1 w-auto p-100 pl-3 py-4 text-base border-gray-400 rounded-xl shadow-sm "
            value={product.category}
            onChange={handleCategoryChange}
          >
            <option value="">หมวดหมู่</option>
            <option value="category1">หมวดหมู่ 1</option>
            <option value="category2">หมวดหมู่ 2</option>
            <option value="category3">หมวดหมู่ 3</option>
          </select>
        </div>

        {/* เลือกรูปภาพ */}
        <div className="mt-8 ">
          <h2 className="text-xl font-semibold text-black">เลือกรูปภาพ</h2>
          <div className=" flex">
            <input
              type="file"
              id="image"
              name="image"
              className="mt-1 p-4 text-base w-[200px] h-[200px] border-gray-400 rounded-xl shadow-sm"
              onChange={handleFileChange}
            />
            {/* If an image is selected, display the preview */}
            {product.image && (
              <div className="mt-4 w-[200px] h-[200px] border-2 border-gray-300 rounded-xl overflow-hidden">
                <img
                  src={URL.createObjectURL(product.image)} // Create a preview URL
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
                <p className="mt-2 text-sm text-gray-500">
                  Selected File: {product.image.name}
                </p>
              </div>
            )}
            {/* If no image is selected, show a placeholder text */}
            {!product.image && (
              <p className="mt-2 text-sm text-gray-500">No file chosen</p>
            )}
          </div>
        </div>

        {/* ราคาสินค้า */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-black">ราคาสินค้า (บาท)</h2>
          <input
            id="price"
            name="price"
            onChange={handleChange}
            value={product.price}
            min="0"
            required
            className="mt-1 p-4 text-base w-128 border-gray-400 rounded-xl shadow-sm"
            type="number"
            placeholder="กรอกราคา"
          />
        </div>

        {/* รายละเอียดสินค้า */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-black">รายละเอียดสินค้า</h2>
          <textarea
            id="description"
            name="description"
            onChange={handleChange}
            value={product.description}
            required
            className="mt-1 p-4 text-base w-full border-gray-400 rounded-xl shadow-sm"
            type="text"
            placeholder=" กรุณากรอกข้อมูล เช่น สภาพสินค้า, ยี่ห้อ, รุ่น, ขนาด หรือข้อมูลสำคัญอื่น ๆ เพื่อให้ผู้ซื้อเข้าใจชัดเจน."
          />
        </div>

        {/* สภาพสินค้า */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-black ">สภาพสินค้า</h2>
          <input
            type="radio"
            id="UsedGood"
            name="condition"
            value="UsedGood"
            className="sr-only "
            onChange={handlePostconditionChange}
            checked={product.condition === "UsedGood"}
          />
          <label
            htmlFor="UsedGood"
            className={`btn ${
              product.condition === "UsedGood"
                ? "bg-vivid text-white text-lg rounded-xl p-6 w-48 h-18 m-2"
                : "text-vivid hover:bg-vivid hover:text-white border-vivid rounded-xl text-lg p-6 w-48 h-18 m-2"
            }`}
          >
            มือสองสภาพดี
          </label>
          <input
            type="radio"
            id="UsedAcceptable"
            name="condition"
            value="UsedAcceptable"
            className="sr-only"
            onChange={handlePostconditionChange}
            checked={product.condition === "UsedAcceptable"}
          />
          <label
            htmlFor="UsedAcceptable"
            className={`btn ${
              product.condition === "UsedAcceptable"
                ? " bg-vivid text-white text-lg rounded-xl p-6 w-48 h-18 m-2"
                : " text-vivid hover:bg-vivid hover:text-white border-vivid rounded-xl text-lg p-6 w-48 h-18 m-2"
            }`}
          >
            มือสองพอใช้
          </label>
        </div>

        {/* เลือกประเภทประกาศโพสต์ */}
        {/* <div className="mt-8">
          <h2 className="text-xl font-semibold text-black ">
            เลือกประเภทประกาศโพสต์
          </h2>
          <input
            type="radio"
            id="Free-Ad"
            name="postAd"
            value="Free-Ad"
            className="sr-only "
            onChange={handlePostAdChange}
            checked={product.postAd === "Free-Ad"}
          />
          <label
            htmlFor="Free-Ad"
            className={`btn ${
              product.postAd === "Free-Ad"
                ? "bg-vivid text-white text-lg rounded-xl p-6 w-48 h-18 m-2"
                : "text-vivid hover:bg-vivid hover:text-white border-vivid rounded-xl text-lg p-6 w-48 h-18 m-2"
            }`}
          >
            แบบฟรี
          </label>
          <input
            type="radio"
            id="Paid-Ad"
            name="postAd"
            value="Paid-Ad"
            className="sr-only"
            onChange={handlePostAdChange}
            checked={product.postAd === "Paid-Ad"}
          />
          <label
            htmlFor="Paid-Ad"
            className={`btn ${
              product.postAd === "Paid-Ad"
                ? " bg-vivid text-white text-lg rounded-xl p-6 w-48 h-18 m-2"
                : " text-vivid hover:bg-vivid hover:text-white border-vivid rounded-xl text-lg p-6 w-48 h-18 m-2"
            }`}
          >
            แบบเสียงตัง
          </label>
        </div> */}

        {/* ปุ่ม submit */}
        <div className="mt-6">
          <button
            type="submit"
            className="text-vivid hover:bg-vivid bg-vivid  hover:text-white border-vivid rounded-xl text-lg p-6 w-48 h-18 m-2"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default Index;
