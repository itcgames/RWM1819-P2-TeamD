/**
 * Manages all sounds in the entire application
 * @class
 * @classdesc Using a map of loaded sounds,
 *  the sound manager loads all the songs in the
 *  beginning of the application, decodes and stores them.
 */
class SoundManager {
  /**
   * Constructs our sound manager with
   * empty map of sounds.
   * @constructor
   */
  constructor() {
    /**
     * Represents the different audio buffers.
     */
    this.audioBuffers = {};

    /**
     * Represents the audio "players"
     * @type {{AudioBufferSourceNode}}
     */
    this.audioBufferSources = {};

    /**
     * Required for managing and for playing any sound.
     * @type {AudioContext}
     */
    this.audioContext = null;

    /**
     * Defined as our volume node that controls
     * the volume for all playing sounds.
     * @type {GainNode}
     */
    this.volumeNode = null;

    /**
     * Represents our master volume.
     */
    this.globalVolume = 1.0;

    /**
     * Represents our sound queue.
     * Sound queue is used to queue sound play requeusts,
     * this is so that when a sound is requested to play but
     * has not loaded than the sound is queued to be played.
     * @type {[{ name: string, isLooped: boolean}]}
     */
    this.soundQueue = [];
  }

  /**
   * 
   * @param {{"background-song": {filepath: string, volume: number}}} soundData Contains our sound names and their file paths.
   */
  init(soundData) {
    try {
      window.AudioContext = window.AudioContext || window.webkitAudioContext;
      this.audioContext = new AudioContext();
      this.volumeNode = this.audioContext.createGain();
      this.volumeNode.connect(this.audioContext.destination);

      const FILE_PATH = "filepath";
      for (let soundName in soundData) {
        this.loadSoundFile(soundName, soundData[soundName][FILE_PATH]);
      }
    }
    catch (error) {
      alert("Web Audio API is not supported on this browser.\nTherefore no audio will be played.");
    }
  }

  /**
   * 
   * @param {string} songName Defines the name of song to be played.
   * @param {boolean} now Defines whether to play the sound immediately (defaults to false).
   * @param {boolean} loop Defines whether the song should be looped or not (defaults to false).
   */
  play(songName, now = false, loop = false) {
    /**
     * @type {AudioBuffer}
     */
    let soundBuffer = this.audioBuffers[songName];
    let context = this.audioContext;
    if (soundBuffer === undefined) {
      this.soundQueue.push(
        { name: songName, isLooped: loop }
      );
    }
    else {
      /**
       * @type {AudioBufferSourceNode}
       */
      let soundBufferSource;
      if (now) {
        soundBufferSource = this.audioBufferSources[songName];
        soundBufferSource = context.createBufferSource();
        this.audioBufferSources[songName] = soundBufferSource;
      }
      else {
        soundBufferSource = this.audioBufferSources[songName];
        if (soundBufferSource === undefined) {
          soundBufferSource = context.createBufferSource();
          this.audioBufferSources[songName] = soundBufferSource;
        }
        else {
          if (soundBufferSource.buffer !== null) {
            return;
          }
        }
      }
      soundBufferSource.buffer = soundBuffer;
      soundBufferSource.loop = loop;
      setTimeout(this.onSoundEnd.bind(this, songName, soundBufferSource), soundBuffer.duration * 1000);

      // Connect sound buffer source to our gain node
      //  this alter's the volume that sound buffer source is playing at
      // Since we have all sounds running on the same volume, we define all
      //  loaded sounds to use volumeNode.
      soundBufferSource.connect(this.volumeNode);

      soundBufferSource.start(0);
    }
  }

  /**
   * Stops a specific sound from playing.
   * @param {string} soundName Defines the name of the sound to stop playing.
   */
  stop(soundName) {
    /**
     * @type {AudioBufferSourceNode}
     */
    let bufferSource = this.audioBufferSources[soundName];
    if (bufferSource !== undefined && bufferSource.buffer !== null) {
      bufferSource.stop(0);
      delete this.audioBufferSources[soundName];
    }
  }

  /**
   * Changes the volume of all songs.
   * @param {number} newVolume Defines the new global volume.
   */
  changeVolume(newVolume) {
    let clamp = function (num) {
      if (num > 1.0) {
        return 1.0;
      }
      else if (num < 0.0) {
        return 0.0;
      }
      else {
        return num;
      }
    };

    this.globalVolume = clamp(newVolume);
    this.volumeNode.gain.value = this.globalVolume;
  }

  /**
   * Loads a sound file through a xml http request.
   * @param {string} name Defines the name of the song, will be used as it's ID by the sound manager.
   * @param {string} path Defines the file path to the song storage.
   */
  loadSoundFile(name, path) {
    let xmlRequest = new XMLHttpRequest();
    xmlRequest.open("GET", path, true);
    xmlRequest.responseType = "arraybuffer";
    xmlRequest.addEventListener("load", this.onBufferLoad.bind(this, name, xmlRequest), false);
    xmlRequest.send();
  }

  /**
   * Called when a array of blob data is loaded.
   * @param {string} songName Defines the name of the song, to be used as id.
   * @param {XMLHttpRequest} xmlRequest Defines the xml request that sent this request.
   * @param {Event} event Defines the response data.
   */
  onBufferLoad(songName, xmlRequest, event) {
    let arrayBuffer = xmlRequest.response;

    this.audioContext.decodeAudioData(arrayBuffer, this.onDecodeSuccess.bind(this, songName), this.onDecodeFail.bind(this, songName));
  }

  /**
   * Called when a audio buffer successfully decodes.
   * @param {AudioBuffer} audioBuffer Defines the successfully decoded audio buffer.
   */
  onDecodeSuccess(songName, audioBuffer) {
    this.audioBuffers[songName] = audioBuffer;
    let soundQ = this.soundQueue;
    for (let index = soundQ.length - 1; index >= 0; --index) {
      let sound = soundQ[index];
      if (sound.name === songName) {
        this.play(sound.name, false, sound.isLooped);
        soundQ.splice(index, 1);
      }
    }
  }

  /**
   * Called when a audio buffer fails to decode.
   * @param {DOMException} error Defines extra information on the error that has occured.
   */
  onDecodeFail(songName, error) {
    console.log("Failed to load '" + songName + "'", error);
  }

  /**
   * 
   * @param {string} songName Defines the song name that has finished playing.
   * @param {AudioBufferSourceNode} audioSource Defines the audio source that has stopped playing.
   */
  onSoundEnd(songName, audioSource) {
    /**
     * @type {AudioBufferSourceNode}
     */
    let audioBufferSource = this.audioBufferSources[songName];
    if (audioBufferSource !== undefined) {
      if (audioBufferSource === audioSource &&
        !audioBufferSource.loop) {
        audioBufferSource.stop(0);
        delete this.audioBufferSources[songName];
      }
    }
  }
}