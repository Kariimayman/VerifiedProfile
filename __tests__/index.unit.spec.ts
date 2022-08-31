import { Contract } from "../assembly";
import { VMContext } from "near-mock-vm";
import { Profile, Verification } from "../assembly/models";

let profilee: Profile;
let profileOrNull:Profile|null;
let contractt: Contract;
let verr: Verification;
const CREATOR_ACCOUNT_ID = "ali";
const CURRENT_ACCOUNT_ID = "someone";
const PREDECESSOR_ACCOUNT_ID = "ali"

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

        expect(contractt.profilesList.get(CURRENT_ACCOUNT_ID)).toBe(CURRENT_ACCOUNT_ID)
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
        expect(contractt.verifyAccount(CURRENT_ACCOUNT_ID, verr)).toBe("Account is missing")
    });
});



















