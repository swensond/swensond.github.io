import React from "react";
import HomeEducation from "./education";
import HomeExperience from "./experience";
import HomeSkills from "./skills";

export default function HomeView() {
    return (
        <>
            <HomeEducation />
            <HomeSkills />
            <HomeExperience />
        </>
    );
};
