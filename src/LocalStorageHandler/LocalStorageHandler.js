/*
Developers:
Oren Zehavi ID: 315940429
Matan Maimon ID: 207275959
*/
export class LocalStorageHandler{
    static async getData(){
        const data = localStorage.getItem('records');
        return data ? (JSON.parse(data) ?? []) : [];
    }
    static async setData(data){
        localStorage.setItem('records', JSON.stringify(data));
    }
}
//ToDO: add error handling