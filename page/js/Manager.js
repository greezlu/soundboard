class Manager
{
    /**
     * @type {{elem: (HTMLElement), audio: (Audio)}[]}
     */
    #list = [];

    /**
     * @type {number}
     */
    #volume = 1;

    /**
     * Manager constructor.
     *
     * @param {number} volume
     */
    constructor(volume = 1) {
        this.#volume = volume;
    }

    /**
     * Click event processor.
     *
     * @param {Event} event
     */
    click(event) {
        let soundItemDiv = event.target.closest("div.sound-item");

        if (!soundItemDiv) {
            return;
        }

        /** @typedef Audio */
        let audio = this.#getAudio(soundItemDiv);

        if (!audio) {
            return;
        }

        audio.play();
    }

    /**
     * Create new Audio component and save it into inner list.
     *
     * @param {HTMLElement} elem
     * @return {{elem: (HTMLElement), audio: (Audio)}}
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
     * @return {Audio}
     */
    #getAudio (elem) {
        let component = this.#list.find(item => item.elem === elem)
            ?? this.#addComponent(elem);

        return component.audio;
    }
}
