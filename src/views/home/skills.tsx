import { motion } from "framer-motion";
import React from "react";
import Divider from "../../components/divider";
import { Tooltip } from "../../components/tooltip";

function SkillPill({ skill, type }: { skill: string; type: string }) {
    return (
        <Tooltip text={type}>
            <motion.li
                whileHover={{ scale: 1.05 }}
                className="select-none inline-block relative rounded-full py-3 px-6 bg-skill-pill ring-2 ring-skill-pill-ring text-white text-center shadow">
                {skill}
            </motion.li>
        </Tooltip>
    );
};

export default function HomeSkills() {
    return (
        <div className="pb-10">
            <Divider title="Skills" />
            <ul className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 mt-4 gap-4">
                {
                    [
                        ["C#", "Language"],
                        ["C++", "Language"],
                        ["Java", "Language"],
                        ["TypeScript", "Language"],
                        ["Python", "Language"],
                        ["PHP", "Language"],
                        ["Go", "Language"],
                        ["React", "Framework"],
                        ["Backbone.js", "Framework"],
                        ["Bootstrap", "Framework"],
                        ["Django", "Framework"],
                        ["Laravel", "Framework"],
                        ["Selenium", "Framework"],
                        ["Symfony", "Framework"],
                        ["Docker", "Containerization"],
                        ["AWS", "Services"],
                        ["VMware", "Containerization"],
                        ["Hyper-V", "Containerization"],
                        ["Apache Aurora", "Containerization"],
                        ["PostgreSQL", "Database Technology"],
                        ["Cassandra", "Database Technology"],
                        ["DynamoDB", "Database Technology"],
                        ["AWS Aurora", "Database Service"],
                        ["Redis", "Database Technology"],
                        ["MariaDB", "Database Technology"],
                        ["MongoDB", "Database Technology"],
                        ["Linux", "Operating System"],
                        ["Windows", "Operating System"],
                        ["MacOS", "Operating System"],
                    ].map(([skill, type], i) => <SkillPill skill={skill} type={type} key={i} />)
                }
            </ul>
        </div>
    );
};
