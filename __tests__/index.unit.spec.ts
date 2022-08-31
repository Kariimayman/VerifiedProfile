import { Contract } from "../assembly";
import { VMContext } from "near-mock-vm";
import { Profile, Verification } from "../assembly/models";
import { u128} from "near-sdk-as";


let profilee: Profile;
let profileOrNull:Profile|null;
let contractt: Contract;
let verr: Verification;
const CREATOR_ACCOUNT_ID = "someone";
const CURRENT_ACCOUNT_ID = "someone";
const PREDECESSOR_ACCOUNT_ID = "someone";

beforeAll(() => {
    contractt = new Contract();
    VMContext.setSigner_account_id(CREATOR_ACCOUNT_ID);
    VMContext.setCurrent_account_id(CURRENT_ACCOUNT_ID);
    VMContext.setPredecessor_account_id(PREDECESSOR_ACCOUNT_ID);
});

describe("Creating a profile", () => {
    test("should print the statement 'Account Created Successfully'", () => {

        expect(contractt.createProfile(profilee)).toBe("Account Created Successfully")
        
    });
});

describe("Getting a profile", () => {
    test("returns the account that is linked to a given NEAR ID", () => {

        expect(contractt.getProfile(CURRENT_ACCOUNT_ID)).toBe(contractt.profilesList.get(CURRENT_ACCOUNT_ID))
        
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

// describe("Deposit test", () => {

//     test("NEAR deposit", () => {
//         VMContext.setPredecessor_account_id("Owner.testnet")
//         VMContext.setAttached_deposit(u128.from(0.5))
//         expect(contractt.verifyAccount(CURRENT_ACCOUNT_ID, verr)).toThrow('1 NEAR is required')
//     });
// });


describe("account verifcation", () => {
    test("Check if account is verified ", () => {
        contractt.createProfile(profilee)
        let testprofile = contractt.getProfile(CURRENT_ACCOUNT_ID)
        if(testprofile != null)
        {
            contractt.verifyAccount(CURRENT_ACCOUNT_ID,verr)
        }
        expect(contractt.isAccountVerified(CURRENT_ACCOUNT_ID)).toBeTruthy()
    });
    
});



















