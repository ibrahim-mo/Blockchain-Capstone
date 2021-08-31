var Verifier = artifacts.require('Verifier');
var SolnSquareVerifier = artifacts.require('SolnSquareVerifier');
var fs = require('fs');
var proof = JSON.parse(fs.readFileSync('zokrates/code/square/proof.json'));

contract('TestSolnSquareVerifier', accounts => {

    const account_one = accounts[0];
    const account_two = accounts[1];

    var solnVerifier;
    before('setup contract', async () => {
        solnVerifier = await SolnSquareVerifier.new(account_one, {from: account_one});
    });

    // Test if a new solution can be added for contract - SolnSquareVerifier
    it('should add solution', async function () {
        let fail = false;
        try {
            await solnVerifier.addSolution(account_two, {from: account_one});
        }
        catch(e) {
            fail = true;
            // console.log(e.message);
        }
        assert.equal(fail, false);
    });

    // Test if an ERC721 token can be minted for contract - SolnSquareVerifier
    it('should mint erc721 token', async function () {
        let verifier = await Verifier.new({from: account_one});
        let tokenID = 0;
        let fail = false;
        try {
            await solnVerifier.mintAfterVerify(account_two, tokenID, verifier.address,
                        proof.proof, proof.inputs, {from: account_one});
        }
        catch(e) {
            fail = true;
            // console.log(e.message);
        }
        assert.equal(fail, false);

        // verify total supply
        let totalSupply = await solnVerifier.totalSupply.call();
        assert.equal(totalSupply.toNumber(), 1);
        // veryify balance of token owner
        let balance2 = await solnVerifier.balanceOf(account_two);
        assert.equal(balance2.toNumber(), 1);
        // verify meta data
        let name = await solnVerifier.name.call();
        let symbol = await solnVerifier.symbol.call();
        let tokenURI = await solnVerifier.tokenURI.call(tokenID);
        assert.equal(name, 'Real State Token');
        assert.equal(symbol, 'RST');
        assert.equal(tokenURI, 'https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/0');
    });

});
