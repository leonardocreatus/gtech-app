import axios from 'axios'

class Transaction {
    #url;
    constructor(url){
        this.#url = url;
    }

    async start({gate, camera}){
        const { data } = await axios.post(`${this.#url}/transaction/start`, { gate, camera });
        return data;
    }

    async end({gate, camera}){
        const { data } = await axios.post(`${this.#url}/transaction/end`, { gate, camera });
        return data;
    }

}

export { Transaction }