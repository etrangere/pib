//base URL

//API
const jsonStorage = {
    async getItem(key) {
        try {
            const res = await fetch(`json-storage.php?key=${encodeURIComponent(key)}`);
            const data = await res.json();
            return data.value ?? null;
        } catch (error) {
            console.error('Error getting item:', error);
            return null;
        }
    },
    async setItem(key, value) {
        try {
            const res = await fetch('json-storage.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ key, value }),
            });
            const result = await res.json();
            return result.success === true;
        } catch (error) {
            console.error('Error setting item:', error);
            return false;
        }
    }
};
// Function to update and retrieve the apiURL value
async function updateApiURL(value) {
    if (value) {
        await jsonStorage.setItem("apiURL", value);
    }
    return await jsonStorage.getItem("apiURL");
}




// Function to execute two functions from one click for apiURL and button
function handleClickAPI() {
    // make_api_url();
    block_button_api();
}

// Function to lock button after one click
async function block_button_api() {
    let button_api = document.getElementById("btnselectapi");
    let api_url_value = document.getElementById("urlapi");
    if (button_api) {
        button_api.disabled = true;
    }
    await jsonStorage.setItem("buttonDisabled", "true");
    await jsonStorage.setItem("apiURL", api_url_value?.value || ""); // Gestion de la valeur potentiellement null/undefined
}

// Function to retrieve the disabled state and URL value and apply them on page load
async function applyButtonState() {
    let button_api = document.getElementById("btnselectapi");
    let isButtonDisabled = await jsonStorage.getItem("buttonDisabled");

    if (isButtonDisabled === "true" && button_api) {
        button_api.disabled = true;
    } else if (button_api) {
        button_api.disabled = false;
    }
    // Optionnel : pré-remplir également le champ URL API
    let savedApiURL = await jsonStorage.getItem("apiURL");
    let api_url_input = document.getElementById("urlapi");
    if (savedApiURL && api_url_input) {
        api_url_input.value = savedApiURL;
    }
}


// Call applyButtonState() when the page loads to retrieve the disabled state and URL value
window.addEventListener("load", applyButtonState);

//api




/*separator splitter*/
window.addEventListener('load', function() {
    let divider = document.getElementById('divider');
    let panel1 = document.getElementById('panel1');
    let panel2 = document.getElementById('panel2');
    let startX, startWidth;

    if (divider) {
        divider.addEventListener('mousedown', function(event) {
            // code block here
            divider.addEventListener('mousedown', function(event) {
                event.preventDefault();
                startX = event.clientX;
                startWidth = panel1.offsetWidth;

                document.addEventListener('mousemove', resize);
                document.addEventListener('mouseup', stopResize);
            });
        });
    }

    function resize(event) {
        let newWidth = startWidth + (event.clientX - startX);
        panel1.style.width = newWidth + 'px';
        panel2.style.width = 'calc(100% - ' + newWidth + 'px)';
    }

    function stopResize() {
        document.removeEventListener('mousemove', resize);
        document.removeEventListener('mouseup', stopResize);
    }
});
/*separator-spliter finish*/


/* function to execute two functions from one click  */
async function handleClick() { // Make handleClick async
    block_button();
    await createButtonset(); // Await the async createButtonset function
    // Any code here will run AFTER createButtonset has finished
}
/* function to lock button after one click  */
function block_button() {
    let button = document.getElementById("btnselect"); // Use let instead of var
    if (button) { // Optional: Add a check to prevent errors
        button.disabled = true;
    }
}

