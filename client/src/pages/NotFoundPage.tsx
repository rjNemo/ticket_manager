import React, { FC } from "react";
import PageLayout from "../layouts/PageLayout";
import Header from "../components/Header";

const NotFoundPage: FC = () => {
  return (
    <PageLayout
      header={<Header title="Error page" description="Something went wrong" />}
      content={<p>error</p>}
    />
  );
};

export default NotFoundPage;
