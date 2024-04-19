import { Routes, Route } from "react-router-dom";
import { routerType } from "../types.ts/router.types";
import routerData from "./routerData";

const CustomRouter = () => {
    const pageRoutes = routerData.map(({ path, title, element }: routerType) => (
        <Route key={title} path={`/${path}`} element={element} />
    ));
    return <Routes>{pageRoutes}</Routes>;
};

export default CustomRouter;
