@nearBindgen
export class Profile {
    name: string;
    bio: string;
    email : string;
    website : string;
    imageURL : string;
    dateOfBirth : u64;
    accountID : string;
    verificationLevel : u8 = 0;
// A List that contains all the verification methods this profile acquired
    verificationList: Array<Verification> = new Array<Verification>(0)

// A constructor to intialize all the variables and set none added variables to "not found" (for the sake of testing only)
    constructor(name: string = "NotFound", bio: string= "NotFound", email: string= "NotFound", website: string= "NotFound", 
                imageURL: string= "NotFound", dateOfBirth: u64 = 11111 ,accountID : string = "NotFound") {
      this.name = name;
      this.bio = bio;
      this.email = email;
      this.website = website;
      this.imageURL = imageURL; 
      this.dateOfBirth = dateOfBirth;
      this.accountID = accountID;
    }
}

@nearBindgen
export class Verification{
    provider : string;
    level : u8;
    description : string
    
    constructor(provider : string = "Notfound", level : u8 = 0, description : string )
    {
        this.level = level
        this.provider = provider
        this.description = description
    }
}