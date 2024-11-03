import express from "express";
import mongoose from "mongoose";

const uri =
  "mongodb+srv://nimrodamos100:LWih3TnmTDIZfcm9@cluster0.rpdpi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(uri).then(() => {
  console.log("connected");
});

// import { MongoClient, ServerApiVersion } from "mongodb";

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   },
// });

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log(
//       "Pinged your deployment. You successfully connected to MongoDB!"
//     );
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);

const PORT = 3000;

const app = express();

app.get("/", (_req, res) => {
  res.send({
    message: "hello world",
  });
});

app.listen(PORT, () => {
  console.log(`server is running on port : ${PORT}`);
});
