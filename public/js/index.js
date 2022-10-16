const fileInput = document.getElementById("fileInput");
const fileName = document.querySelector(".fileName");
const maleSpeech = document.querySelector(".sub-voice.male");
const femaleSpeech = document.querySelector(".sub-voice.female");
const reader = new FileReader();

fileInput.addEventListener('change',()=>{
    let name = fileInput.files[0].name;
    fileName.textContent = name;
})


maleSpeech.addEventListener('click',()=>{
    reader.readAsText(fileInput.files[0]);

    console.log(reader.result);
})
