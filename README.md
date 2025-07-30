# Project Information Board (Offline version)

The aim of PIB is to help developers and other specialists in IT to consolidate all project related information in one board, apply and keep track of Agile methods (Scrum and Kanban for the moment), reduce the time they need to search in different folders and online resources for the requested information.

## 🎥 Watch the Demo

▶️ [View Demo Video (MP4)](https://portfolio.gourgen-khachatrian.fr/img/pib.mp4)

Shows server control, resource embedding, and progress tracking.  
The video is up-to-date — only change: "Backup" buttons removed, server controls added.  
Everything else works exactly as shown.


⚠️ All inputted information and selected buttons state is stored in db.json file inside PIB folder. 

1. Download **PIB** and place the `pib` folder in your web project root (e.g., `/var/www/pib/` or `/var/www/project1/pib/`), ensuring your web server (e.g., Apache) is configured to serve files from that location — no special Apache configuration is needed.

   You can have multiple parallel PIB folders — each runs its own server instance on a unique port. 
      
   Set appropriate permissions `sudo chown -R root:root /var/www/project1/pib`  and `sudo chmod -R 755 /var/www/project1/pib`
        
2. To start PIB, go http://localhost/project1/pib in your prefered browser in the pib folder from your project’s root directory using your preferred browser.
3. Choose "Configuration" in the top-right corner. Then, in the bottom-left section, find "Embedded Server" and click the "Start Server" button. After the server starts, select one of the available Agile methods. Once selected, the choice is locked.
4. To add online resources such as URLs, PDFs, text files, CSVs, or other externally hosted files, copy the link and paste it into Configuration > Add Resource.
   Then select the display position (left or right panel), button color, name, and icon.
   After saving, clicking the button will load the resource in the chosen panel.   
   ⚠️ External sites may block embedding due to CORS.  
   ✅ But files in the `pib/resources` folder are served locally via the embedded server — so they always work and bypass all CORS/iframe issues.

5. Adding Local Files (PDFs, CSVs, Text, etc.)
   
   To add local files (PDFs, CSVs, text files, etc.) and access them with a click in PIB:
   
   1. ✅ **Place your files in the `pib/resources/` folder**  
      Example:  
      `pib/resources/docs/Java 8 in Action.pdf`
   
   2. ✅ **Start the PIB embedded server**  
      Click **"Start Server"** in the Configuration panel.  
      The server will run on a specific port (e.g., `8088`, `8092`) — **this port is displayed just below the button**.
   
   3. ✅ **Use the correct localhost URL**  
      Construct the URL as:  http://localhost:PORT/resources/your-file.pdf
      
      Replace `PORT` with the one shown in the UI (e.g., `8088`):  
      → `http://localhost:8088/resources/docs/Java 8 in Action.pdf`
      
   4. ✅ **Add the resource in PIB**  
      - Go to **Configuration > Add Resource**
      - Paste the full `http://localhost:PORT/...` URL
      - Choose button name, color, and display panel (left or right)
      
   5. ✅ **Click the button**  
      The file will load directly in the selected panel — **no CORS issues**, because it's served from the same origin.
      
      ---
      
      ⚠️ **Important Notes:**
      - ❌ Do **not** use `file://` URLs — they are blocked by browsers for security.
      - ❌ Avoid browser extensions like "Allow access to local files" — they are unsafe and unreliable.
      - ✅ Only files inside the `pib/` folder (like `resources/`) are accessible — this is a security feature.
      - 🔁 If the server restarts on a new port, update your mental note — the port is always shown in the UI.

6. Etape buttons with their pages can handle basic data inputs related to different stages of the project development process. The etape buttons may differ depending on the selected method. Only the "Ticketing" button is always related to the Trello board. On each etape button's related page, there is a checkbox. After considering that the etape task is accomplished, you can check this checkbox, and the PIB progress bar will increment showing the overall progress of the project.

7. Prepare your Trello project board URL with a ".html" extension if the board has "Public" access. Add it in the "Add Trello account" section. After selection, the button will be locked. If there's an error, clear the browser cache and add the URL again. You can then click on the "Ticketing" button in the project navbar, and your board will appear in the left window.

8. To back up the project data, go to the PIB folder and copy the db.json file. All your data is stored in this file.

9. To restore the data: 
   
       Start the embedded PHP server.
       Wait for the db.json file to be generated (if it doesn’t exist).
       Stop the server.
       Replace the current db.json with your backup.
       Restart the server.
        
   
       ⚠️ Important: Do not replace db.json while the server is running — it may cause data loss or corruption. 
        

Additional Notes:
- For Chrome browser, add the extension "Allow access to local files" for accessing PDFs and other local files.For other browsers check for similar extentions.
- If you see "X-Frame-Options deny" errors, try to install these extensions:
  - Chrome: "Ignore X-Frame headers" extension
  - Firefox: "Ignore X-Frame-Options Header" extension
  - Edge: "X-Frame-Bypass" extension  
  - If none of these work, use the Embedded Server of PIB, but this time you need to place all resource files inside the PIB resources folder - it will serve only files inside this folder, not all files from PC, so it's preferable to try extensions to be able to add any file from PC to PIB. Users can add parallel PIB folders with no problem - each folder will automatically start its own instance of the server. Note: Pay attention to permissions - you may need to add sudoers permissions to the user or execute the command manually from the terminal. Check the server section for specific permission requirements.
  
- All office files must be placed in Google Drive with a shared URL, which can then be added as a "resource" using the resource button.
- Localhost must have a basic or default web server like Apache configured — it will act as the **parent server**, while each embedded PIB server instance runs in a parallel folder, allowing multiple independent PIB instances on the same machine.
- Prepare the Trello account token and key in one URL and add it in the "Configuration" menu.
- No additional frameworks or libraries are needed only PHP: Version 8.1.32 or higher.
- To UPDATE app you need to replace all files except resources folder. 
- PIB is now fully stageable, including all its data. You can use Git to manage versions.
  For clarity, consider using a dedicated Git repository (or branch) for each PIB instance,
  with a naming convention like projectname_pib or pib_projectname to identify which project it belongs to.