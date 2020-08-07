const videoElement = document.getElementById('video');
const button = document.getElementById('button');

// Prompt to select media stream
async function selectMediaStream() {
    try{
        const mediaStream = await navigator.mediaDevices.getDisplayMedia();
        videoElement.srcObject = mediaStream;
        videoElement.onloadedmetadata = () => {
            videoElement.onplay();
        }
    } catch (error) {
        console.log(error);
    }
}

button.addEventListener('click', async () => {
    //Disable button
    button.disabled = true;
    //start PnP
    await videoElement.requestPictureInPicture();
    //Reset button
    button.disabled = false;
});

//On Load
selectMediaStream();