pragma solidity ^0.5.0;

pragma experimental ABIEncoderV2;

import '@openzeppelin/contracts/utils/Address.sol';
import './SquareVerifier.sol';
import './ERC721Mintable.sol';

// TODO define a contract call to the zokrates generated solidity contract <Verifier> or <renamedVerifier>
library Verification {
    function verify(
        Verifier verifier, Verifier.Proof memory proof, uint[2] memory input
    ) public view returns(bool) {
        return verifier.verifyTx(proof, input);
    }
}

// TODO define another contract named SolnSquareVerifier that inherits from your ERC721Mintable class
contract SolnSquareVerifier is RealStateToken {
    using Address for address;

    // TODO define a solutions struct that can hold an index & an address
    struct Solution {
        uint256 index;
        address verifier;
    }

    // TODO define an array of the above struct
    Solution[] private _solutions;

    // TODO define a mapping to store unique solutions submitted
    mapping(address => Solution) private _solutionByAddress;

    // TODO Create an event to emit when a solution is added
    event SolutionAdded(uint256 index, address verifier);

    constructor(address _proxyRegistryAddress) public
            RealStateToken(_proxyRegistryAddress) {
    }

    // TODO Create a function to add the solutions to the array and emit the event
    function addSolution(address verifier) public onlyOwner {
        uint256 index = _solutions.length;
        Solution memory solution = Solution(index, verifier);
        _solutions.push(solution);
        _solutionByAddress[verifier] = solution;

        emit SolutionAdded(index, verifier);
    }

    // TODO Create a function to mint new NFT only after the solution has been verified
    //  - make sure the solution is unique (has not been used before)
    //  - make sure you handle metadata as well as tokenSuplly
    function mintAfterVerify(
        address to, uint256 tokenId, address verifier,
        Verifier.Proof memory proof, uint[2] memory input
    ) public {
        // if solution's verifier field is zero, then solution didn't exit before
        require(_solutionByAddress[verifier].verifier == address(0),
                "Solution has been used before");
        // make sure the address is of a contract
        require(verifier.isContract(), "Verifier is not a contract");
        // verify() will return true if proof and input are correct
        require(Verification.verify(
                     Verifier(verifier), proof, input), "Given proof is invalid");

        addSolution(verifier);

        super.mint(to, tokenId);
    }

}
