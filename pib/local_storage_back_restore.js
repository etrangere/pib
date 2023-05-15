// Backup function
function backupLocalStorage() {
    // Get the localStorage data as a string
    const localStorageData = JSON.stringify(localStorage);
  
    // Create a new Blob object
    const blob = new Blob([localStorageData], { type: "application/json" });
  
    // Create a new URL object
    const urlObject = URL.createObjectURL(blob);
  
    // Create a new anchor element
    const link = document.createElement("a");
  
    // Set the anchor element's href attribute to the URL object
    link.href = urlObject;
  
    //for date 
    const backupDate = new Date().toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }).replace(/\//g, '.').replace(',', '_');
    

    // Set the anchor element's download attribute
    link.download = "backup_"+prefix+"_"+backupDate+".json";
  
    // Append the anchor element to the DOM
    document.body.appendChild(link);
  
    // Click the anchor element to download the file
    link.click();
  
    // Remove the anchor element from the DOM
    document.body.removeChild(link);
  }
  
  // Restore function
  function restoreLocalStorage(file) {
    // Create a new FileReader object
    const reader = new FileReader();
  
    // Set the event listener for when the FileReader has loaded the file
    reader.onload = function(event) {
      // Parse the file content as JSON
      const localStorageData = JSON.parse(event.target.result);
  
      // Restore the data to localStorage
      for (let key in localStorageData) {
        localStorage.setItem(key, localStorageData[key]);
      }
  
      // Reload the page to apply the changes
      location.reload();
    };
  
    // Read the file as text
    reader.readAsText(file);
  }
  
  // Event listener for backup button
  document.getElementById("backup-button").addEventListener("click", function() {
    backupLocalStorage();
  });
  
  // Event listener for restore input
  document.getElementById("restore-input").addEventListener("change", function(event) {
    const file = event.target.files[0];
    restoreLocalStorage(file);
  });