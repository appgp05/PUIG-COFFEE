const express = require("express");
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
app.use(cors());
const PORT = 3000;
const {Pool} = require("pg"); // librería pg con el objeto pool que permite instanciar una base de datos

const myPool = new Pool({
    user: "postgres",
    host: "coffee.c1i4e2kysd8l.us-east-1.rds.amazonaws.com",
    database: "postgres",
    password: "Alberto2024",
    port: 5432,
    ssl: {
      rejectUnauthorized: false,
    },
  });

  app.use(bodyParser.json());

app.listen(PORT, ()=> {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});



// GET ALL THE COFFEES              (COFFEE TABLE)
app.get("/coffee/getall", async (req, res)=>{     // cualquier petición que venga de películas (luego son dos parámetros de pregunta(request) y respuesta (response))
    const {rows} = await myPool.query(        // mediante myPool se puede hacer la query sin necesidad de crear motores // en java no hace falta hacer async await porque ya ejecuta las cosas en segundo plano de serie
        //'SELECT id, name, image, category, price, description FROM public."COFFEE";'
        'SELECT id, name, image, price, description FROM public."COFFEE";'
    );
    res.json(rows);
});



app.post("/coffee/getbycategory", async (req, res)=>{     // cualquier petición que venga de películas (luego son dos parámetros de pregunta(request) y respuesta (response))
    const { category } = req.body
    
    const {rows} = await myPool.query(        // mediante myPool se puede hacer la query sin necesidad de crear motores // en java no hace falta hacer async await porque ya ejecuta las cosas en segundo plano de serie
        //'SELECT id, name, image, category, price, description FROM public."COFFEE";'
        'SELECT id, name, image, price, description FROM public."COFFEE" WHERE "id" IN (SELECT "coffee" FROM "COFFEECATEGORY" WHERE "category" = $1);',
        [category]
    );
    res.json(rows);
});



// GET ALL THE ITEMS OF THE CART    (COFFEE TABLE)
app.post("/list", async (req, res)=>{     // cualquier petición que venga de películas (luego son dos parámetros de pregunta(request) y respuesta (response))
    const { shoppingcart } = req.body
    const {rows} = await myPool.query(        // mediante myPool se puede hacer la query sin necesidad de crear motores // en java no hace falta hacer async await porque ya ejecuta las cosas en segundo plano de serie
        //'SELECT id, name, image, category, price, description FROM public."COFFEE" WHERE ID IN (SELECT "Coffee" FROM public."CARTITEM" WHERE "ShoppingCart" = 1);'
        //'SELECT id, name, image, category, price, description FROM public."COFFEE" WHERE ID IN (SELECT "Coffee" FROM public."CARTITEM" WHERE "ShoppingCart" = $1 AND "Amount" > 0);',
        'SELECT id, name, image, price, description FROM public."COFFEE" WHERE ID IN (SELECT "Coffee" FROM public."CARTITEM" WHERE "ShoppingCart" = $1 AND "Amount" > 0);',
        [shoppingcart]
    );
    res.json(rows);
});

/*
app.get("/list", async (req, res)=>{     // cualquier petición que venga de películas (luego son dos parámetros de pregunta(request) y respuesta (response))
    const {rows} = await myPool.query(        // mediante myPool se puede hacer la query sin necesidad de crear motores // en java no hace falta hacer async await porque ya ejecuta las cosas en segundo plano de serie
        //'SELECT id, name, image, category, price, description FROM public."COFFEE" WHERE ID IN (SELECT "Coffee" FROM public."CARTITEM" WHERE "ShoppingCart" = 1);'
        'SELECT id, name, image, category, price, description FROM public."COFFEE" WHERE ID IN (SELECT "Coffee" FROM public."CARTITEM" WHERE "ShoppingCart" = 1 AND "Amount" > 0);'
    );
    res.json(rows);
});
*/



//  GET ITEM BY ID OF COFFEE         (CARTITEM TABLE)
app.post("/cartitem/getbycoffeeandshoppingcart", async (req, res)=>{
    try {
        const { coffee, shoppingcart } = req.body; 

        const {rows} = await myPool.query(
            'SELECT "ShoppingCart", "Coffee", "Amount" FROM public."CARTITEM" WHERE "Coffee" = $1 AND "ShoppingCart" = $2;',
            [coffee, shoppingcart]
        );
        res.json(rows);
    } catch (error) {
        console.error("Error trying to add coffee to shoppingcart:", error);
        res.status(500).json({ error: "Internal error" });
    }
});

/*
app.post("/cartitem/getbyid", async (req, res)=>{
    try {
        const { coffee } = req.body; 

        const {rows} = await myPool.query(
            'SELECT "ShoppingCart", "Coffee", "Amount" FROM public."CARTITEM" WHERE "Coffee" = $1;',
            [coffee]
        );
        res.json(rows);
    } catch (error) {
        console.error("Error trying to add coffee to shoppingcart:", error);
        res.status(500).json({ error: "Internal error" });
    }
});
*/


