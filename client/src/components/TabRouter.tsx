import React, { FC } from "react";
import { TabRouterHeader } from "./TabRouterHeader";

interface IProps {}
export const TabRouter: FC<IProps> = ({ children }) => {
  return (
    <>
      <div className="row">
        <TabRouterHeader />
        <div id="test1" className="col s12">
          Tickets
        </div>
        <div id="test2" className="col s12">
          Files
        </div>
        <div id="test3" className="col s12">
          Activity
        </div>
      </div>
    </>
  );
};