/*buttons*/
//buttons
async function createButtonset() { // Make the function async
    // Retrieve the apiURL value
    const apiURL = updateApiURL(); // Note: updateApiURL should also be made async if it uses jsonStorage

    var methodSelect = document.getElementById("method");
    // Add a check to prevent errors if the element is not found
    if (!methodSelect) {
        console.error("Element with id 'method' not found.");
        return;
    }
    var method = methodSelect.value;

    // Clear existing buttons in the container first to avoid duplicates?
    // const container = document.getElementById("button-container-etape");
    // if (container) container.innerHTML = '';

    const container = document.getElementById("button-container-etape");
    // Add a check for the container as well
    if (!container) {
        console.error("Element with id 'button-container-etape' not found.");
        return;
    }

    if (method === "Scrum") {
        // ... (Button creation logic for Scrum - remains the same) ...
        let newButtonset1 = document.createElement("button");
        let newButtonset2 = document.createElement("button");
        let newButtonset3 = document.createElement("button");
        let newButtonset4 = document.createElement("button");
        let newButtonset5 = document.createElement("button");
        let newButtonset6 = document.createElement("button");
        let newButtonset7 = document.createElement("button");
        let newButtonset8 = document.createElement("button");
        let newButtonset9 = document.createElement("button");
        let link1 = document.createElement("a");
        let link2 = document.createElement("a");
        let link3 = document.createElement("a");
        let link4 = document.createElement("a");
        let link5 = document.createElement("a");
        let link6 = document.createElement("a");
        let link7 = document.createElement("a");
        let link8 = document.createElement("a");
        let link9 = document.createElement("a");

        link1.id = prefix + `1id`;
        link2.id = prefix + `2id`;
        link3.id = prefix + `3id`;
        link4.id = prefix + `4id`;
        link5.id = prefix + `5id`;
        link6.id = prefix + `6id`;
        link7.id = prefix + `7id`;
        link8.id = prefix + `8id`;
        link9.id = prefix + `9id`;


        let buttonText1 = document.createTextNode("Project Vision");
        let buttonText2 = document.createTextNode("Project Roadmap");
        let buttonText3 = document.createTextNode("Ticketing");
        let buttonText4 = document.createTextNode("Sprint Planing");
        let buttonText5 = document.createTextNode("Pocker Planing");
        let buttonText6 = document.createTextNode("Sprint");
        let buttonText7 = document.createTextNode("Developpement");
        let buttonText8 = document.createTextNode("Sprint Review");
        let buttonText9 = document.createTextNode("Retrospective");

        link1.href = baseUrl + "project_vision.html";
        link2.href = baseUrl + "project_roadmap.html";
        link3.href = apiURL; // Use the apiURL value obtained above
        link4.href = baseUrl + "sprint_planning.html";
        link5.href = baseUrl + "pocker_planning.html";
        link6.href = baseUrl + "sprint.html";
        link7.href = baseUrl + "developpment.html";
        link8.href = baseUrl + "sprint_review.html";
        link9.href = baseUrl + "sprint_retrospective.html";


        link1.target = "right";
        link2.target = "right";
        link3.target = "left";
        link4.target = "right";
        link5.target = "right";
        link6.target = "right";
        link7.target = "right";
        link8.target = "right";
        link9.target = "right";

        link1.appendChild(buttonText1);
        link2.appendChild(buttonText2);
        link3.appendChild(buttonText3);
        link4.appendChild(buttonText4);
        link5.appendChild(buttonText5);
        link6.appendChild(buttonText6);
        link7.appendChild(buttonText7);
        link8.appendChild(buttonText8);
        link9.appendChild(buttonText9);

        newButtonset1.appendChild(link1);
        newButtonset2.appendChild(link2);
        newButtonset3.appendChild(link3);
        newButtonset4.appendChild(link4);
        newButtonset5.appendChild(link5);
        newButtonset6.appendChild(link6);
        newButtonset7.appendChild(link7);
        newButtonset8.appendChild(link8);
        newButtonset9.appendChild(link9);


        newButtonset1.classList.add("custom-button-etape");
        newButtonset2.classList.add("custom-button-etape");
        newButtonset3.classList.add("custom-button-etape");
        newButtonset4.classList.add("custom-button-etape");
        newButtonset5.classList.add("custom-button-etape");
        newButtonset6.classList.add("custom-button-etape");
        newButtonset7.classList.add("custom-button-etape");
        newButtonset8.classList.add("custom-button-etape");
        newButtonset9.classList.add("custom-button-etape");

        container.appendChild(newButtonset1);
        container.appendChild(newButtonset2);
        container.appendChild(newButtonset3);
        container.appendChild(newButtonset4);
        container.appendChild(newButtonset5);
        container.appendChild(newButtonset6);
        container.appendChild(newButtonset7);
        container.appendChild(newButtonset8);
        container.appendChild(newButtonset9);

    } else {
        // ... (Button creation logic for non-Scrum - remains the same) ...
        let newButtonset1 = document.createElement("button");
        let newButtonset2 = document.createElement("button");
        let newButtonset3 = document.createElement("button");
        let newButtonset4 = document.createElement("button");

        let link1 = document.createElement("a");
        let link2 = document.createElement("a");
        let link3 = document.createElement("a");
        let link4 = document.createElement("a");

        link1.id = prefix + `1id`;
        link2.id = prefix + `2id`;
        link3.id = prefix + `3id`;
        link4.id = prefix + `4id`;

        let buttonText1 = document.createTextNode("Project Vision");
        let buttonText2 = document.createTextNode("Project Roadmap");
        let buttonText3 = document.createTextNode("Ticketing");
        let buttonText4 = document.createTextNode("Developpement");
        link1.href = baseUrl + "/project_vision.html";
        link2.href = baseUrl + "/project_roadmap.html";
        link3.href = apiURL; // Use the apiURL value obtained above
        link4.href = baseUrl + "/developpment.html";
        link1.target = "right";
        link2.target = "right";
        link3.target = "left";
        link4.target = "right";
        link1.appendChild(buttonText1);
        link2.appendChild(buttonText2);
        link3.appendChild(buttonText3);
        link4.appendChild(buttonText4);
        newButtonset1.appendChild(link1);
        newButtonset2.appendChild(link2);
        newButtonset3.appendChild(link3);
        newButtonset4.appendChild(link4);
        newButtonset1.classList.add("custom-button-etape");
        newButtonset2.classList.add("custom-button-etape");
        newButtonset3.classList.add("custom-button-etape");
        newButtonset4.classList.add("custom-button-etape");

        container.appendChild(newButtonset1);
        container.appendChild(newButtonset2);
        container.appendChild(newButtonset3);
        container.appendChild(newButtonset4);
    }


    // method button selection store the button and its value in jsonStorage
    // Make this call await jsonStorage
    await jsonStorage.setItem("val", method);
    // Note: Using 'method' variable instead of 'btnmethod.value' as 'btnmethod' wasn't defined in the snippet.
    // Assuming 'method' holds the correct value from the select element.
}

