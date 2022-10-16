var sdk = require("microsoft-cognitiveservices-speech-sdk");
var fs = require("fs");

function synthesizeMaleSpeech(txtPath) {
    const speechConfig = sdk.SpeechConfig.fromSubscription("8119c6ce5a414f6188b8acbe21aad507", "centralindia");
    speechConfig.speechSynthesisVoiceName = "en-US-GuyNeural";
    const audioConfig = sdk.AudioConfig.fromAudioFileOutput("path-to-file-m.wav");

    const synthesizer = new sdk.SpeechSynthesizer(speechConfig, audioConfig);

    let readText = fs.readFileSync(txtPath, "utf-8");
    synthesizer.speakTextAsync(
        readText,
        result => {
            synthesizer.close();
            if (result) {
                // return result as stream
                return fs.createReadStream("path-to-file-m.wav");
            }
        },
        error => {
            console.log(error);
            synthesizer.close();
        });
}

function synthesizeFemaleSpeech() {
    const speechConfig = sdk.SpeechConfig.fromSubscription("8119c6ce5a414f6188b8acbe21aad507", "centralindia");
    const audioConfig = sdk.AudioConfig.fromAudioFileOutput("path-to-file-f.wav");

    const synthesizer = new sdk.SpeechSynthesizer(speechConfig, audioConfig);

    let readText = fs.readFileSync(txtPath, "utf-8");
    synthesizer.speakTextAsync(
        readText,
        result => {
            synthesizer.close();
            if (result) {
                // return result as stream
                return fs.createReadStream("path-to-file-f.wav");
            }
        },
        error => {
            console.log(error);
            synthesizer.close();
        });
}

export {synthesizeMaleSpeech, synthesizeFemaleSpeech};