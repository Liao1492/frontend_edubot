import { createTheme, MantineProvider, Title, Flex } from "@mantine/core";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
  Routes,
} from "react-router-dom";
import classes from "./styles/Theme.module.scss";
import Login from "./routes/login";
import Sidebar from "./Components/Sidebar";
import { useLocation } from "react-router-dom";
import ErrorPage from "./routes/error-page";
import Index from "./routes/Index";
import Dashboard from "./routes/dashboard";

// const router = createBrowserRouter(createRoutesFromElements());

const App = () => {
  const pathname = useLocation().pathname;
  const theme = createTheme({
    fontFamily: "Helvetica",
    components: {
      Title: Title.extend({ classNames: { root: classes.heading } }),
    },
    fontSizes: {
      xs: "1.4rem",
      sm: "1.6rem",
      md: "1.8rem",
      lg: "2rem",
      xl: "2.4rem",
    },
  });
  return (
    <MantineProvider theme={theme}>
      <Flex h={"100%"}>
        {pathname === "/" && <Sidebar />}

        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
        {/* <RouterProvider router={router} /> */}
      </Flex>
    </MantineProvider>
  );
};

export default App;
