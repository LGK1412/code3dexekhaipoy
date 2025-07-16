import { useState, useEffect } from "react";
import { FaCirclePlus } from "react-icons/fa6";
import { FaCartPlus } from "react-icons/fa";
import { MdKeyboardDoubleArrowDown } from "react-icons/md";
import { FaSearch, FaFilter } from "react-icons/fa";
import { FaFire, FaTint, FaLeaf, FaGem, FaMountain } from "react-icons/fa"; // hoả, thuỷ, mộc, kim, thổ

export default function Sidebar({ addModel }) {
    const [search, setSearch] = useState("");

    const models = [
        { id: "ghe", name: "Chair", model_name: "chair.glb", price: 15.00, image: "https://placehold.co/60x60", menh: "mộc" },
        { id: "tu", name: "Wardrobe", model_name: "wardrobe.glb", price: 25.10, image: "https://placehold.co/60x60", menh: "thổ" },
        { id: "giuong", name: "Bed", model_name: "bed.glb", price: 35.00, image: "https://placehold.co/60x60", menh: "kim" },
        { id: "chair1", name: "Chair 1", model_name: "chair1.glb", price: 15.00, image: "https://placehold.co/60x60", menh: "hoả" },
        { id: "chair2", name: "Chair 2", model_name: "chair2.glb", price: 15.00, image: "https://placehold.co/60x60", menh: "thuỷ" },
        { id: "chair3", name: "Chair 3", model_name: "chair3.glb", price: 15.00, image: "https://placehold.co/60x60", menh: "mộc" },
        { id: "bed1", name: "Bed 1", model_name: "bed1.glb", price: 35.00, image: "https://placehold.co/60x60", menh: "hoả" },
        { id: "cuss1", name: "Cushion 1", model_name: "cuss1.glb", price: 10.00, image: "https://placehold.co/60x60", menh: "thổ" },
        { id: "cuss2", name: "Cushion 2", model_name: "cuss2.glb", price: 10.00, image: "https://placehold.co/60x60", menh: "kim" },
        { id: "locker1", name: "Locker 1", model_name: "locker1.glb", price: 25.00, image: "https://placehold.co/60x60", menh: "thuỷ" },
        { id: "locker2", name: "Locker 2", model_name: "locker2.glb", price: 25.00, image: "https://placehold.co/60x60", menh: "mộc" },
        { id: "plant1", name: "Plant 1", model_name: "Plant1.glb", price: 5.00, image: "https://placehold.co/60x60", menh: "mộc" },
        { id: "plant2", name: "Plant 2", model_name: "plant2.glb", price: 5.00, image: "https://placehold.co/60x60", menh: "mộc" },
        { id: "plant3", name: "Plant 3", model_name: "plant3.glb", price: 5.00, image: "https://placehold.co/60x60", menh: "mộc" },
        { id: "plant4", name: "Plant 4", model_name: "plant4.glb", price: 5.00, image: "https://placehold.co/60x60", menh: "mộc" },
        { id: "rug1", name: "Rug 1", model_name: "rug1.glb", price: 8.00, image: "https://placehold.co/60x60", menh: "thổ" },
        { id: "rug2", name: "Rug 2", model_name: "rug2.glb", price: 8.00, image: "https://placehold.co/60x60", menh: "thổ" },
        { id: "sl1", name: "Standing Lamp 1", model_name: "sL1.glb", price: 12.00, image: "https://placehold.co/60x60", menh: "kim" },
        { id: "sl2", name: "Standing Lamp 2", model_name: "SL2.glb", price: 12.00, image: "https://placehold.co/60x60", menh: "kim" },
        { id: "table1", name: "Table 1", model_name: "table1.glb", price: 20.00, image: "https://placehold.co/60x60", menh: "mộc" },
        { id: "table2", name: "Table 2", model_name: "table2.glb", price: 20.00, image: "https://placehold.co/60x60", menh: "mộc" },
        { id: "table3", name: "Table 3", model_name: "Table3.glb", price: 20.00, image: "https://placehold.co/60x60", menh: "thổ" },
        { id: "table4", name: "Table 4", model_name: "table4.glb", price: 20.00, image: "https://placehold.co/60x60", menh: "thổ" },
        { id: "tblight1", name: "Table Light 1", model_name: "TBLight1.glb", price: 10.00, image: "https://placehold.co/60x60", menh: "hoả" },
        { id: "w1", name: "Wall 1", model_name: "w1.glb", price: 18.00, image: "https://placehold.co/60x60", menh: "thổ" },
        { id: "w2", name: "Wall 2", model_name: "w2.glb", price: 18.00, image: "https://placehold.co/60x60", menh: "thổ" },
        { id: "w3", name: "Wall 3", model_name: "w3.glb", price: 18.00, image: "https://placehold.co/60x60", menh: "thổ" },
    ];

    const menhStyles = {
        "hoả": { color: "menh-hoa", icon: <FaFire /> },
        "thuỷ": { color: "menh-thuy", icon: <FaTint /> },
        "mộc": { color: "menh-moc", icon: <FaLeaf /> },
        "kim": { color: "menh-kim", icon: <FaGem /> },
        "thổ": { color: "menh-tho", icon: <FaMountain /> },
    };

    // useEffect(() => {
    //     preloadModels(models)
    // }, [])

    const filtered = models.filter(model =>
        model.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="absolute top-0 right-0 h-full w-[400px] flex flex-col pt-8 font-inria">

            <h2 className="text-[70px] font-bold text-gray-900 uppercase text-center w-full h-[70px]">
                Product
            </h2>

            <div className="w-full rounded-[30px] backdrop-blur-2xl bg-white/10 flex flex-col p-5 shadow-2xl overflow-y-auto mt-auto custom-scroll h-[80vh]">
                {/* 🔍 Search bar */}
                <div className="relative mb-4">
                    <input
                        type="text"
                        placeholder="Search model..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pr-20 pl-4 py-1.5 rounded-full border border-gray-300 bg-white text-sm text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-2 text-gray-500 text-sm cursor-pointer">
                        <FaSearch />
                        <FaFilter />
                    </div>
                </div>

                {filtered.map((model) => {
                    const menh = model.menh;
                    const style = menhStyles[menh] || {};
                    const colorClass = `text-${style.color}`;
                    const bgClass = `bg-${style.color}`;

                    return (
                        <div key={model.id} className="relative mb-3">
                            {/* Nút dấu cộng */}
                            <button
                                onClick={() => addModel(model.model_name, model.name)}
                                className={`absolute -top-2.5 -left-2.5 w-5 h-5 rounded-full border-none font-bold z-10 flex items-center justify-center p-0 ${colorClass}`}
                            >
                                <FaCirclePlus size={14} />
                            </button>

                            <div className={`w-full min-h-[90px] bg-white cursor-pointer font-semibold transition-opacity duration-200 rounded-lg flex items-center gap-3 p-2 relative border-l-4 ${bgClass}`}>
                                <img
                                    src={model.image}
                                    alt="model"
                                    className="w-20 h-20 object-cover rounded"
                                />
                                <div className="text-left flex-1 relative flex flex-col justify-center">
                                    <div className={`absolute top-0 right-0 w-5 h-5 ${colorClass}`}>
                                        {style.icon}
                                    </div>
                                    <p className="text-[25px] font-normal m-0 p-0">{model.name}</p>
                                    <p className="text-[10px] italic font-light m-0 p-0 capitalize">{model.menh}</p>
                                    <p className="text-[25px] flex items-center m-0 p-0">
                                        {model.price.toFixed(2)}$
                                        <span className={`ml-4 w-10 h-5 rounded-full flex items-center justify-center ${bgClass}`}>
                                            <FaCartPlus className="w-4 h-4 text-white" />
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-black/60 to-transparent flex justify-center items-end pointer-events-none">
                <MdKeyboardDoubleArrowDown className="w-[50px] h-[50px] text-[#01070f]" />
            </div>
        </div>
    );
}