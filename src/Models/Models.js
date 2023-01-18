/*
Developers:
Oren Zehavi ID: 315940429
Matan Maimon ID: 207275959
*/
export class recordModel{
    constructor(id, title, description, category, price, month, year) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.category = category;
        this.price = price;
        this.month = month;
        this.year = year;
    }
}

export class filterModel{
    constructor(category, month, year) {
        this.category = category;
        this.month = month;
        this.year = year;
    }
}