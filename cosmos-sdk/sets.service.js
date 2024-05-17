const client = require('./db');
const { databaseDefName, setsContainer, usersContainer } = require('./config');
const usersService = require('./users.service');


const container = client.database(databaseDefName).container(setsContainer);
const containerUsers = client.database(databaseDefName).container(usersContainer);

async function createSet(req, res, next) {
    if(!req.body.setName || !req.body.userName){
        res.status(409).json({'error': 'wrong data'});
        return
      }
      try{
        const {resource} = await container.items.create({...req.body, words: []});
        const {id: setId} = resource
        const user = await usersService.getUserByUsername(req.body.userName)
        const data = await usersService.updateUserByUsername(req.body.userName, {sets: [ setId, ...user.sets]})
        //  update user dodaj set
        res.status(201).json({'setName': 'setName'});
    } catch(error){
        console.log('error')
        console.log(error)
        res.status(500).send(error)
    }
}

async function getSetById(setId){
    const { resources } = await container.items
    .query({
      query: "SELECT * from c WHERE c.id = @id",
      parameters: [{ name: "@id", value: setId }]
    })
    .fetchAll();
    return resources[0]
}

async function getSet(req, res, next){
    const set = await getSetById(req.body.setId)
    return res.status(201).json(set);
}

async function createWord(req, res, next) {
    // {setName, userId, words: [{name: 'auto', definition: 'car'}]}
    const {setId, word} = req.body
    if(!setId || !word){
        res.status(409).json({'error': 'wrong data'});
        return
      }
      try{
        let set = await getSetById(setId)
        set = {...set, words: [word, ...set.words]}
        const data = await container.items.upsert(set);
        console.log('data')
        console.log(data.resource)
        res.status(201).json(word);
      } catch(err){
        console.log(err)
        res.status(409).json({'error': 'wrong data'});
      }
}



module.exports = {
    createSet,
    createWord,
    getSet
};