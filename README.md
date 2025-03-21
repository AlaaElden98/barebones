# Pet Profile App - React Native Coding Test


## Additional dependencies added
- @react-navigation/bottom-tabs
- @supabase/supabase-js
- @react-native-async-storage/async-storage

## Assumptions / Decisions
- I added `.env` file to `.gitignore`, I assume you don't need it, but if you do please reach out.
- The requirements didn't mention Auth flow, but DB schema seem to be depending on it, so I just implement [Supbase example](https://supabase.com/docs/guides/getting-started/tutorials/with-expo-react-native?queryGroups=auth-store&auth-store=async-storage#set-up-a-login-component) with modifications.
- The requirement state a Tabbed interface should be implemented with 3 infos about a "Pet", but didn't see anything related to "Pet" implementation, so I decided to implement "Pets" screen to, project structure will clarify more (as I hope).

## Project Demo
https://github.com/user-attachments/assets/bdb583a9-2f36-4f49-8da8-f0db1b150eb9

## Project flow
- Authentication -> First time users open the app, they will be asked to Sign in/up, then they will be logged in automatically
- Pet -> First screen is Pets Profiles screen, which list all user Pets, and a button on the bottom to add a new Pet
- Pet -> When user presses on a Pet card, they navigated to a screen with 3 bottom tabs (Weight Logs, Body Condition, Vet Visits)
- Logs -> Each tab logs different informations, but they almost have the same structure, so the three tabs are almost the same in terms of UI, UX, and components used

## Somethings I wanted to do
- Use pagination with fetching data
- Write unit test for functions
- Complete CRUD operations on each table (Update and delete pets)
- Generate builds for you to check the app on your phone
