import * as path from "path";
import Nedb from "nedb";
import {iItems} from "./Items";
const Datastore = require("nedb");

export interface myList extends iItems{
    quantidade: number
}
export class Mylist {
    private db: Nedb

    constructor() {
        this.db = new Datastore( {
            filename: path.join(__dirname, "myList.db"),
            autoload: true
        } )
    }

    public listMylist(): Promise<myList[]> {
        return new Promise((inResolve, inReject) => {
            this.db.find({},
                (inError: Error | null, inItems: myList[]) => {
                    if (inError) {
                        inReject(inError);
                    } else {
                        inResolve(inItems);
                    }
                }
            );
        });
    }

    public addItems (item: iItems): Promise<myList> {
        return new Promise((inResolve, inReject) => {
            const newItem = {
                name: item.name,
                img: item.img,
                quantidade: 1,
            }
            this.db.insert(newItem, (inError: Error | null, inItem: myList) => {
                if (inError) {
                    inReject(inError)
                }
                else {
                    inResolve(inItem)
                }
            })
        })
    }

    public deleteItemList (inID: string): Promise<void> {
        return new Promise((inResolve, inReject) => {
            this.db.remove({_id: inID}, {},
                (inError: Error | null) => {
                        if (inError) {
                            inReject(inError)
                        }
                        else {
                            inResolve()
                        }
                }
                )
        })
    }


    public incrementItem (item: myList): Promise<void> {
        return new Promise((inResolve, inReject) => {
            if (item !== undefined) {
                this.db.update({name: item.name}, {name: item.name, img: item.img, quantidade: item.quantidade+1}, {},
                    (inError: Error | null) => {
                        if (inError) {
                            inReject(inError)
                        }
                        else {
                            inResolve()
                        }
                    }
                )
            }
        })
    }

    public decrementItem (item: myList): Promise<void> {
        return new Promise((inResolve, inReject) => {
            if (item !== undefined) {
                this.db.update({name: item.name}, {name: item.name, img: item.img, quantidade: item.quantidade-1}, {},
                    (inError: Error | null) => {
                        if (inError) {
                            inReject(inError)
                        }
                        else {
                            inResolve()
                        }
                    }
                )
            }
        })
    }

    public deleteDB (): Promise<void> {
        return new Promise((inResolve, inReject) => {
            this.db.remove({ },{ multi: true }, (inError: Error | null) => {
                if (inError) {
                    inReject(inError)
                }
                else {
                    inResolve()
                }
            })
        })
    }
}