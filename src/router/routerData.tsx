import { routerType } from "../types.ts/router.types";
import Signup from '../pages/Signup'

const routerData: routerType[] = [
    {
        path: "",
        element: <Signup />,
        title: "Signup",
    },
];

export default routerData;