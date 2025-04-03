import logo from "/Logo/LogoDormdeals.png";
import universityLogo from "/Logo/university.png";

const Modal = ({ name }) => {
  return (
    <dialog id={name} className="modal">
      <div className="modal-box flex flex-col items-center text-center p-6 w-full max-w-[600px] h-auto sm:h-[450px]">
        <img src={logo} alt="DormDeals Logo" className="h-10 mb-4" />
        <div className="p-4 rounded-lg w-full flex flex-col items-center">
          <a className="w-full flex items-center justify-center gap-2 text-black px-6 py-3 rounded-lg mt-8 sm:mt-12">
            <img
              src={universityLogo}
              alt="University Logo"
              className="h-16 sm:h-20 ml-1.5"
            />
            <span className="mr-2.5 text-base sm:text-lg font-medium">
              ลงชื่อเข้าใช้ด้วยอีเมลมหาวิทยาลัย
            </span>
          </a>
        </div>
        <p className="text-xs sm:text-sm text-gray-500 mt-12 sm:mt-24 px-4 text-center">
          ข้อตกลงและเงื่อนไขการยอมรับ
          <a href="#" className="text-vivid underline">
            {" "}
            ข้อกำหนดในการให้บริการ{" "}
          </a>
          ของ DormDeals และรับทราบว่า
          <a href="#" className="text-vivid underline">
            {" "}
            นโยบายความเป็นส่วนตัว{" "}
          </a>
          ของ DormDeals มีผลบังคับใช้กับคุณ
        </p>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};

export default Modal;
