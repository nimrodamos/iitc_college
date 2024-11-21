import { Outlet } from "react-router-dom";

const articles = () => {
  return (
    <>
      <h1>this is Articles Page</h1>
      <Outlet />
    </>
  );
};

export default articles;
