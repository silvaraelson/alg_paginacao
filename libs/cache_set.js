class CacheSet {
    constructor(size, n_set){
        this.size = size;
        this.n_set = n_set || null;
        this.positions = [];
        this.conjuntos = [];
        
        for(let i=0; i< this.size; i++){
            if(!Array.isArray(this.conjuntos[i%this.n_set])) 
                this.conjuntos[i%this.n_set] = [];
            this.conjuntos[i%this.n_set].push("empty");
            this.positions.push("empty");
        }
        //console.log(`Tamanho da Cache : ${ this.size}`);
        //this.printCache();
    }
    printCache(){
        console.log(`  +--------------------------------------------------+`);
        console.log(`  |                  Memória Cache                   |`);
        console.log(`  |-------------------+----------+-------------------|`);
        console.log(`  |   #pos. na cache  | conjunto | #ref. da memória  |`);
        console.log(`  |-------------------+----------+-------------------|`);

        this.positions.forEach((value, key) => {
            var str = ``;
            let n = key.toString().length;
            for(let j=0; j< 18-n; j++){
                str+= ` `;
            }
            str += `${key} |`;
            let c = this.n_set.toString().length;
            for(let j=0; j<9-c; j++){
                str+= ` `;
            }
            str += `${key%this.n_set} |`;
        
            n = value.toString().length;
            for(let j=0; j< 18-n; j++){
                str+= ` `;
            }
            str += `${value} `
            
            console.log(`  |${str}|`);
        
        });

        console.log(`  +-------------------+----------+-------------------+`);
        

    }
    
}
module.exports = CacheSet;