//function to add prefix to ID tags
// document.addEventListener("DOMContentLoaded", function() {
// 	var elems = document.querySelectorAll("[id]");
// 	/* for(var i = 0; i < elems.length; i++) {
// 		elems[i].id = prefix + elems[i].id;
// 	}  */
// });
//function to add prefix to ID tags

/*buttons*/
// define an empty array to store the button information and reconstruct them from jsonStorage
let buttons = [];

// Wrap the loading logic in an async IIFE to use await
(async () => {
    // Retrieve the buttons' information from jsonStorage
    const buttonsData = await jsonStorage.getItem("buttons"); // Use await jsonStorage

    if (buttonsData) { // Check if data exists
        try {
            // Parse the JSON data
            buttons = JSON.parse(buttonsData);
        } catch (e) {
            // Handle potential errors if parsing fails
            console.error("Failed to parse buttons data from jsonStorage:", e);
            buttons = []; // Initialize as empty array on error
        }

        // Create new buttons for each button in the array
        buttons.forEach((buttonInfo) => {
            if (buttonInfo.id === prefix) {
                const button = document.createElement("button");

                const removeButton = document.createElement("button");
                const removeButtonText = document.createTextNode(`Remove Button: ${buttonInfo.text}`);
                removeButton.appendChild(removeButtonText);
                removeButton.classList.add("remove-button");

                let link = document.createElement("a");
                link.id = buttonInfo.id;
                link.href = buttonInfo.url;
                link.target = buttonInfo.target;
                link.innerHTML = buttonInfo.text;
                link.style.backgroundColor = buttonInfo.backgroundColor;
                button.appendChild(link);
                button.classList.add("custom-button");

                // Add checks for container elements to prevent errors if they don't exist
                const buttonContainer = document.getElementById("button-container");
                const removeContainer = document.getElementById("remove-container");
                if (buttonContainer) {
                    buttonContainer.appendChild(button);
                } else {
                    console.warn("Element with id 'button-container' not found.");
                }
                if (removeContainer) {
                    removeContainer.appendChild(removeButton);
                } else {
                    console.warn("Element with id 'remove-container' not found.");
                }

                // Attach event listener to remove button
                removeButton.addEventListener("click", async function () { // Make listener async
                    // Find the index of the button to remove
                    const indexToRemove = buttons.findIndex((b) => b.text === buttonInfo.text);

                    // Remove the button information from the buttons array
                    buttons.splice(indexToRemove, 1);

                    // Save the updated buttons array to jsonStorage
                    await jsonStorage.setItem("buttons", JSON.stringify(buttons)); // Use await jsonStorage

                    // Remove the custom button and its "remove" button from the page
                    button.remove();
                    removeButton.remove();
                });
            }
        });
    }
})();


