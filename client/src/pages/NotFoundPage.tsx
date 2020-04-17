import React, { FC } from "react";
import PageLayout from "../layouts/PageLayout";
import { Header } from "../components/Header";

interface IProps {}
export const NotFoundPage: FC<IProps> = () => {
  return (
    <PageLayout
      header={<Header title="Error page" description="Something went wrong" />}
      content={<p>error</p>}
    />
  );
};
