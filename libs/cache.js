class Cache {
    constructor(size){
        this.size = size;
        this.positions = [];
        for(let i=0; i< this.size; i++){
            this.positions.push("empty");
        }
        //console.log(`Tamanho da Cache : ${ this.size}`);
        //this.printCache();
    }
    printCache(){
        console.log(`  +---------------------------------------+`);
        console.log(`  |             Memória Cache             |`);
        console.log(`  |-------------------+-------------------|`);
        console.log(`  |  #pos. na cache   | #ref. da memória  |`);
        console.log(`  |-------------------+-------------------|`);

        this.positions.forEach((value, key) => {
            var str = ``;
            let n = key.toString().length;
            for(let j=0; j< 18-n; j++){
                str+= ` `;
            }
            str += `${key} |`;
            n = value.toString().length;
            for(let j=0; j< 18-n; j++){
                str+= ` `;
            }
            str += `${value} `
            console.log(`  |${str}|`);
        
        });
        console.log(`  +-------------------+-------------------+`);

    }
    
}
module.exports = Cache;