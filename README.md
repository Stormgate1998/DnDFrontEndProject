# DnDFrontEndProject
Advanced Front End final project
Core Features:
### Nov 4
- [ ] Live production environment (live production environment)
- [ ] Automated linting in pipeline that aborts if it fails (auto linting)
- [ ] Create character sheet with race, class, stats, name, background, etc. (Network calls write data, local storage, page count)
- [ ] Implement health editing functionality in the character sheet. (Local storage, read/write data)

### Nov 11
- [ ] Implement Dice Roller on pages where relevant (component)
- [ ] Allow characters to level up with automatic adjustments. (network calls, local storage)
- [ ] Enable GM registration for creating empty parties. (network calls)
- [ ] Allow players to join a party with GM's permission, providing a character. (Toasts?, network calls)
- [ ] Enable party members to view a summary of characters (name, race, class, health).

### Nov 18
- [ ] Users can only view their characters/parties (authentication)
- [ ] Implement GM's acceptance/rejection of users or characters. (websockets)
- [ ] Implement dynamic health updates of party members through websockets. (websockets)
- [ ] Allow GM to request saving throws visible only to specific party members. (websockets)
- [ ] Error handling for network calls (error handling, toasts)
- [ ] Error handling for render errors (error handling, toasts)
- [ ] Automated testing (auto testing)

### Core Features Complete
***Once the above are done, core features will be complete 🎉🥳🎊🎈***

### Nov 25
- [ ] Register spells for spellcasting characters with levels, components, and descriptions.
- [ ] Implement inventory management, including racial or background items.
- [ ] Include feats for character customization.
- [ ] Implement party low-health alert.
- [ ] Create a character editor for changes like age, background, name, etc.

### Dec 2
- [ ] Add tooltips for clarity and explanation.
- [ ] Add a chat functionality for private messages between GM and users.
- [ ] Implement note-taking: GM's private notes and party-visible notes.
- [ ] Include additional party information (spell slots, status conditions, etc).

### Dec 9
- [ ] Create a 'Character Creation' page for monsters to be added to campaigns.
- [ ] Allow GM to toggle visibility of monsters' health.
- [ ] Enable point buy for stat assignment.
- [ ] (Major Stretch Goal) Optionally incorporate ChatGPT into character creation for background generation.

### Stretch Goals
- [ ] Allow multiclass characters.
- [ ] Include default monsters from the monster manual in party visibility.
- [ ] Restrict party screen availability to GM selection (Session establishment).


### Requirements
### Development and Infrastructure

- [ ] Implement Local Storage for client-side data persistence.
- [ ] Set up client-side state management using Redux or context.
- [ ] Integrate toasts/global notifications or alerts for user feedback.
- [ ] Implement comprehensive error handling for API requests and render errors.
- [ ] Develop and manage network calls for reading and writing data.
- [ ] Implement WebSocket functionality for real-time updates.
- [ ] Provide developer assistance with TypeScript.
- [ ] Design and implement a router for navigation with 10+ pages.
- [ ] Set up a CI/CD pipeline for automated testing and deployment.
- [ ] Enable HTTPS support for secure communication.
- [ ] Deploy and maintain a live production environment.

### Testing and Quality Assurance

- [ ] Implement automated testing in the CI/CD pipeline.
- [ ] Set up linting in the pipeline and abort the build if it fails.

### UI Components

- [ ] Develop 3+ generic form input components.
- [ ] Create 4+ generic layout components.

### User Management

- [ ] Implement authentication functionality.
- [ ] Support user accounts.

### Page Design and Structure

- [ ] Design and implement admin pages.
- [ ] Develop public pages.
