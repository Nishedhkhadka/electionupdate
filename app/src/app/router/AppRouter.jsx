import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { routes } from "./routes";
import { lazyPages } from "./pageLoaders";
import Loading from "./Loading";

export default function AppRouter() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/map" element={<lazyPages.Map />} />
        {routes.map(({ path, pageName }) => {
          const Page = lazyPages[pageName];
          if (!Page) {
            return null;
          }
          return <Route key={path} path={path} element={<Page />} />;
        })}
      </Routes>
    </Suspense>
  );
}
