import { Profile, Verification } from "./models";
import { context, PersistentMap} from "near-sdk-as";

@nearBindgen
export class Contract {
  // A List that contains all the registered profiles
  profilesList : PersistentMap<string, Profile> = new PersistentMap<string, Profile>("P");

  // This functions checks if the profile is already linked to this near account or not, if it isn't then it creates as new profile
  @mutateState()
  createProfile(profile : Profile): string {
    let accountID = context.sender
    if(this.profilesList.get(accountID) != null)
    {
      return "This NEAR ID is already linked to another account"
    }
    this.profilesList.set(accountID,  profile)
    return "Account Created Successfully"
  }

// This function returns the account that is linked to a given NEAR ID
  @mutateState()
  getProfile(accountID: string): Profile | null {
    return this.profilesList.get(accountID)
  }
  
  // This function will be called by the front-end to add a verification method and only the "owner/admin" can access it
  // assuming that the admin id is Owner.testnet
  @mutateState()
  verifyAccount(accountID : string , VerificationMethod : Verification) : string{
    let profile = this.getProfile(accountID)
    let adminProfile = "Owner.testnet"
    if(context.predecessor == adminProfile && profile != null)
    {
      profile.verificationList.push(VerificationMethod)
      if(VerificationMethod.level > profile.verificationLevel)
      {
        profile.verificationLevel = VerificationMethod.level
      }
      return "Account Verified Successfully"
    }
    return "An Error has occurred"
  }

  // This function acts as API to know if the account is Verified or not  
  isAccountVerified(accountID : string): bool{
    let profile = this.getProfile(accountID)
    if(profile != null)
    {
      if(profile.verificationList.length == 0)
      {
        return false;
      }
    }
    return true
  }

// This function return all the verification methods that this profile acquired
  getVerifications(accountID : string): Array<Verification> | null{
    let profile = this.getProfile(accountID)
    if(profile != null)
    {
      if(profile.verificationList.length == 0)
      {
        return null
      }
      else
      {
        let verificationList = new Array<Verification>(profile.verificationList.length);
        for (let i = 0; i < profile.verificationList.length; i++) {
          verificationList[i] = profile.verificationList[i];
        }
        return verificationList;
      }
    } 
    return null
  }
}
 
