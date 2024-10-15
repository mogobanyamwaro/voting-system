// voting_test.js
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Voting", function () {
  let Voting;
  let voting;
  let owner, addr1, addr2, addr3;

  beforeEach(async function () {
    Voting = await ethers.getContractFactory("Voting");
    [owner, addr1, addr2, addr3] = await ethers.getSigners();

    voting = await Voting.deploy(["Proposal 1", "Proposal 2"]);
    // await voting.deployed();
  });

  describe("Initial Deployment", function () {
    it("should assign the deployer as chairperson", async function () {
      expect(await voting.chairperson()).to.equal(owner.address);
    });

    it("should initialize with the provided proposals", async function () {
      const proposal1 = await voting.proposals(0);
      const proposal2 = await voting.proposals(1);

      expect(proposal1[0]).to.equal("Proposal 1");
      expect(proposal1[1]).to.equal(0);

      expect(proposal2[0]).to.equal("Proposal 2");
      expect(proposal2[1]).to.equal(0);
    });
  });

  describe("Voter Registration", function () {
    it("should allow chairperson to register a voter", async function () {
      await voting.connect(owner).register(addr1.address);
      const voter = await voting.voters(addr1.address);

      expect(voter[0]).to.equal(true); // registered
      expect(voter[1]).to.equal(false); // voted
      expect(voter[2]).to.equal(0); // voteIndex
    });

    it("should prevent non-chairperson from registering a voter", async function () {
      await expect(
        voting.connect(addr1).register(addr2.address)
      ).to.be.revertedWith("Only chairperson can call this function");
    });

    it("should prevent registering the same voter twice", async function () {
      await voting.connect(owner).register(addr1.address);
      await expect(
        voting.connect(owner).register(addr1.address)
      ).to.be.revertedWith("Voter already registered");
    });
  });
});
