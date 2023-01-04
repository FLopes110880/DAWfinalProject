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