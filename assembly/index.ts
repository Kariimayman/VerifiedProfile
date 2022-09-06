import { context, PersistentMap, u128} from "near-sdk-as";

@nearBindgen
export class Contract {
  // A List that contains all the registered profiles
  profilesList : PersistentMap<string, bool> = new PersistentMap<string, bool>("P");

  // This functions checks if the profile is already linked to this near account or not, if it isn't then it creates as new profile
  @mutateState()
  createProfile() : string {
    let accountID = context.sender
    assert(!this.profilesList.contains(accountID), "This NEAR ID is already linked to another account")
    this.profilesList.set(accountID, false)
    return accountID
  }

  // This function will be called by the front-end to add a verification method and only the "owner/admin" can access it
  // assuming that the admin id is Owner.testnet
  @mutateState()
  verifyAccount(accountID:string) : string{
    let adminProfile = "Owner.testnet"
    assert(this.profilesList.contains(accountID), "This NEAR ID is missing")
    assert(context.predecessor == adminProfile, "Access Denied")
    this.profilesList.set(accountID, true)
    return accountID
  }

  // This function acts as API to know if the account is Verified or not
  isAccountVerified(accountID : string): bool{
    assert(context.attachedDeposit == u128.from(1), "1 NEAR is required")
    return this.profilesList.getSome(accountID)
  }

}