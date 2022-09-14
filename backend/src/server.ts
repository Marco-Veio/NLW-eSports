import express from "express";

const app = express();

app.use(express.json());

app.get("/ads", (request, response) => {
  return response.json([
    { id: 1, name: "Ad 1" },
    { id: 2, name: "Ad 2" },
    { id: 3, name: "Ad 3" },
  ]);
});

app.listen(3333);
