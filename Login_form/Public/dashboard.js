const body = document.querySelector("body"),
    sidebar = body.querySelector(".side-bar"),
    toggle = body.querySelector(".toogle"),
    searchBtn = body.querySelector(".search-box"),
    modeSwitch = body.querySelector(".toogle-switch"),
    modeText = body.querySelector(".mode-text");

    toggle.addEventListener("click", () => {
    sidebar.classList.toggle("close");  
    });

    modeSwitch.addEventListener("click", () => {
        body.classList.toggle("dark");  
        
        if (body.classList.contains("dark")) {
            modeText.innerText = "Light Mode"
        }
        else {
            modeText.innerText = "Dark Mode"
        }
    });