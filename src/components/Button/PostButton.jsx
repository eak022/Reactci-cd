import { BiBell, BiMessageSquareDetail } from "react-icons/bi";
import { LuPlus } from "react-icons/lu";

const PostButton = () => {
  return (
    <div className="flex items-center gap-4">
      <button className="flex items-center gap-2 px-4 py-2 text-black rounded-lg hover:bg-gray-200 transition">
        <LuPlus size={15} />
        <a href="/AddProduct" className="text-sm font-medium">
          เริ่มโพสต์
        </a>
      </button>
      <BiBell size={22} className="cursor-pointer hover:text-gray-600" />
      <BiMessageSquareDetail
        size={22}
        className="cursor-pointer hover:text-gray-600"
      />
    </div>
  );
};

export default PostButton;
