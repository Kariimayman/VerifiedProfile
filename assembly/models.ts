@nearBindgen
export class Profile {
    name: string;
    bio: string;
    email : string;
    website : string;
    imageURL : string;
    dateOfBirth : u64;
    accountID : string;
// A List that contains all the verification methods this profile acquired
    verificationList: Array<Verification> = new Array<Verification>(0)

// A constructor to intialize all the variables and set none added variables to "not found" (for the sake of testing only)
    constructor(name: string , bio: string, email: string, website: string, 
                imageURL: string ,dateOfBirth: u64) {
      this.name = name;
      this.bio = bio;
      this.email = email;
      this.website = website;
      this.imageURL = imageURL; 
      this.dateOfBirth = dateOfBirth;
    }

    getVerificationLevel() : u8
    {
        let max : u8 = 0
        for (let i = 0; i < this.verificationList.length; ++i)
        {
            if(max > this.verificationList[i].level)
            {
                max = this.verificationList[i].level
            }
        }
        return max
    }
}

@nearBindgen
export class Verification{
    provider : string;
    level : u8;
    description : string
    
    constructor(provider : string, level : u8 , description : string )
    {
        this.level = level
        this.provider = provider
        this.description = description
    }
}