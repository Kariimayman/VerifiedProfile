import { Contract } from "../assembly";
import { VMContext } from "near-mock-vm";
import { Profile, Verification } from "../assembly/models";
import { u128} from "near-sdk-as";


let profilee: Profile;
let profileOrNull:Profile|null;
let contractt: Contract;
let verr: Verification;
const CREATOR_ACCOUNT_ID = "someone.NEAR";
const CURRENT_ACCOUNT_ID = "someone.NEAR";
const PREDECESSOR_ACCOUNT_ID = "someone.NEAR";

beforeAll(() => {
    contractt = new Contract();
    VMContext.setSigner_account_id(CREATOR_ACCOUNT_ID);
    VMContext.setCurrent_account_id(CURRENT_ACCOUNT_ID);
    VMContext.setPredecessor_account_id(PREDECESSOR_ACCOUNT_ID);
});

// describe("Creating a profile", () => {
//     test("should print the statement 'Account Created Successfully'", () => {
//         expect(contractt.createProfile(profilee)).toBe("Account Created Successfully")
//     });
// });

describe("Getting a profile", () => {
    test("returns the account that is linked to a given NEAR ID", () => {

        expect(contractt.profilesList.get(CURRENT_ACCOUNT_ID)).toBe(CURRENT_ACCOUNT_ID)
        //When I run this I have an error 
        // const proffile = contractt.getProfile(CREATOR_ACCOUNT_ID)
        // expect(proffile?.accountID).toBe(PREDECESSOR_ACCOUNT_ID)
    });
});

describe("Verify an account", () => {
    

    test("assertion", () => {
        if (profileOrNull!= null) 
        expect(contractt.verifyAccount(CURRENT_ACCOUNT_ID, verr)).toBe("Account Verified Successfully")
    });


    test("verify account by the admin", () => {
        VMContext.setPredecessor_account_id("Owner.testnet")
        VMContext.setAttached_deposit(u128.from(1))
        expect(contractt.verifyAccount(CURRENT_ACCOUNT_ID, verr)).toBe("Account is missing")
    });
});

describe("Verify an account", () => {
    test("verify account by the admin", () => {
        VMContext.setPredecessor_account_id("Owner.testnet")
        VMContext.setAttached_deposit(u128.from(1))
        expect(contractt.verifyAccount(CURRENT_ACCOUNT_ID, verr)).toBe("Account is missing")
    });
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

describe("Deposit test", () => {
    test("Check if there is enough NEAR deposit", () => {
        VMContext.setPredecessor_account_id("Owner.testnet")
        VMContext.setAttached_deposit(u128.from(0.5))
        expect(() =>{contractt.verifyAccount(CURRENT_ACCOUNT_ID, verr)}).toThrow('1 NEAR is required')
    });
});

describe("Check account creation", () => {
    test("Check if The account is created successfully", () => {
        VMContext.setAttached_deposit(u128.from(1))
        let testprofile = contractt.createProfile("Name", "bio", "email", "website", "imageURL", 11111 ,CURRENT_ACCOUNT_ID )
        expect(testprofile.accountID).toBe(CURRENT_ACCOUNT_ID)
    }); 
});

describe("Check profileList", () => {
    test("Check if The account is added to profilelist", () => {
        VMContext.setAttached_deposit(u128.from(1))
        contractt.createProfile("Name", "bio", "email", "website", "imageURL", 11111 ,CURRENT_ACCOUNT_ID )
        expect(contractt.profilesList.contains(CURRENT_ACCOUNT_ID)).toBeTruthy
    });
    
});

describe("Check account id", () => {
    test("Check if The account id is set correctly", () => {
        VMContext.setAttached_deposit(u128.from(1))
        contractt.createProfile("Name", "bio", "email", "website", "imageURL", 11111 ,CURRENT_ACCOUNT_ID )
        let testProfile = contractt.getProfile(CURRENT_ACCOUNT_ID)
        if(testProfile != null)
        {
            expect(testProfile.accountID).toBe("someone.NEAR")
        }
        else
        {
            expect(testProfile).not.toBe(null)
        }  
    });
});
describe("account verification", () => {
    test("Check if account is verification is set successfully", () => {
        VMContext.setAttached_deposit(u128.from(1))
        let verification = new Verification()
        contractt.createProfile("Name", "bio", "email", "website", "imageURL", 11111 ,CURRENT_ACCOUNT_ID )
        VMContext.setPredecessor_account_id("Owner.testnet")
        let testProfile = contractt.verifyAccount(CURRENT_ACCOUNT_ID,verification)
        if(testProfile != null)
        {
            expect(testProfile.accountID).toBe("someone.NEAR")
        }
        else
        {
            expect(testProfile).not.toBe(null)
        }  
    });
    
});

describe("Check on verificationList", () => {
    test("Check if verifications are added to the verificationList successfully", () => {
        VMContext.setAttached_deposit(u128.from(1))
        let verification = new Verification()
        contractt.createProfile("Name", "bio", "email", "website", "imageURL", 11111 ,CURRENT_ACCOUNT_ID )
        VMContext.setPredecessor_account_id("Owner.testnet")
        let testProfile = contractt.verifyAccount(CURRENT_ACCOUNT_ID,verification)
        if(testProfile != null)
        {
            expect(testProfile.verificationList.length).toBe(1)
        }
        else
        {
            expect(testProfile).not.toBe(null)
        }  
    });
    
});

describe("isAccountVerified function", () => {
    test("Check if the function isAccountVerified works probably", () => {
        VMContext.setAttached_deposit(u128.from(1))
        let verification = new Verification()
        contractt.createProfile("Name", "bio", "email", "website", "imageURL", 11111 ,CURRENT_ACCOUNT_ID )
        VMContext.setPredecessor_account_id("Owner.testnet")
        contractt.verifyAccount(CURRENT_ACCOUNT_ID,verification)
        expect(contractt.isAccountVerified(CURRENT_ACCOUNT_ID)).toBeTruthy()
    }); 
});



















