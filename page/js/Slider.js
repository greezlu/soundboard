/**
 * Slider class.
 */
class Slider
{
    /**
     * @type {Manager}
     */
    #manager;

    /**
     * @type {HTMLElement}
     */
    #slider;

    /**
     * @type {HTMLElement}
     */
    #control;

    /**
     * @type {number}
     */
    #timeout;

    /**
     * @type {number}
     */
    #shiftX = 0;

    /**
     * Slider constructor.
     *
     * @param {Manager} manager
     */
    constructor(manager) {
        this.#manager = manager;

        this.#slider = document.getElementById(
            "slider"
        );

        this.#control = this.#slider.querySelector(
            ".control"
        );

        this.#control.onmousedown = this.#mouseStart.bind(this);
        this.#control.ontouchstart = this.#touchStart.bind(this);
    }

    /**
     * @param {MouseEvent} event
     */
    #mouseStart(event) {
        event.preventDefault();

        let clientX = event.clientX;
        this.#shiftX = clientX - this.#control.getBoundingClientRect().left;
        let newLeft = event.clientX - this.#shiftX - this.#slider.getBoundingClientRect().left;

        if (event.target === document.documentElement) {
            this.#mouseFinish();
        }

        this.#sliderMove(newLeft);

        document.onmousemove = this.#mouseMove.bind(this);
        document.onmouseup = this.#mouseFinish.bind(this);
    }

    /**
     * @param {MouseEvent} event
     */
    #mouseMove(event) {
        let clientX = event.clientX;

        let newLeft = clientX - this.#shiftX - this.#slider.getBoundingClientRect().left;

        if (event.target === document.documentElement) {
            this.#mouseFinish();
        }

        this.#sliderMove(newLeft);
    }

    /**
     * @param {!MouseEvent=} event
     */
    #mouseFinish(event = undefined) {
        this.#shiftX = 0;

        document.onmousemove = () => {};
        document.onmouseup = () => {};
    }

    /**
     * @param {TouchEvent} event
     */
    #touchStart(event) {
        if (!event.touches || !event.touches[0]) {
            return;
        }

        let clientX = event.touches[0].clientX;

        this.#shiftX = clientX - this.#control.getBoundingClientRect().left;

        document.ontouchmove = this.#touchMove.bind(this);
        document.ontouchcancel = this.#touchFinish.bind(this);
        document.ontouchend = this.#touchFinish.bind(this);
    }

    /**
     * @param {TouchEvent} event
     */
    #touchMove(event) {
        let clientX = event.touches[0].clientX;

        let newLeft = clientX - this.#shiftX - this.#slider.getBoundingClientRect().left;

        if (event.target === document.documentElement) {
            this.#touchFinish();
        }

        this.#sliderMove(newLeft);
    }

    /**
     * @param {!TouchEvent=} event
     */
    #touchFinish(event = undefined) {
        this.#shiftX = 0;

        document.ontouchmove = () => {};
        document.ontouchcancel = () => {};
        document.ontouchend = () => {};
    }

    /**
     * @param {number} value
     */
    #setVolume(value) {
        if (this.#timeout) {
            clearTimeout(this.#timeout);
        }

        this.#timeout = setTimeout(() => this.#manager.setVolume(value), 500);
    }

    /**
     * @param {number} newLeft
     */
    #sliderMove(newLeft) {
        if (newLeft < 0) {
            newLeft = 0;
        }

        let rightEdge = this.#slider.offsetWidth - this.#control.offsetWidth;
        if (newLeft > rightEdge) {
            newLeft = rightEdge;
            this.#setVolume(1);
        } else {
            this.#setVolume(newLeft/(rightEdge + this.#control.offsetWidth));
        }

        this.#control.style.left = newLeft + 'px';
    }
}
