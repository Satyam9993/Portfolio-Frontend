import React, { useEffect, useState } from "react";
import EditSkill from "./EditSkills";

const SkillCard = ({ skill }) => {

  const [isEditing, setisEditing] = useState(false);

  const [color, setColor] = useState("yellow");
  const generateColor = () => {
    var colorList = [
      "blue",
      "cyan",
      "indigo",
      "green",
      "red",
      "yellow",
      "orange",
      "purple",
      "pink",
    ];
    setColor(colorList[Math.floor(Math.random() * colorList.length)]);
  };

  function monthsBetween(d1, d2) {
    let months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth() + 1;
    months += d2.getMonth();
    return months <= 0 ? 0 : months;
  }

  useEffect(() => {
    generateColor();
  }, []);

  return (
    <>
      <div
        className={`p-4 sm:w-full lg:w-1/2 w-full shadow-${color}-100 shadow-md ${!isEditing && "hover:scale-90 duration-300"}`}
      >
        <div className="flex justify-between mx-5 p-2">
          <div>
            <a href={skill.certificateurl || "#"} target="_blank">
              <span className={`text-${color}-500 text-xl font-bold mx-1 hover:text-blue-900`}>
                {skill.name}
              </span>
            </a>
            <h3
              className={`text-xl sm:text-md font-bold text-center`}
            >
              {skill.level}
            </h3>
            <p className="text-sm font-semibold text-gray-900">
              {skill.institution || "NA"}
            </p>
            <div className="text-sm font-medium">
              <div className="text-gray-700">Start Date:</div>
              <div className="text-gray-500">
                {new Date(skill.startDate).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </div>
            </div>
            <div className="text-sm font-medium mt-2">
              <div className="text-gray-500">
                {monthsBetween(
                  new Date(skill.startDate),
                  new Date(skill.endDate)
                )}{" "}
                Months
              </div>
            </div>
          </div>
          <div>
            <EditSkill skill={skill} setisEditing={setisEditing}/>
            <div
              className={`bg-gradient-to-tr from-${color}-500 to-${color}-400 w-32 h-32  rounded-full shadow-2xl shadow-${color}-400 border-white  border-dashed border-2  flex justify-center items-center`}
            >
              <div>
                <h1 className="text-white text-lg font-bold">{skill.name}</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SkillCard;
