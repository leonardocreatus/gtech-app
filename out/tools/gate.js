import axios from 'axios';

class Gate {
    #url;
    constructor(url){
        this.#url = url;
    }

    async get(){
        const { data } = await axios.get(`${this.#url}/gates`);
        return data;
    }

}

export { Gate };