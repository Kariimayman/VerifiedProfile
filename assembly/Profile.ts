import { context, PersistentVector } from "near-sdk-as";

@nearBindgen
export class Profile {
    Name: string;
    Bio: string;
    Email : string;
    Website : string;
    ImageURL : string;
    DateofBirth : string;
    NEARaccountID : string;
    Verifications : PersistentVector<string> = new PersistentVector<string>("V")

// A constructor to intialize all the variables and set none added variables to "not found" (for the sake of testing only)
    constructor(Name: string = "NotFound", Bio: string= "NotFound", Email: string= "NotFound", Website: string= "NotFound", 
                ImageURL: string= "NotFound", DateofBirth: string= "NotFound") {
      this.Name = Name;
      this.Bio = Bio;
      this.Email = Email;
      this.Website = Website;
      this.ImageURL = ImageURL;
      this.DateofBirth = DateofBirth;
      this.NEARaccountID = context.sender;
    }

// This function will be called by the front end to add a verfication method to the profile 
    @mutateState()
    AddVerification(VerificationMethod : string): PersistentVector<string>{
        this.Verifications.push(VerificationMethod);
        return this.Verifications;
    }

// This function acts as API to know if the account is Verified or not  
    isAccountVerified(): Boolean{
        if(this.Verifications.length == 0)
        {
            return false;
        }
        return true
    }

// This function return all the verification methods that this profile accrued
    GetVerifications(): Array<string>{
        if(this.Verifications.length == 0)
        {
            let Verifications = new Array<string>(1);
            Verifications.push("Account Not Verified")
            return Verifications;
        }
        else
        {
            let Verifications = new Array<string>(this.Verifications.length);
            for (let i = 0; i < this.Verifications.length; i++) {
                Verifications[i] = this.Verifications[i];
            }
            return Verifications;
        }
    }
}
