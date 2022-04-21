const mongoose=require('mongoose');
const DB='mongodb+srv://rohanmandrai21:niddhi2024@cluster0.gic5i.mongodb.net/web_develop?retryWrites=true&w=majority'
//creating database
mongoose.connect(DB , {
    useNewUrlparser: true,
    useUnifiedTopology: true,
}).then(()=>{
    console.log("connection successfull")
}).catch((error)=>{
    console.log(error)
})