import express, { json } from "express";
import fs, { read } from "fs";
import bodyParser from "body-parser";


const app=express();
app.use(bodyParser.json());

const readData=()=>{
    try{
        const data=fs.readFileSync("./db.json")
        return(JSON.parse(data));

    }catch(error){
        console.log(error);
    };
   
};

const writeData=(data)=>{
    try{
        fs.writeFileSync("./db.json",JSON.stringify(data));

    }catch(error){
        console.log(error);
    };
}

app.get("/",(req,res)=>{
    res.send("Hola es mi primera vez haciendo API");
});

app.get("/perfumes",(req,res)=>{
    const data=readData();
    res.json(data.perfumes);
})

app.get("/perfumes/:id",(req,res)=>{
    const data=readData();
    const id=parseInt(req.params.id);
    const perfume=data.perfumes.find((perfume)=>perfume.id===id);
    res.json(perfume);

});

app.post("/perfumes/:id",(req,res)=>{
    const data=readData();
    const body=req.body;
    const newPerfume={
        id:data.perfumes.length + 1,
        ...body,
    };
    data.perfumes.push(newPerfume);
    writeData(data);
    res.json(newPerfume);
    });

    app.put("/perfumes/:id",(req,res)=>{
        const data=readData();
        const body=req.body;
        const id=parseInt(req.params.id);
        const perfumeIndex=data.perfumes.findIndex((perfume)=>perfume.id===id);
        data.perfumes[perfumeIndex]={
            ...data.perfumes[perfumeIndex],
            ...body,
        };
        writeData(data);
        res.json({message:"Los perfumes fueron actualizados correctamente"})


    });
        
    app.delete("/perfumes/:id",(req,res)=>{
        const data=readData();
        const id=parseInt(req.params.id);
        const perfumeIndex=data.perfumes.findIndex((perfume)=>perfume.id===id);
        data.perfumes.splice(perfumeIndex,1);
        writeData(data);
        res.json({message:"perfume borrado con exito"});
    });



app.listen(3000,()=>{
    console.log("Server listening on por 3000")
})