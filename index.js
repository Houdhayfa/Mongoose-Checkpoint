const mongoose=require('mongoose')
const server = '127.0.0.1:27017'

//connect to database
mongoose.connect(`mongodb://${server}/myData`,{ useNewUrlParser: true, useUnifiedTopology: true })
.then(console.log(`CONNECTED TO MONGODB ON ${server}...`))
.catch((err)=>console.error('Failed To connect to mongoDB',err))

//Creating a Person prototype

const personSchema=mongoose.Schema({
    name:{type:String,required:true},
    age:{type:Number},
    favoriteFoods:{type:[String]}

})
//saving a person document
const Person=mongoose.model('person',personSchema)
const person1=new Person({
    name:"Paul",
    age:28,
    favoriteFoods:["sea food","meat"]
})
person1.save()
.then((data) => console.log(`PAUL SAVED:${data}`))
.catch((err) => console.log(err))

// creating many documents

const groupe1=[
    {
      name:"james",
      age:33,
      favoriteFoods:["tomatos","beaf"]  
    },
    {
        name:"Laila",
        age:40,
        favoriteFoods:["Couscous","kafteji"]  
      },
      {
        name:"Jean-Luc",
        age:55,
        favoriteFoods:["39od","Ras Mosli"]  
      },
]
Person.create(groupe1)
.then((data) => console.log(`GROUPE OF PEOPLE CREATED:${data}`))
.catch((err) => console.log(err))// or we can use inserMany(array)

//find  persons documents by name

Person.find({name:"Jean-Luc"})
.then((data) => console.log(`FIND MANY PEOPLE BY NAME JEAN-LUC:${data}`))
.catch((err) => console.log(err))



//find  a single person document by name

Person.findOne({name:"Jean-Luc"})
.then((data) => console.log(`FIND SINGLE PERSON BY NAME JEAN-LUC${data}`))
.catch((err) => console.log(err))

// //find  a single person document by favorite food

Person.findOne({favoriteFoods:"Couscous"})
.then((data) => console.log(`FIND SINGLE PERSON BY FAVORITE FOOD COUSCOUS${data}`))
.catch((err) => console.log(err))

// //find  a single person document by id

Person.findById("5f805e02049d030764e19ec5")
.then((data) => console.log(`FIND SINGLE PERSON BY ID 5f805e02049d030764e19ec5${data}`))
.catch((err) => console.log(err))

//find edit then save 
const addFavoriteFood= (_id) => {
    Person.findById(_id,(err,data) =>{
        data.favoriteFoods.push("hamburger")
        data.save()
        .then(()=>console.log("HAMBURGER ADDED TO THE LIST"))
        .catch((err) => console.log(err))
    })
}

// Updating using findOneAndUpdate

Person.findOneAndUpdate({name:"Paul"},{$set:{name:"Jeremy"}})
.then((data) => console.log(data))
.catch((err) => console.log(err))


// deleting record

Person.findByIdAndRemove({name:"Laila"})
.then((data) => console.log(data))
.catch((err) => console.log(err))

// delete many people

Person.deleteMany({favoriteFoods:"Couscous"})
.then((data) => console.log(data))
.catch((err) => console.log(err))

// complex search query

UserModel.find({favoriteFoods:"Couscous"})                   // find all persons that love Couscous
         .limit(2)                // limit to 10 items
         .sort({name: 1})     // sort ascending by name
         .select({name: true, favoriteFoods:true}) // select firstName only
         .exec()                   
         .then(docs => {
            console.log(docs)
          })
         .catch(err => {
            console.error(err)
          })
         
