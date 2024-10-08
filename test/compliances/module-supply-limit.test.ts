import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import { ethers, upgrades } from 'hardhat';
import { expect } from 'chai';
import { deployComplianceFixture } from '../fixtures/deploy-compliance.fixture';
import { deploySuiteWithModularCompliancesFixture } from '../fixtures/borradorInicial';

async function deploySupplyLimitFixture() {
  const context = await loadFixture(deployComplianceFixture);

  const module = await ethers.deployContract('SupplyLimitModule');
  const proxy = await ethers.deployContract('ModuleProxy', [module.address, module.interface.encodeFunctionData('initialize')]);
  const complianceModule = await ethers.getContractAt('SupplyLimitModule', proxy.address);

  await context.suite.compliance.addModule(complianceModule.address);

  return {
    ...context,
    suite: {
      ...context.suite,
      complianceModule,
    },
  };
}

async function deploySupplyLimitFullSuite() {
  const context = await loadFixture(deploySuiteWithModularCompliancesFixture);
  const SupplyLimitModule = await ethers.getContractFactory('SupplyLimitModule');
  const complianceModule = await upgrades.deployProxy(SupplyLimitModule, []);
  await context.suite.compliance.bindToken(context.suite.token.address);
  await context.suite.compliance.addModule(complianceModule.address);

  return {
    ...context,
    suite: {
      ...context.suite,
      complianceModule,
    },
  };
}

