import * as path from "path";
import Nedb from "nedb";
const Datastore = require("nedb");

export class UserService {
    private db: Nedb;
    constructor() {
        this.db = new Datastore({
            filename: path.join(__dirname, "contacts.db"),
            autoload: true
        });
    }

    public addLikedTeam (team: any): Promise<any> {
        return new Promise((req, res) => {
            this.db.insert(team, (inError: Error | null, inNewDoc: any) => {
                if (inError) {
                    req(inError)
                }
                else {
                    res(inNewDoc)
                }
            })
        })
    }

    // public addUser (inUser: IUser): Promise<IUser> {
    //     return new Promise((res, req) => {
    //         this.db.insert(inUser, (inError: Error | null, inNewDoc: IUser) => {
    //             if (inError) {
    //                 req(inError)
    //             }
    //             else {
    //                 res(inNewDoc)
    //             }
    //         })
    //     })
    // }

    public deleteUser(inID: string): Promise<void> {
        return new Promise((inResolve, inReject) => {
            this.db.remove({ _id: inID }, {},
                (inError: Error | null, inNumRemoved: number) => {
                    if (inError) {
                        inReject(inError);
                    } else {
                        inResolve();
                    }
                }
            );
        });
    }
}