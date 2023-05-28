# Project Information Board (Offline version)

The aim of PIB is to help developers and other specialists in IT to consolidate all project related information in one board, apply and keep track of Agile methods (Scrum and Kanban for the moment), reduce the time they need to search in different folders and online resources for the requested information.

⚠️ All inputted information and selected buttons state is stored in "local storage" of the web browser. Be careful to make a "Backup Local Storage" in the "Configuration" menu each time before cleaning the cache of the browser.

1. Download PIB and paste the "pib" folder in the root folder of your project.
2. To start the PIB, open the index.html file in the "pib" folder.
3. Choose "Configuration" at the top-right corner and select one of the available Agile methods. After selection, the button will be locked. If there's an error, clear the browser cache and try again.
4. To add online URLs, PDFs, texts, words, CSVs, or other types of files shared from different hostings, copy and paste the URL as a "resource" in the "Configuration" > "Add resource button". Then choose the position (left or right window from selector), color, and name for the button. After this, clicking on the corresponding button will display the PDF or resource in the selected window. Please check CORS rules, as many sites prohibit redirection.
5. To add local PDFs, texts, words, CSVs, or other types of files to the buttons and access them with a click, they must have a URL starting from "localhost". Place your documents in the "resources" folder or anywhere on your PC. Add the "Allow access to local files" extension to Chrome. Right-click on the file, choose "Open with Chrome" or another browser. Once the file is opened in the browser, replace "/var/www/" with "localhost" in the URL (e.g., `file:///var/www/book/pdf/back/Java%208%20in%20Action.pdf` to `http://localhost/book/pdf/back/Java%208%20in%20Action.pdf`). Now you can paste this URL as a "resource" in the "Configuration" -> "Add resource button" and choose the position (left or right window from selector), color, and name for the button. After this, clicking on the corresponding button will display the PDF or resource in the selected window.

6. Etape buttons with their pages can handle inputs related to different stages of the project development process. The etape buttons may differ depending on the selected method. Only the "Ticketing" button is always related to the Trello board. On each etape button's related page, there is a checkbox. After considering that the etape task is accomplished, you can check this checkbox, and the PIB progress bar will increment showing the overall progress of the project.

7. Prepare your Trello project board URL with a ".html" extension if the board has "Public" access. Add it in the "Add Trello account" section. After selection, the button will be locked. If there's an error, clear the browser cache and add the URL again. You can then click on the "Ticketing" button in the project navbar, and your board will appear in the left window.

8. To backup the project input data, go to "Configuration" and click on the "Backup Local Storage" button. The JSON format backup file will be downloaded in the browser's downloads. Keep this file safe.

9. To restore information, you can use "Restore Local Storage" in the "Configuration" menu to select the previously backed-up JSON file and restore it.

Additional Notes:
- For Chrome browser, add the extension "Allow access to local files" for accessing PDFs and other local files.For other browsers check for similar extentions.
- All office files must be placed in Google Drive with a shared URL, which can then be added as a "resource" using the resource button.
- Localhost must be configured with a web server like Apache.
- Prepare the Trello account token and key in one URL and add it in the "Configuration" menu.
- No additional frameworks or libraries are needed.
