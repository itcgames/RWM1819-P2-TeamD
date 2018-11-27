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
     * Will contain a mapping of song names to their volume nodes.
     * @type {{"sound-name": GainNode}}
     */
    this.volumeNodes = {};

    /**
     * Defined as our volume node that controls
     * the volume for all playing sounds.
     * @type {GainNode}
     */
    this.globalVolumeNode = null;

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
   * @param {{"sound-name": {filepath: string, volume: number}}} soundData Contains our sound names and their file paths.
   */
  init(soundData) {
    try {
      window.AudioContext = window.AudioContext || window.webkitAudioContext;
      this.audioContext = new AudioContext();
      this.globalVolumeNode = this.audioContext.createGain();
      this.globalVolumeNode.connect(this.audioContext.destination);

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
      soundBufferSource.connect(this.globalVolumeNode);
      soundBufferSource.connect(this.volumeNodes[songName]);

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
    this.globalVolumeNode.gain.value = this.globalVolume;
  }

  /**
   * Changes the volume of the passed in song name,
   * does nothing if the song name is of a song that doesn't exist.
   * @param {string} songName Defines the name of song to be changed.
   * @param {number} newVolume Defines the new volume to be set
   */
  changeSongVolume(songName, newVolume) {
    function clamp(num) {
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

    /** @type {GainNode} */
    const volumeNode = this.volumeNodes[songName];
    if (volumeNode !== undefined) {
      volumeNode.gain.value = clamp(newVolume);
    }
  }

  /**
   * Loads a sound file through a xml http request.
   * @param {string} name Defines the name of the song, will be used as it's ID by the sound manager.
   * @param {string} path Defines the file path to the song storage.
   * @param {number} volume Defines the volume of this song (between 1.0 and 0.0)
   */
  loadSoundFile(name, path, volume) {
    let xmlRequest = new XMLHttpRequest();
    xmlRequest.open("GET", path, true);
    xmlRequest.responseType = "arraybuffer";
    xmlRequest.addEventListener("load", this.onBufferLoad.bind(this, name, volume, xmlRequest), false);
    xmlRequest.send();
  }

  /**
   * Called when a array of blob data is loaded.
   * @param {string} songName Defines the name of the song, to be used as id.
   * @param {number} volume Defines the volume of the song, between 1.0 and 0.0.
   * @param {XMLHttpRequest} xmlRequest Defines the xml request that sent this request.
   * @param {Event} event Defines the response data.
   */
  onBufferLoad(songName, volume, xmlRequest, event) {
    let arrayBuffer = xmlRequest.response;

    this.audioContext.decodeAudioData(arrayBuffer, this.onDecodeSuccess.bind(this, songName, volume), this.onDecodeFail.bind(this, songName));
  }

  /**
   * Called when a audio buffer successfully decodes.
   * @param {string} songName Defines the name of the song.
   * @param {number} volume Defines the volume of the song, between 1.0 and 0.0.
   * @param {AudioBuffer} audioBuffer Defines the successfully decoded audio buffer.
   */
  onDecodeSuccess(songName, volume, audioBuffer) {
    /**
     * @param {number} num
     * @returns {number} clamped between 1.0 and 0.0
     */
    function clamp(num) {
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

    this.audioBuffers[songName] = audioBuffer;
    const volumeNode = (this.volumeNodes[songName] !== undefined)
        ? this.volumeNodes[songName]
        : this.audioContext.createGain();
    volumeNode.gain.value = clamp(volume);
    this.volumeNodes[songName] = volumeNode;

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