
/*modal*/
// Get the modal
let modal = document.getElementById("myModal");

// Get the button that opens the modal
let btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
btn.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
/*modal finish*/


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

/*buttons*/
function createButtonset() {

    var method = document.getElementById("method").value;
     if(method == "Scrum"){
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

        link1.id= prefix+`1id`;
        link2.id= prefix+`2id`;
        link3.id= prefix+`3id`;
        link4.id= prefix+`4id`;
        link5.id= prefix+`5id`;
        link6.id= prefix+`6id`;
        link7.id= prefix+`7id`;
        link8.id= prefix+`8id`;
        link9.id= prefix+`9id`;
     

        let buttonText1 = document.createTextNode("Project Vision");
        let buttonText2 = document.createTextNode("Project Roadmap");
        let buttonText3 = document.createTextNode("Ticketing");
        let buttonText4 = document.createTextNode("Sprint Planing");
        let buttonText5 = document.createTextNode("Pocker Planing");
        let buttonText6 = document.createTextNode("Sprint");
        let buttonText7 = document.createTextNode("Developpement");
        let buttonText8 = document.createTextNode("Sprint Review");
        let buttonText9 = document.createTextNode("Retrospective");
  
        link1.href = baseUrl+"/project_vision.html";
        link2.href = baseUrl+"/project_roadmap.html";
        link3.href = "https://trello.com/b/w3FlvWqa.html";
        link4.href = baseUrl+"/sprint_planning.html";
        link5.href = baseUrl+"/pocker_planning.html";
        link6.href = baseUrl+"/sprint.html";
        link7.href = baseUrl+"/developpment.html";
        link8.href = baseUrl+"/sprint_review.html";
        link9.href = baseUrl+"/sprint_retrospective.html";
        
        
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

        let removeButtonset1 = document.createElement("button");
        let removeButtonset2 = document.createElement("button");
        let removeButtonset3 = document.createElement("button");
        let removeButtonset4 = document.createElement("button");
        let removeButtonset5 = document.createElement("button");
        let removeButtonset6 = document.createElement("button");
        let removeButtonset7 = document.createElement("button");
        let removeButtonset8 = document.createElement("button");
        let removeButtonset9 = document.createElement("button");
        let removeButtonText1 = document.createTextNode(buttonText1);
        let removeButtonText2 = document.createTextNode(buttonText2);
        let removeButtonText3 = document.createTextNode(buttonText3);
        let removeButtonText4 = document.createTextNode(buttonText4);
        let removeButtonText5 = document.createTextNode(buttonText5);
        let removeButtonText6 = document.createTextNode(buttonText6);
        let removeButtonText7 = document.createTextNode(buttonText7);
        let removeButtonText8 = document.createTextNode(buttonText8);
        let removeButtonText9 = document.createTextNode(buttonText9);
        
        removeButtonset1.appendChild(removeButtonText1);
        removeButtonset2.appendChild(removeButtonText2);
        removeButtonset3.appendChild(removeButtonText3);
        removeButtonset4.appendChild(removeButtonText4);
        removeButtonset5.appendChild(removeButtonText5);
        removeButtonset6.appendChild(removeButtonText6);
        removeButtonset7.appendChild(removeButtonText7);
        removeButtonset8.appendChild(removeButtonText8);
        removeButtonset9.appendChild(removeButtonText9);

        removeButtonset1.classList.add("remove-button");
        removeButtonset2.classList.add("remove-button");
        removeButtonset3.classList.add("remove-button");
        removeButtonset4.classList.add("remove-button");
        removeButtonset5.classList.add("remove-button");
        removeButtonset6.classList.add("remove-button");
        removeButtonset7.classList.add("remove-button");
        removeButtonset8.classList.add("remove-button");
        removeButtonset9.classList.add("remove-button");
        removeButtonset1.addEventListener("click", function() {
            
            newButtonset1.remove();
            newButtonset2.remove();
            newButtonset3.remove();
            newButtonset4.remove();
            newButtonset5.remove();
            newButtonset6.remove();
            newButtonset7.remove();
            newButtonset8.remove();
            newButtonset9.remove();

            removeButtonset1.remove();
            removeButtonset2.remove();
            removeButtonset3.remove();
            removeButtonset4.remove();
            removeButtonset5.remove();
            removeButtonset6.remove();
            removeButtonset7.remove();
            removeButtonset8.remove();
            removeButtonset9.remove();
        });
        document.getElementById("button-container-etape").appendChild(newButtonset1);
        document.getElementById("button-container-etape").appendChild(newButtonset2);
        document.getElementById("button-container-etape").appendChild(newButtonset3);
        document.getElementById("button-container-etape").appendChild(newButtonset4);
        document.getElementById("button-container-etape").appendChild(newButtonset5);
        document.getElementById("button-container-etape").appendChild(newButtonset6);
        document.getElementById("button-container-etape").appendChild(newButtonset7);
        document.getElementById("button-container-etape").appendChild(newButtonset8);
        document.getElementById("button-container-etape").appendChild(newButtonset9);

        document.getElementById("remove-container-etape").appendChild(removeButtonset1);
        document.getElementById("remove-container-etape").appendChild(removeButtonset2);
        document.getElementById("remove-container-etape").appendChild(removeButtonset3);
        document.getElementById("remove-container-etape").appendChild(removeButtonset4);
        document.getElementById("remove-container-etape").appendChild(removeButtonset5);
        document.getElementById("remove-container-etape").appendChild(removeButtonset6);
        document.getElementById("remove-container-etape").appendChild(removeButtonset7);
        document.getElementById("remove-container-etape").appendChild(removeButtonset8);
        document.getElementById("remove-container-etape").appendChild(removeButtonset9);
     }else 
     {
        let newButtonset1 = document.createElement("button");  
        let newButtonset2 = document.createElement("button");
        let newButtonset3 = document.createElement("button");  
        let newButtonset4 = document.createElement("button"); 
      
        let link1 = document.createElement("a");
        let link2 = document.createElement("a");
        let link3 = document.createElement("a");
        let link4 = document.createElement("a");

        link1.id= prefix+`1id`;
        link2.id= prefix+`2id`;
        link3.id= prefix+`3id`;
        link4.id= prefix+`4id`;

        let buttonText1 = document.createTextNode("Project Vision");
        let buttonText2 = document.createTextNode("Project Roadmap");
        let buttonText3 = document.createTextNode("Ticketing");
        let buttonText4 = document.createTextNode("Developpement");
        link1.href = baseUrl+"/project_vision.html";
        link2.href = baseUrl+"/project_roadmap.html";
        link3.href = "https://api.trello.com/1/boards/w3FlvWqa?fields=all&lists=all&cards=all&members=all&key=ed1cb08d13d822a4a4cfd36608614ccf&token=ATTA23602e8637a937c296b56dcb5726de04ff3f1225f1045febbe6e08a7b3955775A47DEE41";
        link4.href = baseUrl+"/developpment.html";
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
        let removeButtonset1 = document.createElement("button");
        let removeButtonset2 = document.createElement("button");
        let removeButtonset3 = document.createElement("button");
        let removeButtonset4 = document.createElement("button");
        let removeButtonText1 = document.createTextNode(buttonText1);
        let removeButtonText2 = document.createTextNode(buttonText2);
        let removeButtonText3 = document.createTextNode(buttonText3);
        let removeButtonText4 = document.createTextNode(buttonText4);
        removeButtonset1.appendChild(removeButtonText1);
        removeButtonset2.appendChild(removeButtonText2);
        removeButtonset3.appendChild(removeButtonText3);
        removeButtonset4.appendChild(removeButtonText4);
        removeButtonset1.classList.add("remove-button");
        removeButtonset2.classList.add("remove-button");
        removeButtonset3.classList.add("remove-button");
        removeButtonset4.classList.add("remove-button");
        removeButtonset1.addEventListener("click", function() {
            newButtonset1.remove();
            newButtonset2.remove();
            newButtonset3.remove();
            newButtonset4.remove();

            removeButtonset1.remove();
            removeButtonset2.remove();
            removeButtonset3.remove();
            removeButtonset4.remove();
       
        });
        document.getElementById("button-container-etape").appendChild(newButtonset1);
        document.getElementById("button-container-etape").appendChild(newButtonset2);
        document.getElementById("button-container-etape").appendChild(newButtonset3);
        document.getElementById("button-container-etape").appendChild(newButtonset4);
        document.getElementById("remove-container-etape").appendChild(removeButtonset1);
        document.getElementById("remove-container-etape").appendChild(removeButtonset2);
        document.getElementById("remove-container-etape").appendChild(removeButtonset3);
        document.getElementById("remove-container-etape").appendChild(removeButtonset4);
     }
     
     //for custom option
    /* else if(target == "custom"){
       
        //read from input the url for custom
        var target = document.getElementById("target").value;
        var url = document.getElementById("url").value;
        var newButtonset = document.createElement("button");        
        var link = document.createElement("a");
        var buttonText = document.createTextNode("Backlog");
      
        link.href = url;
        link.target = target;
        link.target = target;
        link.appendChild(buttonText);
        newButtonset.appendChild(link);
        newButtonset.classList.add("custom-button");
        var removeButtonset = document.createElement("button");
        var removeButtonText = document.createTextNode(`Remove Button: ${text}`);
        removeButtonset.appendChild(removeButtonText);
        removeButtonset.classList.add("remove-button");
        removeButtonset.addEventListener("click", function() {
            newButtonset.remove();
            removeButtonset.remove();
        });
        document.getElementById("button-container-etape").appendChild(newButtonset);
        document.getElementById("remove-container-etape").appendChild(removeButtonset);
     }
*/
 
// method button selection store the button and its value in localStorage
    let btnmethod = document.getElementById("method"); 
    localStorage.setItem("val",btnmethod.value); 
}
//problem!!!!!!!!!!!!!!!!!!!!!!!!!
//function to add prefix to ID tags 
    document.addEventListener("DOMContentLoaded", function() {
	var elems = document.querySelectorAll("[id]");
	/* for(var i = 0; i < elems.length; i++) {
		elems[i].id = prefix + elems[i].id;
	}  */
	});
