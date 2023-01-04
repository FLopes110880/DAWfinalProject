import * as path from "path";
import Nedb from "nedb";
import {myList} from "./Mylist";
const Datastore = require("nedb");

export interface listFinal extends myList {
    lists: myList[]
}

export class ListFinalized {
    private db: Nedb

    constructor() {
        this.db = new Datastore( {
            filename: path.join(__dirname, "finalList.db"),
            autoload: true
        } )
    }

    public listFinalized(): Promise<listFinal[]> {
        return new Promise((inResolve, inReject) => {
            this.db.find({},
                (inError: Error | null, inItems: listFinal[]) => {
                    if (inError) {
                        inReject(inError);
                    } else {
                        inResolve(inItems);
                    }
                }
            );
        });
    }

    public addToFinal (list: listFinal): Promise<listFinal> {
        return new Promise((inResolve, inReject) => {
            this.db.insert(list, (inError: Error | null, inItem: listFinal) => {
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