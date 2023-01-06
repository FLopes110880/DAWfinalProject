import * as path from "path";
import Nedb from "nedb";
const Datastore = require("nedb");

export interface iItems {
    name: string,
    img: string
}

export class Items {
    private db: Nedb

    constructor() {
        this.db = new Datastore( {
            filename: path.join(__dirname, "items.db"),
            autoload: true
        } )
    }

    /**
     * This function returns a promise of an array of type iItems, it will make a query to find all elements with
     * a certain value in key, in this case it searches for everything because there isn't anything in parameter
     * query, and it will return the objects that it has found during the find query, and assign what was retrieved
     * to the promise, or it will do an error
     * */
    public listItems(): Promise<iItems[]> {
        return new Promise((inResolve, inReject) => {
            this.db.find({},
                (inError: Error | null, inItems: iItems[]) => {
                    if (inError) {
                        inReject(inError);
                    } else {
                        inResolve(inItems);
                    }
                }
            );
        });
    }

    /**
     * This function will make a promise to add an object of type iItems to the database and return the object, or it will return
     * an error
     * */
    public addItems (item: iItems): Promise<iItems> {
        return new Promise((inResolve, inReject) => {
            this.db.insert(item, (inError: Error | null, inItem: iItems) => {
                if (inError) {
                    inReject(inError)
                }
                else {
                    inResolve(inItem)
                }
            })
        })
    }
}