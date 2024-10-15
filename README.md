# Voting Smart Contract - Testing with Hardhat

## Overview

This project implements a simple voting system using a smart contract written in Solidity. The contract allows the chairperson to register voters and manage voting on proposals. This README outlines the testing approach, instructions on running the tests, and some key observations.

---

## Smart Contract Features

- **Chairperson Role**: Only the deployer of the contract (chairperson) can register voters.
- **Voter Registration**: Only registered voters can vote on proposals.
- **Voting**: Registered voters can vote for a proposal exactly once.
- **Winning Proposal**: The contract determines the proposal with the highest votes.

---

## Testing Approach

We use the Hardhat framework along with the Chai assertion library to write unit tests for the `Voting` smart contract. The test cases focus on:

1. **Initial Deployment**:

   - Ensures that the chairperson is correctly assigned.
   - Verifies that proposals are initialized with the correct description and vote count.

2. **Voter Registration**:

   - Confirms that only the chairperson can register voters.
   - Prevents duplicate registration of voters.

3. **Voting**:
   - Ensures that only registered voters can vote.
   - Confirms that votes are recorded correctly and voters can only vote once.

---

## Running the Tests

### Prerequisites

Ensure you have the following installed on your machine:

- **Node.js** (v18.20.4 or higher)
- **Hardhat** (installed via npm)
- **Git** (optional, for cloning the repository)

### Steps to Run the Tests

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the tests:
   ```bash
   npx hardhat test
   ```

### Example Output

Below is an example of what the output will look like when the tests pass:

```bash
  Voting
    Initial Deployment
      ✔ should assign the deployer as chairperson (45ms)
      ✔ should initialize with the provided proposals (60ms)

    Voter Registration
      ✔ should allow chairperson to register a voter (78ms)
      ✔ should prevent non-chairperson from registering a voter (25ms)
      ✔ should prevent registering the same voter twice (29ms)
```
