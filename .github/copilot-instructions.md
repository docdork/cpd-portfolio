# CPD Portfolio Instructions

## Commands

- Install dependencies: `npm ci`
- Start Expo's development server: `npm start`
- Start a platform-specific Expo session: `npm run android`, `npm run ios`, or `npm run web`
- Type-check the TypeScript source: `npx tsc --noEmit`
- Create native builds with the profiles in `eas.json`: `npx eas build --profile development`, `npx eas build --profile preview`, or `npx eas build --profile production`

There is no configured test runner, test suite, lint command, or single-test command.

## Architecture

- This is an Expo React Native app. `index.ts` registers `App.tsx`, which owns the React Navigation drawer. Add every drawer route to both `router.ts` (`Routes`) and the `Drawer.Navigator` in `App.tsx`.
- Screens in `Pages/` own their local UI state and modal visibility. `HomeScreen` has a presentation-only login state, and `PersonalDetailsScreen` keeps editable details in component state; neither persists data or performs authentication.
- The CPD flow calls the deployed REST API directly:
  - `CPDInputScreen` `POST`s a selected competence and `DateType` expiry date to `/api/competencies`.
  - `CPDListScreen` fetches `/api/competencies`, normalizes either `id` or `_id` to its required `Competency.id`, and turns `expDate` strings into `Date` instances.
  - Selecting a list item opens a modal that `PATCH`es its expiry date or `DELETE`s it. Refetch the list after either mutation. The list also refetches when its drawer route gains focus.
- `Components/Card.tsx` displays a competency and applies expiry status: red when expired, yellow when its expiry is within 90 days, otherwise green. Keep `expDate` as a `Date` before passing it to this component.
- `styles.js` is the shared visual style sheet for screens. `Card.tsx` defines its own card-specific styles, while `Logo.tsx` contains the SVG logo.

## Conventions

- Keep API payload keys aligned with the backend contract: `title` and `expDate`; use the existing Heroku API base URL unless the backend integration is being intentionally changed.
- Use `react-native-ui-datepicker` with `locale="en-GB"`, `mode="single"`, and `useDefaultStyles()` in screens that edit expiry dates. Its selected value is `DateType`, not necessarily a native `Date`.
- Use the shared dark/navy, cyan, and green palette through `styles` and the existing pressed-state `Pressable` patterns. Preserve the Expo Reanimated Babel plugin when changing Babel configuration.
- TypeScript is strict (`tsconfig.json` extends Expo's base config). The repository mixes TypeScript/TSX application files with the shared JavaScript `styles.js`; retain that import pattern rather than duplicating screen styles.
