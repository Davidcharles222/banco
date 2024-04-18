const database = require("./database")

/* INSERT
var dados = [
    {
        nome: "Call of duty 2",
        preco: 60
    },
    {
        nome: "GTA",
        preco: 70
    },
    {
        nome: "God of war",
        preco: 95
    },
]

database.insert(dados).into("games").then(data => {
    console.log(data)
}).catch(err => {
    console.log(err)
})
*/

/* SELECT
database.select(["id","preco"]).table("games").then(data => {
    console.log(data)
}).catch(error => {
    console.log(error)
})
*/

/* NESTED QUERIES
database.insert({nome: "Mists of noyah", preco: 25}).into("games").then(data =>{
    database.select(["id","preco"]).table("games").then(data => {
        console.log(data)
    }).catch(error => {
        console.log(error)
    })
    console.log(data)
}).catch(error => {
    console.log(error)
})
*/

/* WHERE
database.select().whereRaw("nome = 'Mists of Noyah' OR preco > 120").table("games").then(data => {
    console.log(data)
}).catch(error => {
    console.log(error)
})
*/

/* RAW
database.raw("SELECT * FROM games").then(data => {
    console.log(data)
}).catch(error => {
    console.log(error)
})
*/

/* DELETE
database.where({id: 1}).delete().table("games").then(data => {
    console.log(data)
}).catch(error => {
    console.log(error)
})
*/

/* UPDATE
database.where({id: 2}).update({preco: 100}).table("games").then(data => {
    console.log(data)
}).catch(error => {
    console.log(error)
})
*/

/* ORDER BY
database.select().table("games").orderBy("nome","desc").then(data => {
    console.log(data)
}).catch(error => {
    console.log(error)
})
*/

/* ASSOCIATED INSERTS -> CRIANDO A CHAVE ESTRANGEIRA PARA RELACIONAR AS TABELAS
database.insert({
    nome: "Blizzard",
    game_id: 25
}).table("estudios").then(data => {
    console.log(data)
}).catch(error => {
    console.log(error)
})
*/

/* INNER JOIN 1 PARA 1
database.select(["games.*","estudios.nome as estudio_nome"]).table("games").innerJoin("estudios","estudios.game_id","games.id").then(data => {
    console.log(data)
}).catch(error => {
    console.log(error)
})
*/

/*
database.select(["games.*","estudios.nome as estudio_nome"]).table("games").innerJoin("estudios","estudios.game_id","games.id").where("games.id",25).then(data => {
    console.log(data)
}).catch(error => {
    console.log(error)
})
*/

/* 1 PARA M
database.select(["games.*","estudios.nome as estudio_nome"]).table("games").innerJoin("estudios","estudios.game_id","games.id").then(data => {
    
    var game = {
        id: 0,
        nome: "",
        estudios: []
    }
    
    game.id = data[0].id;
    game.nome = data[0].nome;

    data.forEach(estudio => {
        game.estudios.push({nome: estudio.estudio_nome});
    })

    console.log(game)

}).catch(error => {
    console.log(error)
})
*/

/* M PARA M
database.select([
    "estudios.nome as estudio_nome",
    "games.nome as game_nome",
    "games.preco"
    ]).table("games_estudios")
    .innerJoin("estudios","estudios.id","games_estudios.estudio_id")
    .innerJoin("games","games.id","games_estudios.game_id")
    .where("games.id",25)
    .then(data => {
        console.log(data)
    }).catch(err => {
        console.log(err)
    })
*/

/* M PARA M
database.select([
   "estudios.nome as estudio_nome",
   "games.nome as game_nome",
   "games.preco"
   ]).table("games_estudios")
  .innerJoin("estudios","estudios.id","games_estudios.estudio_id")
  .innerJoin("games","games.id","games_estudios.game_id")
  .where("games.id",25)
  .then(data => {
        console.log(data)
   }).catch(err => {
    console.log(err)
   })
*/

async function testeTransacao(){

    try{
        await database.transaction(async trans => {
            await database.insert({nome: "Qualquer nome"}).table("estudios")
            await database.insert({nome: "Pyxerelia"}).table("estudios")
            await database.insert({nome: "Mojang"}).table("estudios")
            await database.insert({nome: "Gearbox"}).table("estudios")
        })
    }catch(error){
        console.log(error)
    }
}

testeTransacao()