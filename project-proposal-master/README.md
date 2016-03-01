# GoalQuest

[Heroku link][heroku] **NB:** This should be a link to your production site

[heroku]: http://www.herokuapp.com

## Minimum Viable Product

GoalQuest is a web application inspired by HabitRPG built using Ruby on Rails
and React.js. FresherNote allows users to:

<!-- This is a Markdown checklist. Use it to keep track of your
progress. Put an x between the brackets for a checkmark: [x] -->

- [x] Create an account
- [x] Log in / Log out
- [ ] Create, read, edit, and delete habits, to-dos, daily tasks, and rewards
  - [ ] Display to-dos
  - [ ] Delete to-dos
  - [ ] Create new to-dos
  - [ ] Edit to-dos
- [ ] Organize tasks and to-dos by importance and frequency

* Avatar/Items
- [ ] Ability to create a player avatar from different presets
- [ ] Create a gold management system, with the ability to "buy" rewards
- [ ] Ability to purchase armor, awards from different shops
- [ ] Create Armor and item menu

* Styling
- [ ] Create shuffling cards
- [ ] Create a more interesting sidebar
- [ ] More navbar stylings

* Game logic
- [ ] Create health points and experience for player
- [ ] Reward/punish the player for completing/failing to complete certain tasks

## Design Docs
* [View Wireframes][views]
* [React Components][components]
* [Flux Stores][stores]
* [API endpoints][api-endpoints]
* [DB schema][schema]

[views]: ./docs/views.md
[components]: ./docs/components.md
[stores]: ./docs/stores.md
[api-endpoints]: ./docs/api-endpoints.md
[schema]: ./docs/schema.md

## Implementation Timeline

### Phase 1: Backend setup and User Authentication (0.5 days)

**Objective:** Functioning rails project with Authentication

- [ ] create new project
- [ ] create `User` model
- [ ] authentication
- [ ] user signup/signin pages
- [ ] blank landing page after signin

### Phase 2: Task/To-Dos/Dailies Model, API, and basic APIUtil (1.5 days)

**Objective:** Tasks can be created, read, edited and destroyed through
the API.

- [ ] create `Task` model
- [ ] seed the database with a small amount of test data
- [ ] CRUD API for notes (`TasksController`)
- [ ] jBuilder views for tasks
- [ ] setup Webpack & Flux scaffold
- [ ] setup `APIUtil` to interact with the API
- [ ] test out API interaction in the console.
- [ ] Repeat for 'ToDo' and 'Daily Task' models

### Phase 3: Flux Architecture and Router (1.5 days)

**Objective:** Tasks can be created, read, edited and destroyed with the
user interface.

- [ ] setup the flux loop with skeleton files
- [ ] setup React Router
- implement each note component, building out the flux loop as needed.
  - [ ] `TasksIndex`
  - [ ] `TaskIndexItem`
  - [ ] `TaskForm`
- [ ] save Tasks to the DB when the form loses focus or is left idle
  after editing.
- [ ] Repeat for 'ToDo' and 'Daily Task'

### Phase 4: Start Styling (1 day)

**Objective:** Existing pages (including singup/signin) will look better

- [ ] create a basic style guide
- [ ] position elements on the page
- [ ] add basic colors & styles

### Phase 5: Organization (1.5 days)

**Objective:** Tasks can be ordered by tags, importance, or frequency

- [ ] create `Tag` model and join table
- build out API, Flux loop, and components for:
  - [ ] fetching tags
  - [ ] adding tags
  - [ ] creating tags
  - [ ] searching by tag
- [ ] Allow tasks to be given a level of importance by a user
- [ ] Allow tasks to be ordered by importance
- [ ] Style new elements

### Phase 7: Allow Complex Styling in Tasks (0.5 days)

**objective:** Enable complex styling of tasks.

- [ ] Integrate `react-quill` (based on Quill.js).
- [ ] Use Rails helpers to sanitize HTML before rendering.
- [ ] Style the new Quill elements.

### Phase 8: Avatar and Rewards System (1.5 days)

**objective:** Enable avatar creation by user and rewards purchased with gold

- [ ] Create new 'Avatar' model
- [ ] Enable acquiring gold after each completed task
- [ ] Create new rewards
- [ ] Seed database with different items and avatar combinations
- [ ] Style new elements

### Phase 9: Styling Cleanup and Seeding (1 day)

**objective:** Make the site feel more cohesive and awesome.

- [ ] Get feedback on my UI from others
- [ ] Refactor HTML classes & CSS rules
- [ ] Add modals, transitions, and other styling flourishes.

### Bonus Features (TBD)
- [ ] Create health and experience for user
- [ ] Reward/punish user based on tasks completed/uncompleted
- [ ] Set reminders on tasks
- [ ] Assign each task a frequency (based on # times performed)
- [ ] Tag tasks and to-dos with tags

[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
[phase-five]: ./docs/phases/phase5.md
