const client = require('./db');
const { databaseDefName, usersContainer } = require('./config');

const container = client.database(databaseDefName).container(usersContainer);

async function postUser(req, res, next) {
    //validate
    if(!req.body.username || !req.body.password){
      res.status(409).json({'error': 'wrong data'});
      return
    }
    // znajdz czy user o danym username istnieje w kontenerze
    console.log('req.body.username')
    console.log(req.body.username)
    try{
      const { resources } = await container.items
      .query({
        query: "SELECT * from c WHERE c.username = @username",
        parameters: [{ name: "@username", value: req.body.username }]
      })
      .fetchAll();
      console.log('resources')
      console.log(resources)
    if(resources.length > 0){
      res.status(409).json({'error': 'user already exist'});
      return
    }
    } catch (err){
      console.log('err')
      console.log(err)
    }

    try{
        const { body } = await container.items.create(req.body);
        res.status(201).json(body);
    } catch(error){
        res.status(500).send(error)
    }
    return
}

// ograniczyc wyszukiwanie do partycji
async function getUserByUsername(username) {
  const { resources } = await container.items
  .query({
    query: "SELECT * from c WHERE c.username = @username",
    parameters: [{ name: "@username", value: username }]
  })
  .fetchAll();
  return resources[0]
}

async function updateUserByUsername(username, updateData) {
  console.log('searching user: ', username)
  const user = await getUserByUsername(username)
  const data = await container.items.upsert({...user, ...updateData});
  return data
}



module.exports = {
  postUser,
  getUserByUsername,
  updateUserByUsername
};