import { context, PersistentMap, u128} from "near-sdk-as";
export const enum verificationType {
  New = 0,
  Pending = 1,
  Rejected = 2,
  Verified = 3,
  Spam = 4
}
@nearBindgen
export class Contract {
  // A List that contains all the registered profiles
  profilesList : PersistentMap<string, verificationType> = new PersistentMap<string, verificationType>("P");

  // This functions checks if the profile is already linked to this near account or not, if it isn't then it creates as new profile
  @mutateState()
  createProfile() : string {
    let accountID = context.sender
    assert(!this.profilesList.contains(accountID), "This NEAR ID is already linked to another account")
    this.profilesList.set(accountID, verificationType.New)
    return accountID
  }

  // assuming that the admin id is Owner.testnet
  @mutateState()
  verifyAccount(accountID : string, verification : verificationType ) : string{
    let adminProfile = "Owner.testnet"
    assert(this.profilesList.contains(accountID), "This NEAR ID is missing")
    assert(context.predecessor == adminProfile, "Access Denied")
    this.profilesList.set(accountID, verification)
    return accountID
  }

  // This function acts as API to know if the account is Verified or not
  isAccountVerified(accountID : string): verificationType{
    assert(context.attachedDeposit == u128.from(1), "1 NEAR is required")
    return this.profilesList.getSome(accountID)
  }

}