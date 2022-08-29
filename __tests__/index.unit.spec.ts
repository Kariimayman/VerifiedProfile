import { context, PersistentVector } from "near-sdk-as";
import { Contract } from "../assembly/index";
import { Profile, verification } from "../assembly/models";


beforeAll(() => {
    contract = new Contract();
});

describe("create a profile", () => {
    it("should orint the statement 'This NEAR ID is already linked to another account' OR The statement 'Account Created Successfully'", () => {

        expect(Contract.createProfile()).toStrictEqual("This NEAR ID is already linked to another account" || "The statement 'Account Created Successfully")
        
    });
});














