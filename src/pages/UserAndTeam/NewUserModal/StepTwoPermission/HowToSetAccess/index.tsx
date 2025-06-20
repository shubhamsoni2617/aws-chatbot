import { useState } from "react";
import { LuPanelsTopLeft, LuSettings } from "react-icons/lu";
// import { LuSettings, LuPanelsTopLeft } from "react-icons/lu";
import { FiEdit } from "react-icons/fi";

const HowToSetAccess = () => {
    const [selected, setSelected] = useState<string | null>(null);

    const handleOptionClick = (option: string) => {
        setSelected(option);
        console.log(`Selected option: ${option}`);
    };

    return (
        <div>
            {[
                {
                    key: "custom_permission",
                    icon: <LuSettings size={40} strokeWidth={0.7} />,
                    title: "Use a custom permission set",
                    description: "Give an existing custom permission set or assign Super Admin access.",
                },
                {
                    key: "template",
                    icon: <LuPanelsTopLeft size={40} strokeWidth={0.7} />,
                    title: "Start with a template",
                    description: "Copy another user’s permissions or use a suggested set of permissions based on common roles.",
                },
                {
                    key: "scratch",
                    icon: <FiEdit size={40} strokeWidth={0.7} />,
                    title: "Start from scratch",
                    description: "Create permissions specifically for this user.",
                },
            ].map(({ key, icon, title, description }) => (
                <div
                    key={key}
                    onClick={() => handleOptionClick(key)}
                    className={`flex gap-[16px] border-[1px] rounded-[12px] p-[20px] items-center mb-[16px] cursor-pointer 
                        ${selected === key ? "border-[#c847e8] text-[#c847e8]" : "border-[#cbd5e1] text-black"}`}
                >
                    <div className={`${selected === key ? "text-[#c847e8]" : ""}`}>{icon}</div>
                    <div>
                        <div className="font-[700] text-[14px]">{title}</div>
                        <div className="font-[400] text-[14px]">{description}</div>
                    </div>
                </div>
            ))}
            <hr />
        </div>
    );
};

export default HowToSetAccess;
