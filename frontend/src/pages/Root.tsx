import { Outlet } from "react-router-dom";

const RootLayout: React.FC = () => {
  return (
    <>
      <main style={{margin: "20px"}}>
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;