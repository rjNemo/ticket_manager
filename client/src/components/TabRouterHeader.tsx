import React, { FC, useState } from "react";

interface TabUnitProps {
  tabClass: string;
  isActive: number;
  setIsActive: React.Dispatch<React.SetStateAction<number>>;
  text: string;
  value: string;
}

const TabUnit: FC<TabUnitProps> = ({
  tabClass,
  isActive,
  setIsActive,
  text,
  value
}) => {
  return (
    <li className={tabClass} key={value}>
      <a
        id={value}
        className={isActive === parseInt(value) ? "active" : ""}
        href={`#${text}`}
        onClick={() => setIsActive(parseInt(value))}
      >
        {text}
      </a>
    </li>
  );
};

interface IProps {
  tabClass?: string;
}

export const TabRouterHeader: FC<IProps> = ({
  tabClass = "tab col s3",

  children
}) => {
  const [isActive, setIsActive] = useState(1);

  //   const switchTab = (e: React.MouseEvent<HTMLAnchorElement>): void => {
  //     e.preventDefault();
  //     setIsActive(e.target.id);
  //   };

  return (
    <>
      <div className="col s12">
        <ul className="tabs">
          <TabUnit
            text="Tickets"
            value="1"
            tabClass={tabClass}
            isActive={isActive}
            setIsActive={setIsActive}
          />
          <TabUnit
            text="Files"
            value="2"
            tabClass={tabClass}
            isActive={isActive}
            setIsActive={setIsActive}
          />
          <TabUnit
            text="Activity"
            value="3"
            tabClass={tabClass}
            isActive={isActive}
            setIsActive={setIsActive}
          />
        </ul>
      </div>
    </>
  );
};
