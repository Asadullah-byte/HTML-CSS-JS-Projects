const wrapper = document.querySelector(".wrapper"),
    textInput = wrapper.querySelector(".form input"),
    generateBtn = wrapper.querySelector(".form button"),
    qrImg = wrapper.querySelector(".QR-Code-form img"),
    clearIcon = wrapper.querySelector(".form span");
let preValue;

generateBtn.addEventListener("click", () => {
    let qrValue = textInput.value.trim();
    if(!qrValue || preValue === qrValue) return;
    preValue = qrValue;
    generateBtn.innerText = "Generating QR Code...";
    qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${qrValue}`;
    qrImg.addEventListener("load", () => {
        wrapper.classList.add("active");
        generateBtn.innerText = "Generate QR Code";
    });
});

textInput.addEventListener("keyup", () => {
    if (!textInput.value.trim()) {
        wrapper.classList.remove("active");
        preValue = "";
    }
   
});

textInput.addEventListener("input", () =>{ 
    if (textInput.value.trim() !== '') {
        clearIcon.style.transition = "0.9s ease";
        clearIcon.style.display = "inline-block"; 
    }
    else {
        clearIcon.style.display = "none"; 
    }
        
});


clearIcon.addEventListener("click", () => {
    if (textInput.value.trim()) {
        wrapper.classList.remove("active");
        textInput.value = "";
        clearIcon.style.display = "none"; 
    }
   
  
});
