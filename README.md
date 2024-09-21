# NPM Clone Oriserve Assignment
This project is a web application built with Next.js that allows users to explore version-specific details of NPM packages. Users can view metadata, dependencies, publish time, and distribution information for specific versions of any NPM package by interacting with the UI.

## Features
- Package Specific pages
- Version Listing
- Version Details
- Dynamic Routing

## Tech Stack
- NextJS
- React
- Tailwind CSS
- NPM Registry API

## Getting Started
1) Clone the repo:
   ```
   git clone https://github.com/itisohm/oriserve.git
   ```
2) Navigate to project directory:
   ```
   cd oriserve
   ```
3) Install dependencies:
   ```
   npm install
   # or
   yarn install
   ```
4) Run the development server:
   ```
   npm run dev
   # or
   yarn dev
   ```

   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Usage
1) Enter the NPM package name in the homepage's input field.
2) The app will fetch and display all available package in a clickable list.
3) Click on any package to view detailed information including:
   - Readme
   - Dependencies for that package
   - Publish time
   - Versions available
   - Installation guide
   - And a lot more metadata.
4) Visit the versions page and click on any version to see version specific information including:
   - Version metadata
   - Dependencies for that version
   - Publish time
   - Distribution details (Tarball URL and SHA checksum)

## Future Improvements:
- Pagination for large number of packages or versions.
- Enhanced UI like animations.

## Known Issues:
Currently, the project does not implement error handling for invalid version names.
