import { Contract } from "../assembly";
import { VMContext } from "near-mock-vm";
import { Profile } from "../assembly/models";

let profilee: Profile;
let contractt: Contract;
const CREATOR_ACCOUNT_ID = "ali";


beforeAll(() => {
    contractt = new Contract();
    VMContext.setSigner_account_id(CREATOR_ACCOUNT_ID);
});

describe("Creating a profile", () => {
    test("should print the statement 'Account Created Successfully'", () => {

        expect(contractt.createProfile(profilee)).toBe("Account Created Successfully")
        
    });
});

describe("Getting a profile", () => {
    test("returns the account that is linked to a given NEAR ID", () => {

        expect(contractt.getProfile(CREATOR_ACCOUNT_ID)).toBe(contractt.profilesList.get(CREATOR_ACCOUNT_ID))
        
    });
});



















