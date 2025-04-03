import { useParams } from "react-router";
import { useEffect, useState } from "react";
import ProductService from "../../services/product.service";


//import React Icons 
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { AiOutlineMessage } from "react-icons/ai";
import { MdOutlineReport } from "react-icons/md";



const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [liked, setLiked] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      console.log("Fetching product with ID:", id);
      const selectedProduct = await ProductService.getProductById(id);
      console.log("Selected Product:", selectedProduct);
      if (selectedProduct) {
        setProduct(selectedProduct);
        const allProducts = await ProductService.getAllProducts();
        const related = allProducts.filter(
          (p) =>
            p.category === selectedProduct.category &&
            p._id !== selectedProduct._id
        );

        console.log("Related Products:", related);
        setRelatedProducts(related);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <div className="text-center mt-10">กำลังโหลดข้อมูล...</div>;
  }

  return (
    <div className="section-container mt-6 px-6 py-12">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-4">
        <span>อุปกรณ์อิเล็กทรอนิกส์ &gt; คอมพิวเตอร์</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="flex flex-col">
          <img
            src={product.images?.[0] || "/default.jpg"}
            alt={product.productName}
            className="w-130 h-130 rounded-lg shadow-md"
          />
          <div className="flex mt-2 space-x-2">
            {product.images?.slice(1).map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Gallery ${index}`}
                className="w-20 h-20 rounded-md border shadow-sm cursor-pointer"
              />
            ))}
          </div>
        </div>

        <div>
          <h1 className="text-2xl font-bold">{product.productName}</h1>

          <div className="flex items-center justify-between my-2">
            <p className="text-3xl font-bold text-black">
              ฿ {product.price.toLocaleString()}
            </p>
            <button
              onClick={() => setLiked(!liked)}
              className="text-gray-500 hover:text-red-500"
            >
              {liked ? <FaHeart size={24} /> : <FaRegHeart size={24} />}
            </button>
          </div>

          <p className="text-xl font-semibold mt-3">
            สภาพสินค้า -{" "}
            <span className="text-lg text-gray-700">{product.condition}</span>
          </p>

          <div className="flex items-center justify-between mt-4 border-b pb-1">
            <h2 className="text-xl font-semibold">รายละเอียด</h2>
            <button className="flex items-center bg-vivid text-white px-4 py-2 rounded-lg border border-blue-500 hover:bg-blue-200">
              <MdOutlineReport size={20} className="mr-2" />
              รายงานโพสต์
            </button>
          </div>

          <p className="text-gray-800 text-sm leading-relaxed mt-2">
            {product.description}
          </p>
        </div> 

        {/* Seller Info */}
        <div className="  shadow-lg p-6 w-full sm:w-[400px] rounded-2xl mt-6">
          <h2 className="text-xl  mb-4">รายละเอียดผู้ขาย</h2>

          {/* ข้อมูลผู้ขาย */}
          <div className="flex items-center justify-between">
            {/* โปรไฟล์ผู้ขาย */}
            <div className="flex items-center space-x-3">
              <img
                src={product.seller?.image || "https://picsum.photos/200/200"}
                alt={product.seller?.name}
                className="w-14 h-14 rounded-full border"
              />
              <p className="font-medium truncate w-32 sm:w-auto">
                {product.seller?.owner || "ผู้ใช้ไม่ระบุ"}
              </p>
            </div>

            {/* ลิงก์โปรไฟล์ */}
            <a
              href={`/profile/${product.seller?.id}`}
              className="text-blue-600 font-medium hover:underline"
            >
              ดูโปรไฟล์
            </a>
          </div>

          {/* ปุ่มแชท */}
          <button className="mt-4 flex items-center justify-center bg-gray-200 text-black px-4 py-2 rounded-2xl w-full border border-gray-300 hover:bg-gray-300">
            <AiOutlineMessage size={20} className="mr-2" />
            แชท
          </button>
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-22">
        <h2 className="text-xl font-semibold mb-4">สินค้าที่คล้ายกัน</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {relatedProducts.map((p) => (
            <div
              key={p._id}
              className="bg-white p-3 rounded-lg shadow-md cursor-pointer"
            >
              <img
                src={p.images}
                alt={p.productName}
                className="w-full h-40 object-cover rounded-lg"
              />
              <p className="text-sm font-medium mt-2">{p.productName}</p>
              <p className="text-sm text-gray-500">฿ {p.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
