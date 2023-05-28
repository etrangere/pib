# Project Information Board (Offline version)

### The aim of PIB is to help developers and other specialists in IT to consolidate all project related information in one board, apply and keep tracked Agile methods (Scrum and Kanban for the moment) , reduce the time that they need to search in different folders and online resources for the requested information.
#



&#9888; All inputted information and selected buttons state is stored in "local storage" of web browser.Be carefull to make "Backup Local Storage" in "Configuration" menu each time before to clean the cache of the browser. 


#### 1.Download PIB and paste "pib" folder in root folder of your project.
#### 2.To start the PIB you need to open index.html file in "pib" folder.
#### 3.Choose "Configuration" at right upper corner and select one of available Agile methods (after selection the button will be locked,if error please clear the cache of browser and you can reselect).
#### 4.To add online url,pdf,text,word,csv or other type of files shared from diferent hostings copy and past the url and add as a "resource" URL  in "Configuration" -> "Add resource button" and then choose the right or left widow,color and name for button as you want. After this with click on coressponding button the pdf or resource will appeared inside selected window.Please check CORS rools because many sites prohibit redirection. 
#### 5.To add local pdf,text,word,csv or other type of files to the buttons and access them with click they must have URL starting from "localhost".
>(example:http://localhost/book/pdf/back/Java%208%20in%20Action.pdf). Place your documents in "resources" folder or anyware in your PC then add  "Autoriser l'accès aux fichiers locaux" extention to Chrome.Go to the file right click on it and "open with Chrome" or other browser,onec your file is opend in browser replace "/var/www/" with "localhost" (file:///var/www/book/pdf/back/Java%208%20in%20Action.pdf) -> to (http://localhost/book/pdf/back/Java%208%20in%20Action.pdf). Now you can past this url and add as a "resource" in "Configuration" -> "Add resource button" and then choose the right or left window,color and name for button as you want.After this with click on coressponding button the pdf or resource will appear inside selected window.
#### 6.Etape buttons with their pages can handle in inputs the information related to different etaps of project developpement process.
> Depending of selected method the etape buttons can be differ,only "Ticketing" button is always related to Trello board,in each etap button related page on top there is a checkbox,after you consider that the etap task is acomplished you can check this checkbox and the PIB progress bar will make increment showing where are you globaly on project realisation.  
#### 7.Prepare your Trello project board URL with .html extention if the board has "Public" access and past it in "Add Trello account".
>After selection the button will be locked,if error please clear the cache of browser and add url again.After this you can click on "Ticketing" button in navbar of project and your board will apears in left window.
#### 8.To backup the project input data go to "Configuration" and click on  "Backup Local Storage" button,the json format backup file will be downloaded in browser downloads,keep this file safe.
#### 9.To restore information you can use "Restore Local Storage" in "Configuration" menu to select precedently backuped json file and restore it.  



* For Chrome browser extention must be added  "Autoriser l'accès aux fichiers locaux" for access to pdf and other local files.
* All office files must be placed in google drive with shared url and after it can be added as resource with resource button.
* Localhost must be configured with one of webservers like Apache.
* Trello account token and key must be prepared in one URL and added in "Configuration" menu.
* No adittional freameworks or libraries needed.
