// import app
const app= require ("./backend/app");

// app is listening to request on port 3003
app.listen(3003, ()=>{
    console.log("app is listening on port 3003...");
});