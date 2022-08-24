import { Profile } from "./Profile";
import { context, PersistentVector } from "near-sdk-as";

export class Contract {
  // A List that contains all the registered profiles
  ProfilesList : PersistentVector<Profile> = new PersistentVector<Profile>("P");

  // This functions checks if the profile is already linked to this near account or not, if it isn't then it creates as new profile
  @mutateState()
  createProfile(
    Name: string,
    Bio: string,
    Email : string,
    Website : string,
    ImageURL : string,
    DateofBirth : string,
    NEARaccountID : string
  ): string {
    NEARaccountID = context.sender
    if(this.ProfileExist(NEARaccountID) == true)
    {
      return "This NEAR ID is already linked to another account"
    }
    let profile = new Profile(Name, Bio, Email, Website, ImageURL, DateofBirth);
    this.ProfilesList.push(profile)
    return "Account Created Successfully"
  }

// This function checks if there is a profile linked to a given NEAR ID or not and returns a boolean true or false
  @mutateState()
  ProfileExist(NEARaccountID: string) : boolean{
    for (let i = 0; i < this.ProfilesList.length; i++) {
      let profile = this.ProfilesList[i];
      if (profile.NEARaccountID == NEARaccountID) {
        return true;
      }
    }
    return false
  }

// This function returns the account that is linked to a given NEAR ID
/* WARNING : ALWAY USE ProfileExist() FUNCTION BEFORE USING THIS FUNCTION TO CHECK IF THERE IS ANY ACCOUNT TO RETURN*/ 
  @mutateState()
  getProfile(NEARaccountID: string): Profile {
    let profile = new Profile()
    for (let i = 0; i < this.ProfilesList.length; i++) {
      profile = this.ProfilesList[i];
      if (profile.NEARaccountID == NEARaccountID) {
        return profile;
      }
    }
    return profile;
  }
  
  // This function will be called by the front-end to add a verification method and only the "owner/admin" can access it
  // assuming that the admin id is Owner.testnet
  @mutateState()
  Verifyaccount(NEARaccountID : string , VerificationMethod : string) : string{
    if(context.sender == "Owner.testnet")
    {
      this.getProfile(NEARaccountID).AddVerification(VerificationMethod)
      return "Account Verified Successfully"
    }
    return context.sender + " Doesn't have permission to verify an account"
  }

}
 


