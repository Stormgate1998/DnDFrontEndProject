import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useAuth } from "react-oidc-context";
import { CharacterMaker } from "./pages/CharacterMaker";
import { CharacterViewer } from "./pages/CharacterViewer";
import { UserCharacterList } from "./pages/UserCharacterList";
import GmParties from "./pages/GmParties";

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
  {
    path: "/gmGames",
    element: <GmParties />,
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
          Hello {auth.user?.profile.sub}{" "}
          <button
            className="btn btn-primary"
            onClick={() => void auth.removeUser()}
          >
            Log out
          </button>
          <RouterProvider router={router} />
        </div>
      </QueryClientProvider>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <button
          className="btn btn-primary"
          onClick={() => void auth.signinRedirect()}
        >
          Log in
        </button>
        <div>Please Log in to access the website</div>
      </div>
    </QueryClientProvider>
  );
};
