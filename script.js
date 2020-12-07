/******************
 * Links
 *
 * {@link} - https://giphy.com/gifs/robot-cinema-4d-eyedesyn-3o7abtn7DuREEpsyWY
 *          ROBOT.GIF from Giphy
 * {@link} - https://rapidapi.com/voicerss/api/text-to-speech-1
 * {@link} - https://rapidapi.com/
 * {@link} - http://www.voicerss.org/api/
 * {@link} - https://sv443.net/jokeapi/v2/
 * {@link} - https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
 * {@link} - https://developers.google.com/web/fundamentals/primers/async-functions
 * {@link} - https://www.w3schools.com/tags/ref_av_dom.asp
 * {@link} - https://stackoverflow.com/questions/47822525/where-to-hide-an-api-key
 ******************/



const button = document.getElementById('button');
const audioElement = document.getElementById('audio');


//disable/ enable button
function toggleButton() {
    button.disabled = !button.disabled;
}

//passing joke to voice_rss api
function tellMe(joke) {
    //console.log('tell me: ', joke);

    VoiceRSS.speech({
        key: '08f6ae62021149ee8df0a87c6d9e76e9',
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0,
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });

}

//get jokers from joke api
async function getJokes() {
    const apiUrl = 'https://sv443.net/jokeapi/v2/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist';

    try {
        let joke = '';
        const response = await fetch(apiUrl);
        const data = await response.json();
        // console.log(data.joke);
        if (data.setup) {
            //for twopart jokes
            joke = `${data.setup} ... ${data.delivery}`;
        } else {
            joke = data.joke;
        }
        //console.log(joke);
        //text-to-speech
        tellMe(joke);
        //disable button
        toggleButton();
    } catch (error) {
        console.log('fetch failed ', error);
    }
}

//event listeners
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);