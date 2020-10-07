
const Fifo = require("./fifo");

const Random = require("./random");
class MappingDirect {
    constructor (cache){
        this.cache  = cache;
        this.hits   = 0;
        this.misses = 0;
    }
    run (mem_refs) {
        console.log("\n##### Executando Mapeamento Direto #####");
        mem_refs.forEach((value, key) => {
            var resp = `posição de entrada \t< ${ value } >  \nposição na cache \t< ${ this.cache.positions[value % this.cache.size] } >`;
            if(value == this.cache.positions[value % this.cache.size]) {
                this.hits ++;
                resp += ` <------  hit`;
            } else {
                if(this.cache.positions[value % this.cache.size] == "empty")
                    resp += ` <------ compulsory miss`;
                else
                    resp += ` <------  miss`;
                this.cache.positions[value % this.cache.size] = value;
                this.misses ++;
            }
            console.log(`\n===========================================`);
            console.log(`\t\tETAPA ${1 + key*1} `);
            console.log(`===========================================\n`);
            console.log(`${ resp }`);
            this.cache.printCache();

        });
        console.log("\n##### Resultado Final #####");
        this.cache.printCache();
        console.log( `\tQuantidade de hits: \t${this.hits}` );
        console.log( `\tQuantidade de misses: \t${this.misses}` );
        console.log( `\tTaxa de acertos: \t${(Math.floor((this.hits / mem_refs.length)*100)/100)*100}%` );
    }
}
class MappingAssociative {
    constructor (cache, method){
        this.method = method;
        this.cache  = cache;
        this.hits   = 0;
        this.misses = 0;
    }
    run (mem_refs) {
        console.log(`\n##### Executando Mapeamento Associativo #####`);
        console.log(`##### Método ${this.method} #####`);
        var rule;
        if(this.method == "FIFO"){
            rule = new Fifo(this.cache);
        } else if (this.method == "LRU") {
            rule = new LRU(this.cache);
        } else if (this.method == "LFU") {
            rule = new LFU(this.cache);
        } else if (this.method == "RANDOM") {
            rule = new Random(this.cache);
        }
        
        mem_refs.forEach((value, key) => {
            
            console.log(`\n===========================================`);
            console.log(`\t\tETAPA ${1 + key*1} `);
            console.log(`===========================================\n`);
            console.log(`${ rule.add(value, this.cache.positions)} `);
            this.cache.printCache();
        });
        console.log("\n\t##### Resultado Final #####");
        this.cache.printCache();
        console.log( `\tQuantidade de hits: ${rule.hits}` );
        console.log( `\tQuantidade de misses: ${rule.misses}` );
        console.log( `\tTaxa de acertos: ${(Math.floor((rule.hits / mem_refs.length)*100)/100)*100}%` );
    }
}

class MappingAssociativeSet {
    constructor (cache, method, sets){
        this.method = method;
        this.cache  = cache;
        this.sets    = sets || 1;
        this.hits   = 0;
        this.misses = 0;
    }
    run (mem_refs) {
        console.log(`\n##### Executando Mapeamento Associativo por Conjunto #####`);
        console.log(`##### Método ${this.method} #####`);
        var rule;
        if(this.method == "FIFO"){
            rule = new Fifo(this.cache);
        } else if (this.method == "LRU") {
            rule = new LRU(this.cache);
        } else if (this.method == "LFU") {
            rule = new LFU(this.cache);
        } else if (this.method == "RANDOM") {
            rule = new Random(this.cache);
        }
        
        mem_refs.forEach((value, key) => {
            console.log(`\n======================================================`);
            console.log(`\t\t\tETAPA ${1 + key*1} `);
            console.log(`======================================================\n`);
            console.log(`Conjunto ${value%this.sets} `);
            console.log(`${ rule.add(value, this.cache.conjuntos[value%this.sets])} `);
            for(let i=0; i<this.cache.positions.length; i++){
                let conj = i%this.sets;
                this.cache.positions[i] = this.cache.conjuntos[conj][Math.floor(i/this.sets)]
            }
            this.cache.printCache();
        });
        console.log("\n\t##### Resultado Final #####");
        this.cache.printCache();
        console.log( `\tQuantidade de hits: ${rule.hits}` );
        console.log( `\tQuantidade de misses: ${rule.misses}` );
        console.log( `\tTaxa de acertos: ${(Math.floor((rule.hits / mem_refs.length)*100)/100)*100}%` );
    }
}

module.exports.MappingDirect = MappingDirect;
module.exports.MappingAssociative = MappingAssociative;
module.exports.MappingAssociativeSet = MappingAssociativeSet;