export class LocalStorageHandler{
    static async getData(){
        return JSON.parse(localStorage.getItem('records')) ?? [];
    }




}