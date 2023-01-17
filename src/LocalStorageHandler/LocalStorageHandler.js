export class LocalStorageHandler{
    static async getData(){
        const data = localStorage.getItem('records');
        return data ? (JSON.parse(data) ?? []) : [];

    }
    static async setData(data){
        localStorage.setItem('records', JSON.stringify(data));
    }
}