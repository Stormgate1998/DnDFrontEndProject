import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useAuth } from "react-oidc-context";
import { CharacterMaker } from "./pages/CharacterMaker";
import { CharacterViewer } from "./pages/CharacterViewer";
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
    element: <CharacterViewer />,
  },
]);

export const App = () => {
  const auth = useAuth();

  switch (auth.activeNavigator) {
    case "signinSilent":
      return <div>Signing you in...</div>;
    case "signoutRedirect":
      return <div>Signing you out...</div>;
  }

  if (auth.isLoading) {
    return <div>Loading...</div>;
  }

  if (auth.error) {
    return <div>Oops... {auth.error.message}</div>;
  }

  if (auth.isAuthenticated) {
    return (
      <QueryClientProvider client={queryClient}>
        <div className="App">
          {/* Your other components go here */}
          <RouterProvider router={router} />
          Hello {auth.user?.profile.sub}{" "}
          <button onClick={() => void auth.removeUser()}>Log out</button>
        </div>
      </QueryClientProvider>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        {/* Your other components go here */}
        <RouterProvider router={router} />
        <button onClick={() => void auth.signinRedirect()}>Log in</button>
      </div>
    </QueryClientProvider>
  );
};
