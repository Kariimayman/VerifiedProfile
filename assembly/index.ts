import { Profile, Verification } from "./models";
import { context, PersistentMap, u128} from "near-sdk-as";

@nearBindgen
export class Contract {
  // A List that contains all the registered profiles
  profilesList : PersistentMap<string, Profile> = new PersistentMap<string, Profile>("P");

  // This functions checks if the profile is already linked to this near account or not, if it isn't then it creates as new profile
  @mutateState()
  createProfile(profile : Profile): string {
    let accountID = context.sender
    assert(!this.profilesList.contains(accountID), "This NEAR ID is already linked to another account")
    this.profilesList.set(accountID,  profile)
    return "Account Created Successfully"
  }

// This function returns the account that is linked to a given NEAR ID
  getProfile(accountID: string): Profile | null {
    return this.profilesList.get(accountID)
  }
  
  // This function will be called by the front-end to add a verification method and only the "owner/admin" can access it
  // assuming that the admin id is Owner.testnet
  @mutateState()
  verifyAccount(accountID : string , VerificationMethod : Verification) : string{
    let profile = this.profilesList.get(accountID)
    let adminProfile = "Owner.testnet"
    assert(context.predecessor == adminProfile, "Access Denied")
    assert(context.attachedDeposit >= u128.from(1), "1 NEAR is required")
    if(profile != null)
    {
      profile.verificationList.push(VerificationMethod)
      return "Account Verified Successfully"
    }
    return "Account is missing"
  }

  // This function acts as API to know if the account is Verified or not
  isAccountVerified(accountID : string): bool{
    let profile = this.profilesList.get(accountID)
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
    assert(context.attachedDeposit >= u128.from(5), "5 NEAR is require")
    let profile = this.profilesList.get(accountID)
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