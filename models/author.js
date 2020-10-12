let mongoose = require('mongoose');

let Scheama = mongoose.Schema;

let AuthorSchema = new Scheama(
{
    first_name : { type : String , required : true , maxlength : 100 },
    family_name : { type : String, required : true , maxlength : 100 },
    date_of_birth : { type : Date},
    date_of_death : { type : Date }

}
)

// virtual for author's full name 

AuthorSchema
.virtual('name')
.get(function ( ){
    let fullName = '';
    if (this.first_name && this.family_name) {
        fullName = this.family_name + ', '+ this.first_name 
    }
    if (!this.first_name || this.family_name ){
        fullName = '';
    }

    return fullName ;
})


// virtual for author lifespan 
AuthorSchema
.virtual('lifeSpan')
.get(function (){
    return (this.date_of_birth.getYear() - this.date_of_death.getYear()).toString();
})

// virtual for author URL 
AuthorSchema
.virtual('url')
.get(function (){
    return '/catalog/author/' + this._id
})

// Export model 

module.exports = mongoose.model('Author',AuthorSchema)
