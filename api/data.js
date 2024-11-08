import { Router } from 'express';
let router = Router();

let data = [
    { "id": "1", "Firstname": "Tero", "Surname": "Halonen" },
    { "id": "2", "Firstname": "Jan", "Surname": "Šušteršič"}
];

router.get('/',(req, res) => {
    res.json(data);
});

router.get('/:id',(req, res) => {
    res.json(data.find(b => b.id === req.params.id));
});

router.post('/',(req, res) => {
    if (data.find(b => b.id === req.body.id)){
        res.status(409).json({"error": "record already exists"});
    } else {
        data = [...data, req.body];
        res.json(req.body);
    }
});

export default router;