//create source buttons and text fields on them
async function createButton() { // Make the function async
    let url = document.getElementById("url").value;
    let text = document.getElementById("text").value;
    let bgcolor = document.getElementById("color").value;
    let target = document.getElementById("target").value;
    let newButton = document.createElement("button");
    let link = document.createElement("a");
    let buttonText = document.createTextNode(text);
    link.id = prefix;///for test
    link.href = url;
    link.target = target;
    link.style.backgroundColor = bgcolor;
    link.appendChild(buttonText);
    newButton.appendChild(link);
    newButton.classList.add("custom-button");
    let removeButton = document.createElement("button");
    let removeButtonText = document.createTextNode(`Remove Button: ${text}`);
    removeButton.appendChild(removeButtonText);
    removeButton.classList.add("remove-button");
    removeButton.addEventListener("click", function () {
        newButton.remove();
        removeButton.remove();
        // Find and remove the button info from the local `buttons` array
        const indexToRemove = buttons.findIndex((b) => b.text === text);
        if (indexToRemove > -1) {
            buttons.splice(indexToRemove, 1);
            // Save the updated buttons array to jsonStorage
            jsonStorage.setItem("buttons", JSON.stringify(buttons)); // Use jsonStorage
            // Note: Not awaiting here, treating it as fire-and-forget like the original localStorage version
            // If you need to ensure it's saved before proceeding, you'd make this listener async and await.
        }
    });

    document.getElementById("button-container").appendChild(newButton);
    document.getElementById("remove-container").appendChild(removeButton);

    // Store the source buttons and their text in jsonStorage
    const buttonInfo = {
        id: prefix,
        text: text,
        url: url,
        target: target,
        backgroundColor: bgcolor
    };
    buttons.push(buttonInfo);
    await jsonStorage.setItem("buttons", JSON.stringify(buttons)); // Use await jsonStorage



}

// read the value of method button from storage and preset in option
window.addEventListener('load', async function () {
    const savedMethod = await jsonStorage.getItem("val");
    if (savedMethod) {
        const methodSelect = document.getElementById("method");
        if (methodSelect) {
            methodSelect.value = savedMethod;
            // Attempt to trigger button set creation
            const btnSelect = document.getElementById("btnselect");
            if (btnSelect && typeof btnSelect.onclick === 'function') {
                btnSelect.onclick();
            }
        }
    }
});