class Context{
    #objects; //private

    constructor(){
        this.#objects = null;
    }
    set objects(value){
        this.#objects = value;
    }
    get objects(){
        return this.#objects;
    }
}

export default new Context();
