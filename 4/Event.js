class Event {
    constructor () {
        this.handlers = {}
    }
    on (type, handler, once = false) {
        if (!this.handlers[type]) {
            this.handlers[type] = []
        }
        if (!this.handlers[type].includes(handler)) {
            this.handlers[type].push(handler)
            handler.once = once
        }
    }
    off (type, handler) {
        if (this.handlers[type]) {
            if (handler === undefined) {
                this.handlers[type] = []
            } else {
                this.handlers[type] = this.handlers[type].filter(f => f !== handler)
            }
        }
    }

    /***
     * trigger 触发事件
     * @param type
     * @param e
     * @param obj 用来修改this指向
     */
    trigger (type, e = {}, obj = this) {
        if (this.handlers[type]) {
            this.handlers[type].forEach(h => {
                h.call(obj, e)
                if (h.once) {
                    this.off(type, h)
                }
            })
        }
    }
    once (type, handler) {
        this.on(type, handler, true)
    }
}