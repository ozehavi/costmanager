/*
Developers:
Oren Zehavi ID: 315940429
Matan Maimon ID: 207275959
*/
export class LocalStorageHandler{
    static async getData(){
        return new Promise(function(resolve, reject){
            try{
                const data = localStorage.getItem('records');
                resolve(data ? (JSON.parse(data) ?? []) : []);
            }catch (error){
                reject(error);
            }
        })
    }
    static async setData(data){
        return new Promise(function(resolve, reject){
            try{
                debugger
                localStorage.setItem('records', JSON.stringify(data));
                resolve();
            }catch (error){
                reject(error);
            }
        })
    }
}
//ToDO: add error handling