import React from "react";

export default function Divider({ title }: { title: string }) {
    return (
        <div className="relative">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center">
                <span className="px-3 bg-white text-3xl uppercase font-medium text-gray-900 select-none">
                    {title}
                </span>
            </div>
        </div>
    );
};
