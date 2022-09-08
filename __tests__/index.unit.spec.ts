import { Contract } from "../assembly";
import { VMContext } from "near-mock-vm";
import { u128} from "near-sdk-as";

let contractt: Contract;
const CREATOR_ACCOUNT_ID = "someone.NEAR";
const CURRENT_ACCOUNT_ID = "someone.NEAR";
const PREDECESSOR_ACCOUNT_ID = "Owner.testnet";

beforeAll(() => {
    contractt = new Contract();
    VMContext.setSigner_account_id(CREATOR_ACCOUNT_ID);
    VMContext.setCurrent_account_id(CURRENT_ACCOUNT_ID);
    VMContext.setPredecessor_account_id(PREDECESSOR_ACCOUNT_ID);
});


describe("isAccountVerified function", () => {
    test("Check if the function isAccountVerified works probably", () => {
        VMContext.setSigner_account_id("someone.NEAR")
        contractt.createProfile()
        expect(contractt.profilesList.contains(CURRENT_ACCOUNT_ID)).toBeTruthy()
    }); 
});

describe("isAccountVerified function", () => {
    test("2", () => {
        VMContext.setSigner_account_id("someone.NEAR")
        contractt.createProfile()
        VMContext.setAttached_deposit(u128.from(1))
        VMContext.setPredecessor_account_id("Owner.testnet")
        contractt.verifyAccount("someone.NEAR" , 2)
        expect(contractt.isAccountVerified("someone.NEAR")).toBe("2")
    }); 
});