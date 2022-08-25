import { Profile } from "./Profile";
import { context, PersistentVector } from "near-sdk-as";

@nearBindgen
export class Contract {
  // A List that contains all the registered profiles
  profilesList : PersistentVector<Profile> = new PersistentVector<Profile>("P");

  // This functions checks if the profile is already linked to this near account or not, if it isn't then it creates as new profile
  @mutateState()
  createProfile(
    name: string,
    bio: string,
    email : string,
    website : string,
    imageURL : string,
    dateofBirth : string,
  ): string {
    let accountID = context.predecessor
    let profile = this.getProfile(accountID)
    if(profile != null)
    {
      return "This NEAR ID is already linked to another account"
    }
    profile = new Profile(name, bio, email, website, imageURL, dateofBirth, accountID);
    this.profilesList.push(profile)
    return "Account Created Successfully"
  }

// This function returns the account that is linked to a given NEAR ID
  @mutateState()
  getProfile(accountID: string): Profile | null {
    for (let i = 0; i < this.profilesList.length; i++) {
      let profile = this.profilesList[i];
      if (profile.accountID == accountID) {
        return profile;
      }
    }
    return null;
  }
  
  // This function will be called by the front-end to add a verification method and only the "owner/admin" can access it
  // assuming that the admin id is Owner.testnet
  @mutateState()
  verifyaccount(accountID : string , VerificationMethod : string) : string{
    let profile = this.getProfile(accountID)
    if(context.predecessor == "Owner.testnet" && profile != null)
    {
      profile.verifications.push(VerificationMethod)
      return "Account Verified Successfully"
    }
    return "An Error has occurred"
  }

  // This function acts as API to know if the account is Verified or not  
//   isAccountVerified(accountID : string): Boolean{
//     let profile = this.getProfile(accountID)
//     if(profile != null)
//     {
//       if(profile.verifications.length == 0)
//       {
//         return false;
//       }
//     }
//     return true
// }

// This function return all the verification methods that this profile acquired
  getVerifications(accountID : string): Array<string> | null{
    let profile = this.getProfile(accountID)
    if(profile != null)
    {
      if(profile.verifications.length == 0)
      {
        return null
      }
      else
      {
        let Verifications = new Array<string>(profile.verifications.length);
        for (let i = 0; i < profile.verifications.length; i++) {
          Verifications[i] = profile.verifications[i];
        }
        return Verifications;
      }
    } 
    return null
  }
}
 
