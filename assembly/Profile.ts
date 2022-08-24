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
  
    constructor(Name: string, Bio: string, Email: string, Website: string, ImageURL: string, DateofBirth: string) {
      this.Name = Name;
      this.Bio = Bio;
      this.Email = Email;
      this.Website = Website;
      this.ImageURL = ImageURL;
      this.DateofBirth = DateofBirth;
      this.NEARaccountID = context.sender;
    }
    @mutateState()
    AddVerification(VerificationMethod : string): string{
        this.Verifications.push(VerificationMethod);
        return VerificationMethod;
    }
    isAccountVerified(): Boolean{
        if(this.Verifications.length == 0)
        {
            return false;
        }
        return true
    }

    GetVerifications(): Array<string>{
        let Verifications = new Array<string>(this.Verifications.length);
        for (let i = 0; i < this.Verifications.length; i++) {
            Verifications[i] = this.Verifications[i];
        }
        return Verifications;
    }
}
