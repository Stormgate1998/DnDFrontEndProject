import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useAuth } from "react-oidc-context";
import { CharacterMaker } from "./pages/CharacterMaker";
import { CharacterViewer } from "./pages/CharacterViewer";
import { UserCharacterList } from "./pages/UserCharacterList";
import GmParties from "./pages/GmParties";
import Navbar from "./components/NavBar";
import { UserPage } from "./pages/UserPage";
import { PartyViewer } from "./pages/PartyViewer";
import { useDarkMode } from "./useDarkMode";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Navbar />
        <CharacterMaker />
      </>
    ),
  },
  {
    path: "/character",
    element: (
      <>
        <Navbar />
        <UserCharacterList />
      </>
    ),
  },
  {
    path: "/character/:characterId",
    element: (
      <>
        <Navbar />
        <CharacterViewer />
      </>
    ),
  },
  {
    path: "/gmGames",
    element: (
      <>
        <Navbar />
        <GmParties />
      </>
    ),
  },
  {
    path: "/yourPage",
    element: (
      <>
        <Navbar />
        <UserPage />
      </>
    ),
  },
  {
    path: "/gamePage/:partyId_characterId",
    element: (
      <>
        <Navbar />
        <PartyViewer />
      </>
    ),
  },
]);

export const App = () => {
  const auth = useAuth();
  const { darkMode, toggleDarkMode } = useDarkMode();
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
    const preferredName = localStorage.getItem("Preferred");
    return (
      <QueryClientProvider client={queryClient}>
        <div className="App">
          Hello{" "}
          {preferredName && preferredName.length > 0
            ? preferredName
            : auth.user?.profile.name}
          <button
            className={
              darkMode ? "btn btn-secondary m-3" : "btn btn-primary m-3"
            }
            onClick={() => void auth.removeUser()}
          >
            Log out
          </button>
          <button
            onClick={toggleDarkMode}
            className={
              darkMode ? "btn btn-primary m-3" : "btn btn-secondary m-3"
            }
          >
            {darkMode ? "Switch to Green Mode" : "Switch to Blue Mode"}
          </button>
          <RouterProvider router={router} />
        </div>
      </QueryClientProvider>
    );
  }
  // auth.user?.profile.sub;
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <button
          className={darkMode ? "btn btn-secondary m-3" : "btn btn-primary m-3"}
          onClick={() => void auth.signinRedirect()}
        >
          Log in
        </button>
        <button
          className={darkMode ? "btn btn-primary m-3" : "btn btn-secondary m-3"}
          onClick={toggleDarkMode}
        >
          {darkMode ? "Switch to Green Mode" : "Switch to Blue Mode"}
        </button>
        <div>{darkMode.toString()}</div>
        <div>Please Log in to access the website</div>
      </div>
    </QueryClientProvider>
  );
};