//function to add prefix to ID tags 

/*buttons*/
// define an empty array to store the button information and reconstract them from local storage
let buttons = [];

if (localStorage.getItem("buttons")) {
    // Retrieve the buttons' information from localStorage
    buttons = JSON.parse(localStorage.getItem("buttons"));
  
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
        document.getElementById("button-container").appendChild(button);
        document.getElementById("remove-container").appendChild(removeButton);
  
        // Attach event listener to remove button
        removeButton.addEventListener("click", function() {
          // Find the index of the button to remove
          const indexToRemove = buttons.findIndex((b) => b.text === buttonInfo.text);
  
          // Remove the button information from the buttons array
          buttons.splice(indexToRemove, 1);
  
          // Save the updated buttons array to local storage
          localStorage.setItem("buttons", JSON.stringify(buttons));
  
          // Remove the custom button and its "remove" button from the page
          button.remove();
          removeButton.remove();
        });
      }
    });
  }
  
  
      

//create button and text fields on them
function createButton() {
    let url = document.getElementById("url").value;
    let text = document.getElementById("text").value;
    let bgcolor = document.getElementById("color").value;
    let target = document.getElementById("target").value;
    let newButton = document.createElement("button");
    let link = document.createElement("a");
    let buttonText = document.createTextNode(text);
    link.id= prefix;///for test
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
    removeButton.addEventListener("click", function() {
        newButton.remove();
        removeButton.remove();
    });

    document.getElementById("button-container").appendChild(newButton);
    document.getElementById("remove-container").appendChild(removeButton);

    // Store the button and its text in localStorage
    const buttonInfo = {
        id: prefix,
        text: text,
        url: url,
        target: target,
        backgroundColor: bgcolor
    };
    buttons.push(buttonInfo);
    localStorage.setItem("buttons", JSON.stringify(buttons));
}

// read the value from storage and preset in option
onload =function(){
    if (localStorage.getItem("val")) {  
        document.getElementById("method").value=localStorage.getItem("val");   
        btnselect.onclick();   
     }
   
} 
//cant keep value of method - each time recovers the value from local storage
/* window.onload = function() {
    var methodElement = document.getElementById("method").value;
    console.log(methodElement)
    if (methodElement) {
      if (localStorage.getItem("val")) {
        methodElement.value = localStorage.getItem("val");
        btnselect.onclick();
      }
    } else {
      console.error("method element not found");
    }
}; */

 
 