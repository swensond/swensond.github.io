import React from "react";
import Divider from "../../components/divider";

export default function HomeExperience() {
    return (
        <div>
            <Divider title="Experience" />
            <ul className="divide-y divide-gray-200">
                <li className="py-4">
                    <div className="flex space-x-3">
                        <div className="flex-1 space-y-1">
                            <div className="flex items-center justify-between">
                                <h3 className="text-md">Software Engineer</h3>
                                <p className="text-sm text-gray-500">August 2019 - Present</p>
                            </div>
                            <p className="text-sm text-gray-500">Evive Health LLC</p>
                        </div>
                    </div>
                    <div>
                        <ul className="w-9/12 ml-5 mt-4 list-disc list-outside space-y-2 text-gray-500">
                            <li>Python, Java, C#, and TypeScript development</li>
                            <li>Introduced TypeScript into the backend development process</li>
                            <li>Assisted in introducing AWS CloudFormation for orchestration</li>
                            <li>Assisted in designing and implementing serverless architecture</li>
                            <li>Assisted in lifting internal tooling from Rackspace to AWS</li>
                            <li>Assisted in implementing GoCD into the development flow</li>
                            <li>Assisted in implementing a modern accessibility friendly frontend</li>
                        </ul>
                    </div>
                </li>
                <li className="py-4">
                    <div className="flex space-x-3">
                        <div className="flex-1 space-y-1">
                            <div className="flex items-center justify-between">
                                <h3 className="text-md">Jr. Software Engineer</h3>
                                <p className="text-sm text-gray-500">November 2015 - July 2019</p>
                            </div>
                            <p className="text-sm text-gray-500">WiserTogether Inc</p>
                        </div>
                    </div>
                    <div>
                        <ul className="w-9/12 ml-5 mt-4 list-disc list-outside space-y-2 text-gray-500">
                            <li>Python, PHP, Java, and TypeScript development</li>
                            <li>Introduced TypeScript into the frontend development process</li>
                            <li>Assisted in containerization of backend services from OpenShift to Aurora Apache</li>
                            <li>Retooled build from to move from Travis to Jenkins</li>
                            <li>Assisted in designing and implementing a public facing API service</li>
                            <li>Developed and managed a Cordova based mobile application for an iOS and Android version of mywiserhealth.com</li>
                            <li>Assisted in migration from Adobe's analytics platform to a private hosted Matomo</li>
                        </ul>
                    </div>
                </li>
                <li className="py-4">
                    <div className="flex space-x-3">
                        <div className="flex-1 space-y-1">
                            <div className="flex items-center justify-between">
                                <h3 className="text-md">Software Engineer Intern</h3>
                                <p className="text-sm text-gray-500">January 2014 - December 2014</p>
                            </div>
                            <p className="text-sm text-gray-500">Continuum Managed Services LLC</p>
                        </div>
                    </div>
                    <div>
                        <ul className="w-9/12 ml-5 mt-4 list-disc list-outside space-y-2 text-gray-500">
                            <li>PHP, and JavaScript development</li>
                            <li>Assisted in design, creation, and update of the Continuum Cloud Console (C3) and Sync247</li>
                            <li>Worked on expanding C3 to include other cloud providers while assisting other intern team members in learning RESTFUL API development processes</li>
                        </ul>
                    </div>
                </li>
            </ul>
        </div>
    );
};
