class Context{
    #comments;
    constructor(){
        this.#comments = null;
    }
    set comments(value){
        this.#comments = value;
    }
    get comments(){
        return this.#comments;
    }
}

export default new Context();