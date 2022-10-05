class Builder
{
    /**
     * @type {HTMLElement}
     */
    #contentDiv;

    /**
     * Builder constructor.
     */
    constructor() {
        this.#contentDiv = document.getElementById('content');
    }

    /**
     * @param {{"name": (string),"list": (string[])}[]} data
     */
    #build(data) {
        for (let i = 0; i < data.length; i++) {
            let source = data[i];
            let soundList = source.list;

            let sourceSection = document.createElement("section");
            sourceSection.classList.add("source");

            let titleDiv = document.createElement("div");
            titleDiv.classList.add("title");

            let titleHeader = document.createElement("h2");
            titleHeader.textContent = source.name;

            let soundListDiv = document.createElement("div");
            soundListDiv.classList.add("sound-list");

            for (let l = 0; l < soundList.length; l++) {
                let soundItemTitle = soundList[l];

                let soundItemDiv = document.createElement("div");
                soundItemDiv.classList.add("sound-item");

                let soundItemSpan = document.createElement("span");
                soundItemSpan.textContent = soundItemTitle;

                soundItemDiv.appendChild(soundItemSpan);
                soundListDiv.appendChild(soundItemDiv);
            }

            titleDiv.appendChild(titleHeader);
            sourceSection.appendChild(titleDiv);

            sourceSection.appendChild(soundListDiv);

            this.#contentDiv.appendChild(sourceSection);
        }
    }

    /**
     * @return undefined
     */
    load() {
        fetch("./page/js/data.json")
            .then(response => response.json())
            .then(responseJson => this.#build(responseJson))
            .catch(() => []);
    }

    /**
     * @param {function(Event): undefined} callback
     */
    setClickEvent(callback) {
        this.#contentDiv.addEventListener('click', callback);
    }
}
