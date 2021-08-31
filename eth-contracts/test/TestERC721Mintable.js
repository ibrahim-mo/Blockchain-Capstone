var RealStateToken = artifacts.require('RealStateToken');

contract('TestERC721Mintable', accounts => {

    const account_one = accounts[0];
    const account_two = accounts[1];

    describe('match erc721 spec', function () {
        beforeEach(async function () { 
            this.contract = await RealStateToken.new(account_one, {from: account_one});

            // TODO: mint multiple tokens
            await this.contract.mint(account_one, 0, {from: account_one});
            await this.contract.mint(account_two, 1, {from: account_one});
            await this.contract.mint(account_two, 2, {from: account_one});
        })

        it('should return total supply', async function () { 
            let totalSupply = await this.contract.totalSupply.call();
            assert.equal(totalSupply.toNumber(), 3);
        })

        it('should get token balance', async function () { 
            let tokenBalance = await this.contract.balanceOf.call(account_two);
            assert.equal(tokenBalance.toNumber(), 2);
        })

        // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
        it('should return token uri', async function () { 
            let tokenURI = await this.contract.tokenURI.call(1);
            assert.equal(tokenURI, 'https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1');
        })

        it('should transfer token from one owner to another', async function () { 
            let fail = false;
            try {
                await this.contract.transferFrom(
                    account_two, account_one, 1, {from: account_two});
            }
            catch(e) {
                fail = true;
                // console.log(e.message);
            }
            assert.equal(fail, false);

            // verify it transferred correctly
            let tokenBalance1 = await this.contract.balanceOf.call(account_one);
            assert.equal(tokenBalance1.toNumber(), 2);
            let tokenBalance2 = await this.contract.balanceOf.call(account_two);
            assert.equal(tokenBalance2.toNumber(), 1);
            // verify total balance hasn't changed
            let totalSupply = await this.contract.totalSupply.call();
            assert.equal(totalSupply.toNumber(), 3);
        })
    });

    describe('have ownership properties', function () {
        beforeEach(async function () { 
            this.contract = await RealStateToken.new(account_one, {from: account_one});
        })

        it('should fail when minting when address is not contract owner', async function () { 
            let fail = false;
            try {
                await this.contract.mint(account_two, 0, {from: account_two});
            }
            catch(e) {
                fail = true;
                // console.log(e.message);
            }
            assert.equal(fail, true);
        })

        it('should return contract owner', async function () { 
            let owner = await this.contract.owner.call();
            assert.equal(owner, account_one);
        })

    });
})
