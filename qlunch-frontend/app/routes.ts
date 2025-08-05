import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("sign-in", "routes/signin.tsx"),
    route("sign-up", "routes/signup.tsx")
] satisfies RouteConfig;
