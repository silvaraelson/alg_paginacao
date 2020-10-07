class Fifo {
    constructor(cache){
        this.cache = cache;
        this.first_index = 0;
        this.hits =0;
        this.misses = 0;
    }
    add(ref, positions){
        var resp = ``;
        resp += `posição de entrada \t< ${ ref } >`;
        if(positions.indexOf(ref) > -1){
            this.hits ++;
            resp += ` <------ hit`;
        } else {
            if(positions.indexOf("empty") > -1){
                positions[positions.indexOf("empty")] = ref;
                resp += ` <------ compulsory miss`;
            } else {
                resp += ` <------ miss`;
                //resp += `\nposição mais antiga: \t${ this.first_index}` ;
                resp += `\nposição na cache \t< ${ positions[this.first_index] } >`;
                positions[this.first_index] = ref;
                this.first_index = (this.first_index + 1) % positions.length;
            }
            this.misses ++;
        }
        return resp;
    }
}
module.exports = Fifo;