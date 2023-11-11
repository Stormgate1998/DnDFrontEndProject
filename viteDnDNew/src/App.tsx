import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { CharacterMaker } from "./pages/CharacterMaker";
import { CharacterViewer } from "./pages/CharacterViewer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UserCharacterList } from "./pages/UserCharacterList";
const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <CharacterMaker />,
  },
  {
    path: "/character",
    element: <UserCharacterList />,
  },
  {
    path: "/character/:characterId",
    element: <CharacterViewer/>,
  },
]);
export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        {/* <Navbar/> */}
        <RouterProvider router={router} />
      </div>
    </QueryClientProvider>
  );
};
