Use of Local Storage:
Main use in src/pages/UserPage.tsx, line 27
Matches src/App.tsx, line 100
Client side state stores (e.g. redux or context)
src/DarkModeContext.tsx, or WebsocketChatContext.tsx
App.tsx or PartyViewer.tsx, respectively
Toasts / global notifications or alerts
Noted throughout, kinda blatent 
Error handling (both on api requests and render errors)
Every page has an error tag.
Network Calls
read data
write data
websocket
For all 3, go to PartyViewer.tsx
Last I checked Websockets was not working for Unknown Reasons


Developer type helping (typescript)
Of course
10+ pages via a router
App.tsx

CI/CD pipeline
https support
Live production environment

https://dndbarlowproject.duckdns.org:2001/

Automated testing and linting in the pipeline (abort build if fails)

Just check dockerfile

3+ reusable form input components
src/Input, take your pick

4+ reusable layout components
src/Display

authentication and user account support
admin pages and public pages

No admin, but keycloak is set up. Unfortunately I have to manually approve any email.