@nearBindgen
export class Profile {
    name: string;
    bio: string;
    email : string;
    website : string;
    imageURL : string;
    dateofBirth : string;
    accountID : string;
// A List that contains all the verification methods this profile acquired
    verifications : Array<string> = new Array<string>(0)

// A constructor to intialize all the variables and set none added variables to "not found" (for the sake of testing only)
    constructor(name: string = "NotFound", bio: string= "NotFound", email: string= "NotFound", website: string= "NotFound", 
                imageURL: string= "NotFound", dateofBirth: string= "NotFound",accountID : string = "NotFound") {
      this.name = name;
      this.bio = bio;
      this.email = email;
      this.website = website;
      this.imageURL = imageURL; 
      this.dateofBirth = dateofBirth;
      this.accountID = accountID;
    }
}