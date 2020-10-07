class Readers {
    constructor(args){
        this.args = process.argv;
    }
    get_cache_size() {
        if(this.args.indexOf("--size") > 0) 
            return this.args[this.args.indexOf("--size") + 1];
        else
            console.log("tamanho não definido");
            return -1;
    }
    get_mapping() {
        if(this.args.indexOf("--mapping") > 0 ) {
            let mapping = this.args[this.args.indexOf("--mapping") + 1].toUpperCase();
            if(mapping == "DIRECT" || mapping == "ASSOCIATIVE" || mapping == "ASSOCIATIVE_SET"){
                return mapping;
            }
            console.log("mapeamento inválido.");
            return -1; 
        } else {
            console.log("mapeamento não definido");
            return -1  ;
        }
    }
    get_method() {
        if(this.args.indexOf("--method") > 0 ) 
            return this.args[this.args.indexOf("--method") + 1].toUpperCase();
        else
            console.log("método não definido")
            return -1;
    }
    get_sets() {
        if(this.args.indexOf("--sets") > 0 ) 
            return this.args[this.args.indexOf("--sets") + 1].toUpperCase();
        else
            console.log("quantidade de conjuntos não definido")
            return -1;
    }
    get_path() {
        if(this.args.indexOf("--filename") > 0) {
            let filename = this.args[this.args.indexOf("--filename") + 1];
            var str = __dirname + "/../testes/" + (filename);
            if(filename.indexOf(".txt") < 0) str += ".txt";
            return str;
        } else {
            console.log("caminho não definido");
            return -1 ;
        }
    }
    
}

module.exports = Readers;