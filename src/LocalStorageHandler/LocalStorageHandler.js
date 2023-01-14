export class LocalStorageHandler{
    static async getData(){
        const data = localStorage.getItem('records');
        return data ? (JSON.parse(data) ?? []) : [];
    }




}