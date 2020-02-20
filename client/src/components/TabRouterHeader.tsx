import React, { FC, useState } from "react";
import { Link, useRouteMatch } from "react-router-dom";

interface IProps {
  tabClass?: string;
  tabNames: string[];
}

export const TabRouterHeader: FC<IProps> = ({
  tabClass = "tab col s4",
  tabNames
}) => {
  const [isActive, setIsActive] = useState(0);
  const nTabs = tabNames.length;
  return (
    <>
      <ul className="tabs z-depth-1">
        {tabNames.map((name, i) => (
          <TabUnit
            key={i}
            text={name}
            value={i.toString()}
            tabClass={tabClass}
            isActive={isActive}
            setIsActive={setIsActive}
            nTabs={nTabs}
          />
        ))}
        <li
          className="indicator"
          style={{
            left: `${(isActive / nTabs) * 100}%`,
            right: `${(1 - (isActive + 1) / nTabs) * 100}%`
          }}
        ></li>
      </ul>
    </>
  );
};

interface TabUnitProps {
  tabClass: string;
  isActive: number;
  setIsActive: React.Dispatch<React.SetStateAction<number>>;
  text: string;
  value: string;
  nTabs: number;
}

const TabUnit: FC<TabUnitProps> = ({
  tabClass,
  isActive,
  setIsActive,
  text,
  value,
  nTabs
}) => {
  const { url } = useRouteMatch();
  return (
    <li
      className={tabClass}
      key={value}
      style={{
        left: `${(isActive / nTabs) * 100}%`,
        right: `${(1 - (isActive + 1) / nTabs) * 100}%`
      }}
    >
      <Link
        to={`${url}/${text}`}
        id={value}
        className={isActive === parseInt(value) ? "active pink lighten-5" : ""}
        onClick={() => setIsActive(parseInt(value))}
      >
        {text}
      </Link>
    </li>
  );
};
