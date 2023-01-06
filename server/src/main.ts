import path from "path";
import express, {Express, NextFunction, Request, response, Response} from "express";
import * as Items from "./Items";
import { iItems } from "./Items";
import * as Mylist from "./Mylist";
import * as listFinalized from "./ListFinalized";
import {listFinal} from "./ListFinalized";
import {myList} from "./Mylist";

const app : Express = express();
const items: Items.Items = new Items.Items();
const list: Mylist.Mylist = new Mylist.Mylist()
const finalList: listFinalized.ListFinalized = new listFinalized.ListFinalized()

app.use(express.json());

app.use("/", express.static(path.join (__dirname, "../../client/dist")));

app.use(function(inRequest: Request, inResponse: Response, inNext : NextFunction ) {
    inResponse.header("Access-Control-Allow-Origin", "*");
    inResponse.header("Access-Control-Allow-Methods", "GET,POST,DELETE,PUT,OPTIONS");
    inResponse.header("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Accept");
    inNext();
});

app.post("/addItem", async (inRequest: Request, inResponse: Response) => {
    try {
        await items.addItems(inRequest.body);
        inResponse.send("ok");
    } catch (inError) {
        inResponse.send("error") ;
    }
})

app.get("/listMenuItems", async (inRequest: Request, inResponse: Response) => {
    try {
        const getItems: iItems[] = await items.listItems();
        getItems.sort((a, b) => a.name.localeCompare(b.name))
        inResponse.json(getItems);
    }
    catch (inError) {
        inResponse.send("error");
    }
})

app.post("/addItemMyList", async (inRequest: Request, inResponse, Response) => {
    try {
        const listedItems: iItems[] = await items.listItems();
        let result = listedItems.find(p => p.name == inRequest.body.item.name)
        if (result !== undefined) {
            await list.addItems(result)
            inResponse.send("ok");
        }
        else {
            inResponse.send("error")
        }
    }
    catch (inError) {
        inResponse.send("error")
    }
})

app.get("/listMylist", async (inRequest: Request, inResponse: Response) => {
    try {
        const getItems: iItems[] = await list.listMylist();
        getItems.sort((a, b) => a.name.localeCompare(b.name))
        inResponse.json(getItems);
    }
    catch (inError) {
        inResponse.send("error");
    }
})

app.delete("/deleteItemMyList/:id", async (inRequest: Request, inResponse: Response) => {
    try {
        await list.deleteItemList(inRequest.params.id);
        inResponse.send("ok");
    } catch ( inError ) {
        inResponse.send("error") ;
    }
});

app.get("/getFinalList", async (inRequest: Request, inResponse: Response) => {
    try {
        const lists: listFinal[] = await finalList.listFinalized()
        inResponse.json(lists)
    }
    catch ( inError) {
        inResponse.send("error")
    }
})

app.post("/addItemFinalList", async (inRequest: Request, inResponse: Response) => {
    try {
        await finalList.addToFinal(inRequest.body);
        inResponse.send("ok");
    } catch (inError) {
        inResponse.send("error") ;
    }
})

app.delete("/deleteMyListDB", async  (inRequest: Request, inResponse: Response) => {
    try {
        await list.deleteDB();
        inResponse.send("deleted")
    }
    catch ( inError ) {
        inResponse.send("error")
    }
})

app.put("/incrementQuantityMyList/", async  (inRequest: Request, inResponse: Response) => {
    try {
        let lists: myList[] = await list.listMylist()
        let result = lists.find(p => p.name == inRequest.body.item.name)
        if (result !== undefined) {
            await list.incrementItem(result)
            inResponse.send("updated")
        }
        else {
            inResponse.send("error")
        }
    }
    catch (inError) {
        inResponse.send("error")
    }
})

app.put("/decrementQuantityMyList/", async  (inRequest: Request, inResponse: Response) => {
    try {
        let lists: myList[] = await list.listMylist()
        let result = lists.find(p => p.name == inRequest.body.item.name)
        if (result !== undefined) {
            await list.decrementItem(result)
            inResponse.send("updated")
        }
        else {
            inResponse.send("error")
        }
    }
    catch (inError) {
        inResponse.send("error")
    }
})

app.listen(8080, () => console.log("listening"))