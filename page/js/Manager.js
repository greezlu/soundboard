class Manager
{
    /**
     * @type {{elem: (HTMLElement), audio: (HTMLAudioElement)}[]}
     */
    #list = [];

    /**
     * @type {number}
     */
    #volume = 1;

    /**
     * @type {HTMLAudioElement}
     */
    #audio;

    /**
     * Manager constructor.
     *
     * @param {number} volume
     */
    constructor(volume = 1) {
        this.#volume = volume;
        this.setVolume(volume);
    }

    /**
     * Click event processor.
     *
     * @param {MouseEvent} event
     */
    click(event) {
        let soundItemDiv = event.target.closest("div.sound-item");

        if (!soundItemDiv) {
            return;
        }

        if (this.#audio) {
            this.#audio.currentTime = 0;
            this.#audio.pause();
        }

        let audio = this.#getAudio(soundItemDiv);

        if (!audio) {
            return;
        }

        if (this.#audio === audio) {
            this.#audio.onended = () => {};
            this.#audio = undefined;
            return;
        }

        this.#audio = audio;
        audio.onended = () => {this.#audio = undefined};
        this.#audio.play().catch();
    }

    /**
     * @param {number} value
     */
    setVolume(value) {
        if (value > 1 || value < 0) {
            return;
        }

        this.#list.forEach((item) => {
            item.audio.volume = value;
        });

        this.#volume = value;
    }

    /**
     * Create new Audio component and save it into inner list.
     *
     * @param {HTMLElement} elem
     * @return {{elem: (HTMLElement), audio: (HTMLAudioElement)}}
     */
    #addComponent (elem) {
        let sourceTitle = elem.closest("section.source")
            .querySelector("div.title")
            .textContent.toLowerCase();

        let soundTitle = elem.querySelector("span")
            .textContent;

        let audio = new Audio("./files/" + sourceTitle + "/" + soundTitle + ".mp3");
        audio.volume = this.#volume;

        let component = {
            "elem": elem,
            "audio": audio
        };

        this.#list.push(component);

        return component;
    }

    /**
     * Get Audio object by DOMElement.
     *
     * @param {HTMLElement} elem
     * @return {HTMLAudioElement}
     */
    #getAudio (elem) {
        let component = this.#list.find(item => item.elem === elem)
            ?? this.#addComponent(elem);

        return component.audio;
    }
}