//  ADD ITEMS TO THE CART           (CARTITEM TABLE)
app.post("/cartitem/add", async (req, res) => {
    try {
        const { coffee, shopping_cart, amount } = req.body; 

        await myPool.query(
            //'INSERT INTO public."CARTITEM"("Coffee", "ShoppingCart", "Amount") VALUES ($1, $2, $3);',
            `INSERT INTO public."CARTITEM"("Coffee", "ShoppingCart", "Amount") VALUES ($1, $2, $3) ON CONFLICT ("Coffee", "ShoppingCart") DO UPDATE SET "Amount"= 1;`,
            [coffee, shopping_cart, amount]
        );
        res.status(200).json({ message: "Coffee added to shoppingcart" });
    } catch (error) {
        console.error("Error trying to add coffee to shoppingcart:", error);
        res.status(500).json({ error: "Internal error" });
    }
});



app.post("/cartitem/increaseamount", async (req, res) => {
    try{
        const { id, shoppingcart } = req.body;

        await myPool.query(
            'UPDATE public."CARTITEM" SET "Amount" = "Amount" + 1 WHERE "Coffee" = $1 AND "ShoppingCart" = $2;',
            [id, shoppingcart]
        );
        res.status(200).json({ message: ""})
    } catch (error) {

    }
})



app.post("/cartitem/decreaseamount", async (req, res) => {
    try{
        const { id, shoppingcart } = req.body;

        await myPool.query(
            'UPDATE public."CARTITEM" SET "Amount" = "Amount" - 1 WHERE "Coffee" = $1 AND "ShoppingCart" = $2;',
            [id, shoppingcart]
        );
        res.status(200).json({ message: "" });
    }catch (error) {
        console.error("", error);
        res.status(500).json({ error: "Internal error" });
    }
});



app.post("/cartitem/update", async (req, res) => {
    try{
        const { coffee, shoppingcart, amount} = req.body;

        await myPool.query(
            'UPDATE public."CARTITEM" SET "Amount" = $3 WHERE "Coffee" = $1 AND "ShoppingCart" = $2;',
            [coffee, shoppingcart, amount]
        )
        res.status(200).json({message: "" });
    } catch (error) {
        console.error("", error);
        res.status(500).json({ error: "Internal error" });
    }
});

app.post("/user/add", async (req, res) => {
    try{
    const { name, address, password, rol } = req.body;

    await myPool.query(
        //`INSERT INTO public."USER"(id, name, address, password) VALUES ($1, '$2', '$3', '$4');`,
        `INSERT INTO public."USER"(name, address, password, rol) VALUES ($1, $2, $3, $4);`,
        [name, address, password, rol]
    );
    res.status(200).json({message: "" });
    } catch (error){
        console.error("", error);
        res.status(500).json({ error: "Internal error" });
    }
});

app.post("/user/getbyname", async (req, res) => {
    try{
        const { name } = req.body;
    
        const {rows} = await myPool.query(
            `SELECT * FROM public."USER" WHERE "name" = $1;`,
            [name]
        );
        res.json(rows);
    }
    catch (error){

    }
});

app.post("/rol/getid", async (req, res) => {
    try{
        const { name } = req.body;
    
        const {rows} = await myPool.query(
            `SELECT "id" FROM public."ROL" WHERE "name" = $1;`,
            [name]
        );
        res.json(rows);
    }
    catch (error){

    }
});

app.post("/shoppingcart/getallbyuser", async (req, res) => {
    try{
        const { user } = req.body;
    
        const {rows} = await myPool.query(
            `SELECT * FROM public."SHOPPINGCART" WHERE "user" = $1 ORDER BY id DESC;`,
            [user]
        );
        res.json(rows);
    }
    catch (error){

    }
});

app.post("/shoppingcart/getid", async (req, res) => {
    try{
        const { user } = req.body;
    
        const {rows} = await myPool.query(
            `SELECT "id" FROM public."SHOPPINGCART" WHERE "user" = $1 AND "opened" = true;`,
            [user]
        );
        res.json(rows);
    }
    catch (error){

    }
});

app.post("/shoppingcart/set", async (req, res) => {
    try{
    const { user } = req.body;

    const { rows } = await myPool.query(
        `INSERT INTO public."SHOPPINGCART"(
            date, "user", opened)
            VALUES (CURRENT_DATE, $1, true);`,
            [ user ]
    )
    res.json(rows)
    } catch (error) {
        console.log(error)
    }
})

app.post("/shoppingcart/setpriceandamount", async (req, res) => {
    try{
    const { shoppingcart, totalprice, amountitems } = req.body;

    const { rows } = await myPool.query(
        `UPDATE public."SHOPPINGCART"
            SET totalprice = $2, amountitems = $3
            WHERE id = $1;`,
            [ shoppingcart, totalprice, amountitems ]
    )
    res.json(rows)
    } catch (error) {
        console.log(error)
    }
})

app.post("/shoppingcart/close", async (req,res) => {
    const { shoppingcart } = req.body

    const { rows } = await myPool.query(
        `UPDATE "SHOPPINGCART"
        SET "opened" = false
        WHERE id = $1;`,
        [ shoppingcart ]
    )

    res.json(rows)
})

app.get("/category/get", async (req, res) => {
    try{
    const { rows } = await myPool.query(
        `SELECT * FROM public."CATEGORY";`
    )
    res.json(rows)
    } catch (error) {
        console.log(error)
    }
})