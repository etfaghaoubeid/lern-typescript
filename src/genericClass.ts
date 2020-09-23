class DataStorage<T>{
    data:T[] = [];
    getData():T[]{
        return  this.data;
    }
    addItem(item:T){
        this.data.push(item)
    }
    removeItem(item:T) {
        return this.data.splice(this.data.indexOf(item), 1);
    }
}
let d = new DataStorage<string>();
d.addItem("mouvid")