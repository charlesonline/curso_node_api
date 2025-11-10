const express = require('express');

const server = express();

server.use(express.json());

const cursos = ['PHP','JAVA','PYTHON','GO','DART'];

//sobre midleware
server.use((req,res,next)=>{
    console.log(`URL: ${req.url}`);
    return next();
});

function checkCursos(req,res,next) {
    if (!req.body.nome) {
        return res.status(400).json({error:"O campo nome é obrigatório!"});
    }

    return next();
}

function checkIndexs(req,res,next) {
    const curso = cursos[req.params.index];

    if (!curso) {
        return res.status(400).json({error:"Este curso não esxiste!"});
    }

    req.curso = curso;

    return next();
}

server.get('/cursos', (req, res) => {
    return res.json(cursos);
});

server.get('/cursos/:index', checkIndexs, (req, res) => {
    // const {index} = req.params;
    return res.json({
        // curso: cursos[index],
        curso: req.curso,
    });
});

server.post('/cursos', checkCursos, (req,res) => {
    const {nome} = req.body;
    cursos.push(nome);
    return res.json(cursos);
});

server.put('/cursos/:index', checkIndexs, checkCursos, (req,res) => {
    const {index} = req.params;
    const {nome} = req.body;
    cursos[index] = nome;
    return res.json(cursos);
});

server.delete('/cursos/:index', checkIndexs, (req,res) => {
    const {index} = req.params;
    cursos.splice(index,1);
    return res.json({"status":"Sucesso"});
});

// server.get('/curso/:id', (req, res) => {
//     // const nome = req.query.nome;
//     const id = req.params.id;
//     //return res.send('Hello word');
//     return res.json({
//         curso: `Aprendendo ${nome}, id: ${id}`
//     });
// });

server.listen('3000');
