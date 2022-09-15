import { context, PersistentMap, PersistentVector, u128} from "near-sdk-as";
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
  // A List contains all accounts ID
  usersAccountsId : PersistentVector<string> = new PersistentVector<string>("U");

  // This functions checks if the profile is already linked to this near account or not, if it isn't then it creates as new profile
  @mutateState()
  createProfile() : string {
    let accountID = context.sender
    assert(!this.profilesList.contains(accountID), "This NEAR ID is already linked to another account")
    this.profilesList.set(accountID, 0)
    this.usersAccountsId.push(accountID)  // Storage Users' Accounts IDs 
    return accountID
  }

  // assuming that the admin id is Owner.testnet
  @mutateState()
  verifyAccount(accountID : string, verification : verificationType ) : string{
    let adminProfile = "Owner.testnet"
    // assert(context.predecessor == adminProfile, "Access Denied")
    assert(this.profilesList.contains(accountID), "This NEAR ID is missing")
    this.profilesList.set(accountID, verification)
    return accountID
  }
  verificationPerUser(accountID : string): string
  {
    assert(context.predecessor == accountID, "Access Denied")
    let verificationType = this.profilesList.getSome(accountID)
    if(verificationType == 0)
    {
      return "New"
    }
    else if(verificationType == 1)
    {
      return "Pending"
    }
    else if(verificationType == 2)
    {
      return "Rejected"
    }
    else if(verificationType == 3)
    {
      return "Verified"
    }
    else if(verificationType == 4)
    {
      return "Spam"
    }
    return "Not Defined";
  }
  // This function acts as API to know if the account is Verified or not
  isAccountVerified(accountID : string): string{
    assert(context.attachedDeposit >= u128.from(1) , "1 NEAR is required")
    let verification = this.verificationPerUser(accountID)
    return verification
  }
  
  // This function returns users' accounts ID
  getusers() : Array<string> {
    let adminProfile = "kareemayman.testnet"
    assert(context.predecessor == adminProfile, "Access Denied")
    let users = new Array<string>(this.usersAccountsId.length)
    for (let i = 0; i < this.usersAccountsId.length; i++) {
      let user = this.usersAccountsId[i];
      users[i] = user;
    }
    return users;
  } 

  getPendingUsers() : Array<string> {
    let adminProfile = "kareemayman.testnet"
    assert(context.predecessor == adminProfile, "Access Denied")
    let users = new Array<string>(0)
    for (let i = 0; i < this.usersAccountsId.length; i++) {
      let Vtype = this.verificationPerUser(this.usersAccountsId[i])
      if(Vtype === "Pending")
      {
        users.push(this.usersAccountsId[i])
      }
    }
    return users;
  } 
 
}