import { useState } from "react";
import { FaCirclePlus, FaFire } from "react-icons/fa6";
import { FaCartPlus } from "react-icons/fa";
import { MdKeyboardDoubleArrowDown } from "react-icons/md";
import { FaSearch, FaFilter } from "react-icons/fa";

export default function Sidebar({ addModel }) {
    const [search, setSearch] = useState("");

    const models = [
        {
            id: "ghe",
            name: "chair.glb",
            price: 15.00,
            image: "https://placehold.co/60x60",
        },
        {
            id: "tu",
            name: "wardrobe.glb",
            price: 25.10,
            image: "https://placehold.co/60x60",
        },
        {
            id: "giuong",
            name: "indoor plant_02.obj",
            price: 35.00,
            image: "https://placehold.co/60x60",
        },
    ];

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

                {filtered.map((model) => (
                    <div key={model.id} className="relative mb-3">
                        {/* Nút dấu cộng */}
                        <button
                            onClick={() => addModel(model.name)}
                            className="absolute -top-2.5 -left-2.5 w-5 h-5 rounded-full border-none font-bold z-10 flex items-center justify-center p-0"
                        >
                            <FaCirclePlus className="text-[rgb(93,0,0)]" size={14} />
                        </button>

                        <div className="w-full min-h-[90px] bg-white cursor-pointer font-semibold transition-opacity duration-200 rounded-lg flex items-center gap-3 p-2 relative">
                            <img
                                src={model.image}
                                alt="model"
                                className="w-20 h-20 object-cover rounded"
                            />
                            <div className="text-left flex-1 relative flex flex-col justify-center">
                                <FaFire className="absolute top-0 right-0 w-5 h-5 text-[rgb(93,0,0)]" />
                                <p className="text-[25px] font-normal m-0 p-0">{model.name}</p>
                                <p className="text-[10px] italic font-light m-0 p-0">gì đấy</p>
                                <p className="text-[25px] flex items-center m-0 p-0">
                                    {model.price.toFixed(2)}$
                                    <span className="bg-[rgb(93,0,0)] w-10 h-5 rounded-full flex items-center justify-center ml-4">
                                        <FaCartPlus className="w-4 h-4 text-white" />
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                ))}

            </div>

            <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-black/60 to-transparent flex justify-center items-end pointer-events-none">
                <MdKeyboardDoubleArrowDown className="w-[50px] h-[50px] text-[#01070f]" />
            </div>
        </div>
    );
}