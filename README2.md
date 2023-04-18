# SportSee User Profile Page

This is a site for SportSee's new user profile page. The page allows users to track the number of workout sessions completed and the number of calories burned, using various charts and visuals created mostly with the Recharts library. 

## Prerequisites

- Node.js
- Git
- Clone the repository for the API available at this URL: https://github.com/OpenClassrooms-Student-Center/P9-front-end-dashboard

## Installation

1. Clone the repository.
2. Open the project in your terminal and run the command `npm install`.
3. Create a `.env` file at the root of the project.
4. Define the API variable in the `.env` file with the following syntax: `REACT_APP_API_URL=http://localhost:3000`.
5. Start the project with the command `npm run start`.

### API Usage

To use the API, it is necessary to have cloned the API repository mentioned in the Prerequisites and to have started it locally (refer to the API README). On the home page, in addition to the choice of the data source, two links are available to the two only available profiles currently for testing. These profiles have a number used in the URL (`http://localhost:3001/profile/12` or `http://localhost:3001/profile/18`).

## Data Source

The home page allows you to select a data source to test this new profile page. You can select MOCK or API. If you select Mock, the data will come from a JSON file in the project. If you select API, calls will be made to retrieve the data from the API whose URL is defined in the `.env` file (`REACT_APP_API_URL=http://localhost:3000`). The library for API calls is Axios.

## Usage

To use the application, follow the steps in the Installation section.


## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
