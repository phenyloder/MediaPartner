var sdk = require("microsoft-cognitiveservices-speech-sdk");
var fs = require("fs");

function synthesizeMaleSpeech(txtPath, fileName) {
    const speechConfig = sdk.SpeechConfig.fromSubscription("8119c6ce5a414f6188b8acbe21aad507", "centralindia");
    speechConfig.speechSynthesisVoiceName = "en-US-GuyNeural";
    const audioConfig = sdk.AudioConfig.fromAudioFileOutput(`outputAudio/${fileName}-male.wav`);

    const synthesizer = new sdk.SpeechSynthesizer(speechConfig, audioConfig);

    let readText = fs.readFileSync(txtPath, "utf-8");
    synthesizer.speakTextAsync(
        readText,
        result => {
            synthesizer.close();
            if (result) {
                // return result as stream
                return fs.createReadStream(`outputAudio/${fileName}-male.wav`);
            }
        },
        error => {
            console.log(error);
            synthesizer.close();
        });
}

function synthesizeFemaleSpeech(txtPath, fileName) {
    const speechConfig = sdk.SpeechConfig.fromSubscription("8119c6ce5a414f6188b8acbe21aad507", "centralindia");
    const audioConfig = sdk.AudioConfig.fromAudioFileOutput(`outputAudio/${fileName}-female.wav`);

    const synthesizer = new sdk.SpeechSynthesizer(speechConfig, audioConfig);

    let readText = fs.readFileSync(txtPath, "utf-8");
    synthesizer.speakTextAsync(
        readText,
        result => {
            synthesizer.close();
            if (result) {
                // return result as stream
                return fs.createReadStream(`outputAudio/${fileName}-female.wav`);
            }
        },
        error => {
            console.log(error);
            synthesizer.close();
        });
}

exports.speech = {synthesizeMaleSpeech, synthesizeFemaleSpeech};