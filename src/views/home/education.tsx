import React from "react";
import Divider from "../../components/divider";

export default function HomeEducation() {
    return (
        <div>
            <Divider title="Education" />
            <ul className="divide-y divide-gray-200">
                <li className="py-4">
                    <div className="flex space-x-3">
                        <div className="flex-1 space-y-1">
                            <div className="flex items-center justify-between">
                                <h3 className="text-md">
                                    Wentworth Institute of Technology
                                    </h3>
                                <p className="text-sm text-gray-500">
                                    2011 - 2015
                                    </p>
                            </div>
                            <p className="text-sm text-gray-500">
                                Bachelor of Science in Computer Networking
                                </p>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    );
};
