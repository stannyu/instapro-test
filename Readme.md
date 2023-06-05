# React Task Management Board

This application, developed entirely in React.js, emulates the functionality of a task management board similar to Trello. It does not rely on third-party libraries and offers a user-friendly interface, with tasks represented as cards that can be managed via a drag-and-drop mechanism across different columns.

## Core Features

- **Column Creation:** New columns can be created.
- **In-place Renaming of Columns:** Existing columns can be renamed on the spot.
- **Task Card Creation:** New task cards can be created.
- **Card Details:** A modal presents details of the card.
- **Card Deletion:** Cards can be deleted from within the card details modal.
- **Shallow Routing:** Shallow routing is implemented for sharing links to the card details modal.
- **Local Storage:** The state of the board is managed using local storage.
- **Drag-and-drop:** Cards can be moved between columns using drag-and-drop (note: the order of cards within a column cannot be modified).

## Application Architecture

The primary component of the application is the `Board` component. It maintains the state of the board and is responsible for implementing the majority of the application's features. This includes creating and moving columns and cards, as well as updating the state in local storage.

The `Board` component uses several child components to construct the UI:

- **`Column`:** Represents a column on the board. It displays a list of cards and allows for the addition of new cards. The title of the column can be edited by clicking on it.
- **`Card`:** Represents a task card. It can be moved to a different column using drag-and-drop. Clicking on the card opens a modal with more information about the task.
- **`CardDetailsModal`:** This modal displays detailed information about a task card. The card can be deleted from within this modal.
- **`ColumnTitle`:** Allows for in-place editing of the column title. Clicking on the title transforms it into an input field, enabling the user to type a new title. Pressing 'Enter' applies the new title, while 'Escape' cancels the edit.
- **`CardAddModal`:** This modal opens when the "Add Card" button in a column is clicked, allowing the user to create a new card.

Routing within the `Board` component is facilitated by React Router. The routes are defined within the `App` component. Two routes are available: the main board view (`/`) and the card details view (`/:cardId`). The card details view is implemented as a modal overlaying the main board view.

## Local Storage

The application leverages local storage to persist the state of the board. This enables the user to refresh the page or reopen the browser without losing any tasks. The state is automatically saved to local storage upon any change. This state includes the columns and their titles, the cards and their details, and the order of the cards within each column.

## Drag and Drop

The application employs the HTML5 Drag and Drop API to implement dragging and dropping of cards between columns. Each `Card` component is draggable, while each `Column` component acts as a drop zone. When a card is dropped into a column, the application's state is updated to reflect the new location of the card.

## Installation and Execution

To install and run the application:

1. Clone this repository to your local machine.
2. Navigate to the repository folder in your terminal.
3. Run `pnpm install` to install the necessary dependencies.
4. Run `pnpm start` to start the application.
5. Open your web browser and navigate to `http://localhost:5173/` to view the application.

**Note:** This application was developed using vite react-ts, thus the commands and the development server are provided by vite.

## Note

While the functionality of the React Task Board is robust, it's important to understand that the primary focus of this project lies in the functionality and reusability of components. Some aspects of the application are intentionally limited due to this focus and time constraints:

**Styling**: While the application does have a minimalistic and user-friendly design, it doesn't heavily focus on advanced styling techniques like BEM, CSS variables, or mixins.

**UI Design**: The UI design of the app is basic and functionality-oriented, rather than being focused on aesthetic or visual design principles.

**Unit Testing**: Due to time constraints, unit tests have not been incorporated into this project. However, the application has been built with best practices in mind, making it very testable should unit tests be added in the future.