describe('Compliance Module: SupplyLimit', () => {
  it('should deploy the SupplyLimit contract and bind it to the compliance', async () => {
    const context = await loadFixture(deploySupplyLimitFixture);

    expect(context.suite.complianceModule.address).not.to.be.undefined;
    expect(await context.suite.compliance.isModuleBound(context.suite.complianceModule.address)).to.be.true;
  });

  describe('.name()', () => {
    it('should return the name of the module', async () => {
      const context = await loadFixture(deploySupplyLimitFixture);

      expect(await context.suite.complianceModule.name()).to.be.equal('SupplyLimitModule');
    });
  });

  describe('.isPlugAndPlay', () => {
    it('should return true', async () => {
      const context = await loadFixture(deploySupplyLimitFullSuite);
      expect(await context.suite.complianceModule.isPlugAndPlay()).to.be.true;
    });
  });

  describe('.canComplianceBind', () => {
    it('should return true', async () => {
      const context = await loadFixture(deploySupplyLimitFullSuite);
      expect(await context.suite.complianceModule.canComplianceBind(context.suite.compliance.address)).to.be.true;
    });
  });

  describe('.owner', () => {
    it('should return owner', async () => {
      const context = await loadFixture(deploySupplyLimitFixture);
      await expect(context.suite.complianceModule.owner()).to.eventually.be.eq(context.accounts.deployer.address);
    });
  });

  describe('.initialize', () => {
    it('should be called only once', async () => {
      // given
      const {
        accounts: { deployer },
      } = await loadFixture(deployComplianceFixture);
      const module = (await ethers.deployContract('SupplyLimitModule')).connect(deployer);
      await module.initialize();

      // when & then
      await expect(module.initialize()).to.be.revertedWith('Initializable: contract is already initialized');
      expect(await module.owner()).to.be.eq(deployer.address);
    });
  });

  describe('.transferOwnership', () => {
    describe('when calling directly', () => {
      it('should revert', async () => {
        const context = await loadFixture(deploySupplyLimitFixture);
        await expect(
          context.suite.complianceModule.connect(context.accounts.aliceWallet).transferOwnership(context.accounts.bobWallet.address),
        ).to.revertedWith('Ownable: caller is not the owner');
      });
    });

    describe('when calling with owner account', () => {
      it('should transfer ownership', async () => {
        // given
        const context = await loadFixture(deploySupplyLimitFixture);

        // when
        await context.suite.complianceModule.connect(context.accounts.deployer).transferOwnership(context.accounts.bobWallet.address);

        // then
        const owner = await context.suite.complianceModule.owner();
        expect(owner).to.eq(context.accounts.bobWallet.address);
      });
    });
  });

  describe('.upgradeTo', () => {
    describe('when calling directly', () => {
      it('should revert', async () => {
        const context = await loadFixture(deploySupplyLimitFixture);
        await expect(context.suite.complianceModule.connect(context.accounts.aliceWallet).upgradeTo(ethers.constants.AddressZero)).to.revertedWith(
          'Ownable: caller is not the owner',
        );
      });
    });

    describe('when calling with owner account', () => {
      it('should upgrade proxy', async () => {
        // given
        const context = await loadFixture(deploySupplyLimitFixture);
        const newImplementation = await ethers.deployContract('SupplyLimitModule');

        // when
        await context.suite.complianceModule.connect(context.accounts.deployer).upgradeTo(newImplementation.address);

        // then
        const implementationAddress = await upgrades.erc1967.getImplementationAddress(context.suite.complianceModule.address);
        expect(implementationAddress).to.eq(newImplementation.address);
      });
    });
  });

  describe('.setSupplyLimit', () => {
    describe('when calling directly', () => {
      it('should revert', async () => {
        const context = await loadFixture(deploySupplyLimitFixture);

        await expect(context.suite.complianceModule.setSupplyLimit(100)).to.revertedWith('only bound compliance can call');
      });
    });

    describe('when calling via compliance', () => {
      it('should set supply limit', async () => {
        const context = await loadFixture(deploySupplyLimitFixture);

        const tx = await context.suite.compliance.callModuleFunction(
          new ethers.utils.Interface(['function setSupplyLimit(uint256 _limit)']).encodeFunctionData('setSupplyLimit', [100]),
          context.suite.complianceModule.address,
        );

        await expect(tx).to.emit(context.suite.complianceModule, 'SupplyLimitSet').withArgs(context.suite.compliance.address, 100);
      });
    });
  });

  describe('.getSupplyLimit', () => {
    describe('when calling directly', () => {
      it('should return', async () => {
        const context = await loadFixture(deploySupplyLimitFixture);
        await context.suite.compliance.callModuleFunction(
          new ethers.utils.Interface(['function setSupplyLimit(uint256 _limit)']).encodeFunctionData('setSupplyLimit', [1600]),
          context.suite.complianceModule.address,
        );
        const supplyLimit = await context.suite.complianceModule.getSupplyLimit(context.suite.compliance.address);
        expect(supplyLimit).to.be.eq(1600);
      });
    });
  });

  describe('.moduleCheck', () => {
    const zeroAddress = '0x0000000000000000000000000000000000000000';
    describe('when value exceeds compliance supply limit', () => {
      it('should return false', async () => {
        const context = await loadFixture(deploySupplyLimitFullSuite);
        const to = context.accounts.aliceWallet.address;
        const from = zeroAddress;

        await context.suite.compliance.callModuleFunction(
          new ethers.utils.Interface(['function setSupplyLimit(uint256 _limit)']).encodeFunctionData('setSupplyLimit', [1600]),
          context.suite.complianceModule.address,
        );

        const result = await context.suite.complianceModule.moduleCheck(from, to, 101, context.suite.compliance.address);
        expect(result).to.be.false;
      });
    });

    describe('when supply limit does not exceed compliance supply limit', () => {
      it('should return true', async () => {
        const context = await loadFixture(deploySupplyLimitFullSuite);
        const to = context.accounts.aliceWallet.address;
        const from = zeroAddress;

        await context.suite.compliance.callModuleFunction(
          new ethers.utils.Interface(['function setSupplyLimit(uint256 _limit)']).encodeFunctionData('setSupplyLimit', [1600]),
          context.suite.complianceModule.address,
        );

        const result = await context.suite.complianceModule.moduleCheck(from, to, 100, context.suite.compliance.address);
        expect(result).to.be.true;
      });
    });

    describe('.moduleTransferAction', () => {
      describe('when calling from a random wallet', () => {
        it('should revert', async () => {
          const context = await loadFixture(deploySupplyLimitFullSuite);

          await expect(
            context.suite.complianceModule.moduleTransferAction(context.accounts.anotherWallet.address, context.accounts.anotherWallet.address, 10),
          ).to.be.revertedWith('only bound compliance can call');
        });
      });

      describe('when calling as the compliance', () => {
        it('should do nothing', async () => {
          const context = await loadFixture(deploySupplyLimitFullSuite);

          await expect(
            context.suite.compliance.callModuleFunction(
              new ethers.utils.Interface(['function moduleTransferAction(address _from, address _to, uint256 _value)']).encodeFunctionData(
                'moduleTransferAction',
                [context.accounts.anotherWallet.address, context.accounts.anotherWallet.address, 10],
              ),
              context.suite.complianceModule.address,
            ),
          ).to.eventually.be.fulfilled;
        });
      });
    });

    describe('.moduleMintAction', () => {
      describe('when calling from a random wallet', () => {
        it('should revert', async () => {
          const context = await loadFixture(deploySupplyLimitFullSuite);

          await expect(context.suite.complianceModule.moduleMintAction(context.accounts.anotherWallet.address, 10)).to.be.revertedWith(
            'only bound compliance can call',
          );
        });
      });

      describe('when calling as the compliance', () => {
        it('should do nothing', async () => {
          const context = await loadFixture(deploySupplyLimitFullSuite);

          await expect(
            context.suite.compliance.callModuleFunction(
              new ethers.utils.Interface(['function moduleMintAction(address, uint256)']).encodeFunctionData('moduleMintAction', [
                context.accounts.anotherWallet.address,
                10,
              ]),
              context.suite.complianceModule.address,
            ),
          ).to.eventually.be.fulfilled;
        });
      });
    });

    describe('.moduleBurnAction', () => {
      describe('when calling from a random wallet', () => {
        it('should revert', async () => {
          const context = await loadFixture(deploySupplyLimitFullSuite);

          await expect(context.suite.complianceModule.moduleBurnAction(context.accounts.anotherWallet.address, 10)).to.be.revertedWith(
            'only bound compliance can call',
          );
        });
      });

      describe('when calling as the compliance', () => {
        it('should do nothing', async () => {
          const context = await loadFixture(deploySupplyLimitFullSuite);

          await expect(
            context.suite.compliance.callModuleFunction(
              new ethers.utils.Interface(['function moduleBurnAction(address, uint256)']).encodeFunctionData('moduleBurnAction', [
                context.accounts.anotherWallet.address,
                10,
              ]),
              context.suite.complianceModule.address,
            ),
          ).to.eventually.be.fulfilled;
        });
      });
    });
  });
});
