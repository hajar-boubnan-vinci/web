"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const films = [
    {
        id: 1,
        title: "Inception",
        director: "Christopher Nolan",
        duration: 148,
        budget: 160,
        description: "A mind-bending thriller",
        imageUrl: "https://example.com/inception.jpg"
    },
    {
        id: 2,
        title: "The Matrix",
        director: "Lana Wachowski, Lilly Wachowski",
        duration: 136,
        budget: 63,
        description: "A sci-fi classic",
        imageUrl: "https://example.com/matrix.jpg"
    },
    {
        id: 3,
        title: "Interstellar",
        director: "Christopher Nolan",
        duration: 169,
        budget: 165,
        description: "A journey through space and time",
        imageUrl: "https://example.com/interstellar.jpg"
    }
];
router.get("/", (_req, res) => {
    res.json(films);
});
exports.default = router;