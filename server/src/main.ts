//module imports
import path from "path";
import express, {Express, NextFunction, Request, response, Response} from "express";
import * as Items from "./Items";
import { iItems } from "./Items";
import * as Mylist from "./Mylist";
import * as listFinalized from "./ListFinalized";
import {listFinal} from "./ListFinalized";
import {myList} from "./Mylist";

//Express app initialization
const app : Express = express();

//DB constructors initialized
const items: Items.Items = new Items.Items();
const list: Mylist.Mylist = new Mylist.Mylist()
const finalList: listFinalized.ListFinalized = new listFinalized.ListFinalized()

/**
 * Adding a piece of middleware to the Express app.
 * It allows the app to parse incoming request bodies that are in the JSON format.
 *
 * This is useful if we want to process data sent to the app in the HTTP request body,
 * such as when you are creating an API that receives data from the client in JSON format.
 * */
app.use(express.json());

//Defining the CORS security method
app.use("/", express.static(path.join (__dirname, "../../client/dist")));
//To make the update we needed to add to the cors the request HTTP PUT method
app.use(function(inRequest: Request, inResponse: Response, inNext : NextFunction ) {
    inResponse.header("Access-Control-Allow-Origin", "*");
    inResponse.header("Access-Control-Allow-Methods", "GET,POST,DELETE,PUT,OPTIONS");
    inResponse.header("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Accept");
    inNext();
});

/**
 * Handles the /addItem end point, that will pass as an argument an object of type iItems to get added to database items
 * and will then send a message "ok" to the console prompt
 * */
app.post("/addItem", async (inRequest: Request, inResponse: Response) => {
    try {
        await items.addItems(inRequest.body);
        inResponse.send("ok");
    } catch (inError) {
        inResponse.send("error") ;
    }
})

/**
 * Handles the /listMenuItems end point, returning in the response all items in the database.
 * */
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

/**
 * Handles the /addItemMyList end point, that will pass as an argument an object of type iItems to get added to database MyList,
 * and it will search if the item that was passed exists and then if it's not undefined will add to that database MyList, then
 * it will send to console prompt "ok"
 * */
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

/**
 * Handles the /listMylist end point, returning in the response all items in the database.
 * In case there are no items in the DB MyList, returns an empty array, and it will sort the items according to their name
 * */
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

/**
 * Handles the /addItemMyList end point, which will then proceed to delete the object with the id passed through the URL
 * inside the database MyList, and pass the message "ok" in the response
 * */
app.delete("/deleteItemMyList/:id", async (inRequest: Request, inResponse: Response) => {
    try {
        await list.deleteItemList(inRequest.params.id);
        inResponse.send("ok");
    } catch ( inError ) {
        inResponse.send("error") ;
    }
});

/**
 * Handles the /getFinalList end point, returning in the response all items in the database finalList.
 * In case there are no items in the DB finalList, returns an array that each object has an array of items that the user
 * has added.
 * */
app.get("/getFinalList", async (inRequest: Request, inResponse: Response) => {
    try {
        const lists: listFinal[] = await finalList.listFinalized()
        inResponse.json(lists)
    }
    catch ( inError) {
        inResponse.send("error")
    }
})

/**
 * Handles the /addItemFinalList end point, that will pass as an argument an object that has an array of type MyList
 * to get added to database FinalList, it will send to console prompt "ok"
 * */
app.post("/addItemFinalList", async (inRequest: Request, inResponse: Response) => {
    try {
        await finalList.addToFinal(inRequest.body);
        inResponse.send("ok");
    } catch (inError) {
        inResponse.send("error") ;
    }
})

/**
 * Handles the /addItemMyList end point, which will then proceed to delete every object inside the database MyList
 * */
app.delete("/deleteMyListDB", async  (inRequest: Request, inResponse: Response) => {
    try {
        await list.deleteDB();
        inResponse.send("deleted")
    }
    catch ( inError ) {
        inResponse.send("error")
    }
})

/**
 * Handles the /incrementQuantityMyList end point, which will then proceed to search if it exists in database MyList according
 * to the object name passed, if it's undefined it will pass in response the message "error" else it will increment the quantity
 * of the object and then pass as a response the message "updated"
 * */
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

/**
 * Handles the /decrementQuantityMyList end point, which will then proceed to search if it exists in database MyList according
 * to the object name passed, if it's undefined it will pass in response the message "error" else it will decrement the quantity
 * of the object and then pass as a response the message "updated"
 * */
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

/**
 * Starting the server and listening for incoming HTTP requests on port 8080.
 * And a callback function that logs the message 'listening' to the console, informing the user that the server is listening to any request
 * */
app.listen(8080, () => console.log("listening"))