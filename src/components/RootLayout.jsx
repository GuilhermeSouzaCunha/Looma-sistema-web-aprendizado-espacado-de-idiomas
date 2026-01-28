import { Outlet } from "react-router-dom";
import HeaderApp from "./HeaderApp.jsx";

export default function RootLayout() {
    return (
        <>
            <HeaderApp />
            <Outlet />
        </>
    );
}
