import { /* BigNumber, */ Contract, Signer } from 'ethers';
import { ethers } from 'hardhat';
import OnchainID from '@onchain-id/solidity';
// eslint-disable-next-line import/no-duplicates
/* import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import { implementation } from '../../typechain-types/contracts/registry'; */

export async function deployIdentityProxy(implementationAuthority: Contract['address'], managementKey: string, signer: Signer) {
  const identity = await new ethers.ContractFactory(OnchainID.contracts.IdentityProxy.abi, OnchainID.contracts.IdentityProxy.bytecode, signer).deploy(
    implementationAuthority,
    managementKey,
  );

  return ethers.getContractAt('Identity', identity.address, signer);
}

export async function deployFullSuiteFixture() {
  const [deployer /*  tokenIssuer, tokenAgent, tokenAdmin, claimIssuer, aliceWallet, bobWallet, charlieWallet, davidWallet, anotherWallet */] =
    await ethers.getSigners();

  console.log('Deployando Proxy de agentManager...');
  const agentManager = await ethers.deployContract('AgentManager', ['0xFFdF98ed90AdBcdEF61295FB563Da33524710F6a'], deployer);
  console.log('Deployado Proxy de agentManager...', agentManager.address);

  /*   console.log('deployando trexFactory');
  const trexFactory = await ethers.deployContract(
    'TREXFactory',
    ['0x79035Fa8Ade0A6185bF19A42DD1253D96C24cC44', '0x881b3309876334413EB7e70BDDcd4DD7a86f9483'],
    deployer,
  );
  console.log('deployado trexFactory', trexFactory.address); */

  /*   console.log('deployando indentity impletation authority');
  const identityImplementationAuthority = await new ethers.ContractFactory(
    OnchainID.contracts.ImplementationAuthority.abi,
    OnchainID.contracts.ImplementationAuthority.bytecode,
    deployer,
  ).deploy('0xc3f42353a7C83bb0047DAFF4a1711DA66654D6A6');
  console.log('deployado', identityImplementationAuthority.address) */
  /*   console.log('deployando indentity factory');
  const identityFactory = await new ethers.ContractFactory(OnchainID.contracts.Factory.abi, OnchainID.contracts.Factory.bytecode, deployer).deploy(
    '0x404eA859FAf2EAecAA3c2439662AB65A9bb0641D',
  );
  console.log('deployado identity factory', identityFactory.address); */

  /*   console.log('deployando claim topics registry');
  const claimTopicsRegistry = await ethers
    .deployContract('ClaimTopicsRegistryProxy', ['0x5A2043F43C05934942babd3362dC19af782eE4b2'], deployer)
    .then(async (proxy) => ethers.getContractAt('ClaimTopicsRegistry', proxy.address));
  console.log('deployado claim topics registry', claimTopicsRegistry.address); */

  /*   console.log('deployando identity implementation');
  const identityImplementation = await new ethers.ContractFactory(
    OnchainID.contracts.Identity.abi,
    OnchainID.contracts.Identity.bytecode,
    deployer,
  ).deploy(deployer.address, true);
  console.log('deployado identity implementation', identityImplementation.address);
 */
  /*   console.log('deployando identity implementation authority');
  const identityImplementationAuthority = await new ethers.ContractFactory(
    OnchainID.contracts.ImplementationAuthority.abi,
    OnchainID.contracts.ImplementationAuthority.bytecode,
    deployer,
  ).deploy('0xe08087dB79d65669D42334A4F137014623A60cFe');
  console.log('deployado identity implementation authority', identityImplementationAuthority.address); */

  /* console.log('deployando identity factory');
  const identityFactory = await new ethers.ContractFactory(OnchainID.contracts.Factory.abi, OnchainID.contracts.Factory.bytecode, deployer).deploy(
    '0x830EDAc0c2c4d82891eeb40BBF6430ED5C6bB15B',
  );
  console.log('deployado identity factory', identityFactory.address);
 */

  /* console.log('deployando trex implementation authority');
  const trexImplementationAuthority = await ethers.deployContract(
    'TREXImplementationAuthority',
    [true, ethers.constants.AddressZero, ethers.constants.AddressZero],
    deployer,
  );
  console.log('deployado trex implementation autorithy version', trexImplementationAuthority.address); */

  /*   console.log('deployando trexFactory...');
  const trexFactory = await ethers.deployContract(
    'TREXFactory',
    ['0x5A2043F43C05934942babd3362dC19af782eE4b2', '0xc3f42353a7C83bb0047DAFF4a1711DA66654D6A6'],
    deployer,
  );
  console.log('Address trexFactory:', trexFactory.address); */

  /*   console.log('deployando trex implementation authority');
  const trexImplementationAuthority = await ethers.deployContract(
    'TREXImplementationAuthority',
    [true, ethers.constants.AddressZero, ethers.constants.AddressZero],
    deployer,
  );
  console.log('deployado trex implementation autorithy version', trexImplementationAuthority.address);
  const versionStruct = {
    major: 4,
    minor: 0,
    patch: 0,
  };
  const contractsStruct = {
    tokenImplementation: '0x581E415F17CC63daF68766a95D9e1828440Bf99a',
    ctrImplementation: '0xE84628337Da3394bbf2063d96CE869C7A5C2271e',
    irImplementation: '0xF633BD92Bd616fF8d70EA39420B1Eb5A791ef025',
    irsImplementation: '0x0595F02Ad3365519FE6C3CC54eE8e4385A8dffB5',
    tirImplementation: '0xeF83A2c82e6641Fe0cDd77baE9f472515398A6ae',
    mcImplementation: '0x509D66320F8DC05068eA49CA19591Da8aC7d2180',
  };
  console.log('Agregando y usando Trex Version');
  await trexImplementationAuthority.connect(deployer).addAndUseTREXVersion(versionStruct, contractsStruct);
  console.log('Agregado');

  console.log('deployando trex factory');

  const trexFactory = await ethers.deployContract(
    'TREXFactory',
    [trexImplementationAuthority.address, '0xDBa176079B050436F77272331F108202EE4c4Ff3'],
    deployer,
  );
  console.log('deployado trex factory', trexFactory.address); */

  /* await identityFactory.connect(deployer).addTokenFactory(trexFactory.address); */

  /*   const claimIssuerSigningKey = ethers.Wallet.createRandom();
  const aliceActionKey = ethers.Wallet.createRandom(); */

  // Deploy implementations
  /*   console.log('deployando identityImplementation...');
  const identityImplementation = await new ethers.ContractFactory(
    OnchainID.contracts.Identity.abi,
    OnchainID.contracts.Identity.bytecode,
    deployer,
  ).deploy(deployer.address, true);
  console.log('Address identityImplementation:', identityImplementation.address); */

  /* console.log('deployando identityImplementationAuthority...');
  const identityImplementationAuthority = await new ethers.ContractFactory(
    OnchainID.contracts.ImplementationAuthority.abi,
    OnchainID.contracts.ImplementationAuthority.bytecode,
    deployer,
  ).deploy('0xc3f42353a7C83bb0047DAFF4a1711DA66654D6A6');
  console.log('Address identityImplementationAuthority:', identityImplementationAuthority.address); */

  /* console.log('deployando identityFactory...');
  const identityFactory = await new ethers.ContractFactory(OnchainID.contracts.Factory.abi, OnchainID.contracts.Factory.bytecode, deployer).deploy(
    '0x93B8bEB0A2F0ec79F208C1F1b490DCB9825864E3',
  );
  console.log('Address identityFactory:', identityFactory.address); */

  /* console.log('deployando trexImplementationAuthority...');
  const trexImplementationAuthority = await ethers.deployContract(
    'TREXImplementationAuthority',
    [true, ethers.constants.AddressZero, ethers.constants.AddressZero],
    deployer,
  );
  console.log('Address trexImplementationAuthority:', trexImplementationAuthority.address); */
  // FACTORY
  /* console.log('deployando trexFactory...');
  const trexFactory = await ethers.deployContract(
    'TREXFactory',
    ['0x4191cC35c11987656F20C04387247335fE12823A', '0x291Adae87A92058D8C03F5C21b3618792F47DD11'],
    deployer,
  );
  console.log('Address trexFactory:', trexFactory.address); */

  /*   console.log('deployando tokenImplementation...');
  const tokenImplementation = await ethers.deployContract('Token', deployer);
  console.log('deployado tokenImplementation...'); */
  /*   console.log('deployando modularComplianceImplementation...');
  const modularComplianceImplementation = await ethers.deployContract('ModularCompliance', deployer);
  console.log('deployado modularComplianceImplementation...'); */
  /*   console.log('deployando identityRegistryStorageImplementation...');
  const identityRegistryStorageImplementation = await ethers.deployContract('IdentityRegistryStorage', deployer);
  console.log('deployado identityRegistryStorageImplementation...'); */
  /*   console.log('Deployando claimTopicsRegistryImplementation...');
  const claimTopicsRegistryImplementation = await ethers.deployContract('ClaimTopicsRegistry', deployer);
  console.log('deployado claimTopicsRegistryImplementation...'); */
  /*   console.log('deployando trustedIssuersRegistryImplementation...');
  const trustedIssuersRegistryImplementation = await ethers.deployContract('TrustedIssuersRegistry', deployer);
  console.log('deployado trustedIssuersRegistryImplementation...'); */
  /*   console.log('deployando identityRegistryStorageImplementation...');
  const trexImplementationAuthority = await ethers.deployContract(
    'TREXImplementationAuthority',
    [true, ethers.constants.AddressZero, ethers.constants.AddressZero],
    deployer,
  );
  console.log('deployado trexImplementationAuthority...');
  console.log(trexImplementationAuthority.address);
  console.log('deployando claimProxy');
  const claimTopicsRegistry = await ethers
    .deployContract('ClaimTopicsRegistryProxy', [trexImplementationAuthority.address], deployer)
    .then(async (proxy) => ethers.getContractAt('ClaimTopicsRegistry', proxy.address)); */
  /*   const trustedIssuersRegistryImplementation = await ethers.deployContract('TrustedIssuersRegistry', deployer);
  console.log('deployado trustedIssuersRegistryImplementation...');
  const identityRegistryStorageImplementation = await ethers.deployContract('IdentityRegistryStorage', deployer);
  console.log('deployado identityRegistryStorageImplementation...');
  const identityRegistryImplementation = await ethers.deployContract('IdentityRegistry', deployer);
  console.log('deployado identityRegistryImplementation...');
  const modularComplianceImplementation = await ethers.deployContract('ModularCompliance', deployer);
  console.log('deployado modularComplianceImplementation...');
  const tokenImplementation = await ethers.deployContract('Token', deployer);
  const identityImplementation = await new ethers.ContractFactory(
    OnchainID.contracts.Identity.abi,
    OnchainID.contracts.Identity.bytecode,
    deployer,
  ).deploy(deployer.address, true);

  const identityImplementationAuthority = await new ethers.ContractFactory(
    OnchainID.contracts.ImplementationAuthority.abi,
    OnchainID.contracts.ImplementationAuthority.bytecode,
    deployer,
  ).deploy(identityImplementation.address);

  const identityFactory = await new ethers.ContractFactory(OnchainID.contracts.Factory.abi, OnchainID.contracts.Factory.bytecode, deployer).deploy(
    identityImplementationAuthority.address,
  );

  const trexImplementationAuthority = await ethers.deployContract(
    'TREXImplementationAuthority',
    [true, ethers.constants.AddressZero, ethers.constants.AddressZero],
    deployer,
  );
  const versionStruct = {
    major: 4,
    minor: 0,
    patch: 0,
  };
  const contractsStruct = {
    tokenImplementation: tokenImplementation.address,
    ctrImplementation: claimTopicsRegistryImplementation.address,
    irImplementation: identityRegistryImplementation.address,
    irsImplementation: identityRegistryStorageImplementation.address,
    tirImplementation: trustedIssuersRegistryImplementation.address,
    mcImplementation: modularComplianceImplementation.address,
  };
  await trexImplementationAuthority.connect(deployer).addAndUseTREXVersion(versionStruct, contractsStruct);

  const trexFactory = await ethers.deployContract('TREXFactory', [trexImplementationAuthority.address, identityFactory.address], deployer);
  await identityFactory.connect(deployer).addTokenFactory(trexFactory.address);

  const claimTopicsRegistry = await ethers
    .deployContract('ClaimTopicsRegistryProxy', [trexImplementationAuthority.address], deployer)
    .then(async (proxy) => ethers.getContractAt('ClaimTopicsRegistry', proxy.address));

  const trustedIssuersRegistry = await ethers
    .deployContract('TrustedIssuersRegistryProxy', [trexImplementationAuthority.address], deployer)
    .then(async (proxy) => ethers.getContractAt('TrustedIssuersRegistry', proxy.address));

  const identityRegistryStorage = await ethers
    .deployContract('IdentityRegistryStorageProxy', [trexImplementationAuthority.address], deployer)
    .then(async (proxy) => ethers.getContractAt('IdentityRegistryStorage', proxy.address));

  const defaultCompliance = await ethers.deployContract('DefaultCompliance', deployer);

  const identityRegistry = await ethers
    .deployContract(
      'IdentityRegistryProxy',
      [trexImplementationAuthority.address, trustedIssuersRegistry.address, claimTopicsRegistry.address, identityRegistryStorage.address],
      deployer,
    )
    .then(async (proxy) => ethers.getContractAt('IdentityRegistry', proxy.address));

  const tokenOID = await deployIdentityProxy(identityImplementationAuthority.address, tokenIssuer.address, deployer);
  const tokenName = 'TREXDINO';
  const tokenSymbol = 'TREX';
  const tokenDecimals = BigNumber.from('0');
  const token = await ethers
    .deployContract(
      'TokenProxy',
      [
        trexImplementationAuthority.address,
        identityRegistry.address,
        defaultCompliance.address,
        tokenName,
        tokenSymbol,
        tokenDecimals,
        tokenOID.address,
      ],
      deployer,
    )
    .then(async (proxy) => ethers.getContractAt('Token', proxy.address));

  console.log('CONTRATOS DEPLOYADOS');

  const agentManager = await ethers.deployContract('AgentManager', [token.address], tokenAgent);

  await identityRegistryStorage.connect(deployer).bindIdentityRegistry(identityRegistry.address);

  await token.connect(deployer).addAgent(tokenAgent.address);

  const claimTopics = [ethers.utils.id('CLAIM_TOPIC')];
  await claimTopicsRegistry.connect(deployer).addClaimTopic(claimTopics[0]);

  const claimIssuerContract = await ethers.deployContract('ClaimIssuer', [claimIssuer.address], claimIssuer);
  await claimIssuerContract
    .connect(claimIssuer)
    .addKey(ethers.utils.keccak256(ethers.utils.defaultAbiCoder.encode(['address'], [claimIssuerSigningKey.address])), 3, 1);

  await trustedIssuersRegistry.connect(deployer).addTrustedIssuer(claimIssuerContract.address, claimTopics);

  const aliceIdentity = await deployIdentityProxy(identityImplementationAuthority.address, aliceWallet.address, deployer);
  await aliceIdentity
    .connect(aliceWallet)
    .addKey(ethers.utils.keccak256(ethers.utils.defaultAbiCoder.encode(['address'], [aliceActionKey.address])), 2, 1);
  const bobIdentity = await deployIdentityProxy(identityImplementationAuthority.address, bobWallet.address, deployer);
  const charlieIdentity = await deployIdentityProxy(identityImplementationAuthority.address, charlieWallet.address, deployer);

  await identityRegistry.connect(deployer).addAgent(tokenAgent.address);
  await identityRegistry.connect(deployer).addAgent(token.address);

  await identityRegistry
    .connect(tokenAgent)
    .batchRegisterIdentity([aliceWallet.address, bobWallet.address], [aliceIdentity.address, bobIdentity.address], [42, 666]);

  const claimForAlice = {
    data: ethers.utils.hexlify(ethers.utils.toUtf8Bytes('Some claim public data.')),
    issuer: claimIssuerContract.address,
    topic: claimTopics[0],
    scheme: 1,
    identity: aliceIdentity.address,
    signature: '',
  };
  claimForAlice.signature = await claimIssuerSigningKey.signMessage(
    ethers.utils.arrayify(
      ethers.utils.keccak256(
        ethers.utils.defaultAbiCoder.encode(['address', 'uint256', 'bytes'], [claimForAlice.identity, claimForAlice.topic, claimForAlice.data]),
      ),
    ),
  );

  await aliceIdentity
    .connect(aliceWallet)
    .addClaim(claimForAlice.topic, claimForAlice.scheme, claimForAlice.issuer, claimForAlice.signature, claimForAlice.data, '');

  const claimForBob = {
    data: ethers.utils.hexlify(ethers.utils.toUtf8Bytes('Some claim public data.')),
    issuer: claimIssuerContract.address,
    topic: claimTopics[0],
    scheme: 1,
    identity: bobIdentity.address,
    signature: '',
  };
  claimForBob.signature = await claimIssuerSigningKey.signMessage(
    ethers.utils.arrayify(
      ethers.utils.keccak256(
        ethers.utils.defaultAbiCoder.encode(['address', 'uint256', 'bytes'], [claimForBob.identity, claimForBob.topic, claimForBob.data]),
      ),
    ),
  );

  await bobIdentity
    .connect(bobWallet)
    .addClaim(claimForBob.topic, claimForBob.scheme, claimForBob.issuer, claimForBob.signature, claimForBob.data, '');

  await token.connect(tokenAgent).mint(aliceWallet.address, 1000);
  await token.connect(tokenAgent).mint(bobWallet.address, 500);

  await agentManager.connect(tokenAgent).addAgentAdmin(tokenAdmin.address);
  await token.connect(deployer).addAgent(agentManager.address);
  await identityRegistry.connect(deployer).addAgent(agentManager.address);

  await token.connect(tokenAgent).unpause();

  return {
    accounts: {
      deployer,
      tokenIssuer,
      tokenAgent,
      tokenAdmin,
      claimIssuer,
      claimIssuerSigningKey,
      aliceActionKey,
      aliceWallet,
      bobWallet,
      charlieWallet,
      davidWallet,
      anotherWallet,
    },
    identities: {
      aliceIdentity,
      bobIdentity,
      charlieIdentity,
    },
    suite: {
      claimIssuerContract,
      claimTopicsRegistry,
      trustedIssuersRegistry,
      identityRegistryStorage,
      defaultCompliance,
      identityRegistry,
      tokenOID,
      token,
      agentManager,
    },
    authorities: {
      trexImplementationAuthority,
      identityImplementationAuthority,
    },
    factories: {
      trexFactory,
      identityFactory,
    },
    implementations: {
      identityImplementation,
      claimTopicsRegistryImplementation,
      trustedIssuersRegistryImplementation,
      identityRegistryStorageImplementation,
      identityRegistryImplementation,
      modularComplianceImplementation,
      tokenImplementation,
    },
  }; */

  return {
    factories: {
      /* trexFactory, */
      /* identityFactory, */
    },
    implementations: {
      /* identityImplementation, */
    },
    authorities: {
      /* trexImplementationAuthority, */
      /* identityImplementationAuthority, */
    },
    suite: {
      agentManager,
      /* token, */
    },
  };
}

/* async function verifyContract(address: string, args: unknown[]) {
  try {
    console.log(`Verificando contrato en ${address}...`);
    await run('verify:verify', {
      address,
      constructorArguments: args,
    });
    console.log(`Contrato verificado en ${address}`);
  } catch (error) {
    console.error(`Error al verificar el contrato en ${address}:`, error);
  }
} */

// eslint-disable-next-line consistent-return
async function main() {
  try {
    // Primero despliega la suite principal

    const deployment = await deployFullSuiteFixture();

    console.log('Direcciones de los contratos desplegados con exito:');
    console.log('agentManager Proxy address:', deployment.suite.agentManager.address);
    /* console.log('identityImplementationAuthority:', deployment.authorities.identityImplementationAuthority.address); */
    /* console.log('identityFactory:', deployment.factories.identityFactory.address); */
    /* console.log('TrexImplementationAuthority:', deployment.authorities.trexImplementationAuthority.address); */
    /* console.log('Factory:', deployment.factories.trexFactory.address); */

    /*     
    console.log('identityFactory:', deployment.factories.identityFactory.address); */
    /*     console.log('TrexImplementationAuthority:', deployment.authorities.trexImplementationAuthority.address);
    console.log('identityImplementationAuthority:', deployment.authorities.identityImplementationAuthority.address); */

    /*     console.log('TrexImplementationAuthority:', deployment.authorities.trexImplementationAuthority.address);
    console.log('claimTopicsRegistryProxy:', deployment.suite.claimTopicsRegistry.address); */

    /*     console.log('Direcciones de los contratos desplegados:');
    console.log('Deployer:', deployment.accounts.deployer.address);

    console.log('Token:', deployment.suite.token.address);
    console.log('Token Implementation', deployment.implementations.tokenImplementation.address);

    console.log('Identity Registry:', deployment.suite.identityRegistry.address);
    console.log('IdentityRegistry Implementation:', deployment.implementations.identityRegistryImplementation.address);

    console.log('Compliance:', deployment.suite.defaultCompliance.address);
    console.log('Compliance Implementation', deployment.implementations.modularComplianceImplementation.address);

    console.log('IdentityRegistryStorage:', deployment.suite.identityRegistryStorage.address);
    console.log('IdentityRegistryStorage Implementation:', deployment.implementations.identityRegistryStorageImplementation.address);

    console.log('TrustedIssuerRegistry:', deployment.suite.trustedIssuersRegistry.address);
    console.log('TrustedIssuerRegistry Implementation:', deployment.implementations.trustedIssuersRegistryImplementation.address);

    console.log('claimTopicsRegistry:', deployment.suite.claimTopicsRegistry.address);
    console.log('ClaimTopicsRegistry Implementation:', deployment.implementations.claimTopicsRegistryImplementation.address);

    console.log('Factory:', deployment.factories.trexFactory.address); */

    /* await verifyContract(deployment.suite.token.address, []);
    await verifyContract(deployment.suite.identityRegistry.address, []);
    await verifyContract(deployment.suite.defaultCompliance.address, []);
    await verifyContract(deployment.suite.trustedIssuersRegistry.address, []);
    await verifyContract(deployment.suite.claimTopicsRegistry.address, []);
    await verifyContract(deployment.factories.trexFactory.address, []); */

    // Despliega la suite con ModularCompliances
    /*     const modularCompliancesDeployment = await deploySuiteWithModularCompliancesFixture();
    console.log('Direcciones de los contratos desplegados en deploySuiteWithModularCompliancesFixture:');
    console.log('Compliance Proxy:', modularCompliancesDeployment.suite.compliance.address);
    console.log('Compliance Beta:', modularCompliancesDeployment.suite.complianceBeta.address); */

    /* await verifyContract(modularCompliancesDeployment.suite.compliance.address, []);
    await verifyContract(modularCompliancesDeployment.suite.complianceBeta.address, []); */

    // Despliega la suite con el módulo de cumplimiento vinculado a una wallet
    /*     const moduleComplianceDeployment = await deploySuiteWithModuleComplianceBoundToWallet();
    console.log('Direcciones de los contratos desplegados en deploySuiteWithModuleComplianceBoundToWallet:');
    console.log('Compliance:', moduleComplianceDeployment.suite.compliance.address);
    console.log('Compliance Module A:', moduleComplianceDeployment.suite.complianceModuleA.address);
    console.log('Compliance Module B:', moduleComplianceDeployment.suite.complianceModuleB.address); */

    /* await verifyContract(moduleComplianceDeployment.suite.compliance.address, []);
    await verifyContract(moduleComplianceDeployment.suite.complianceModuleA.address, []);
    await verifyContract(moduleComplianceDeployment.suite.complianceModuleB.address, []); */

    return {
      deployment,
      /*       modularCompliancesDeployment,
      moduleComplianceDeployment, */
    };
  } catch (error) {
    console.error('Error en el despliegue:', error);
    process.exit(1); // Termina el proceso si ocurre un error
  }
}

main()
  .then(() => {
    console.log('Deployment completado con éxito.');
    // Puedes hacer algo más con el resultado aquí si lo necesitas
  })
  .catch((error) => {
    console.error('Error en el despliegue:', error);
    process.exit(1);
  });

/* export async function deploySuiteWithModularCompliancesFixture() {
  const context = await loadFixture(deployFullSuiteFixture);

  const complianceProxy = await ethers.deployContract('ModularComplianceProxy', [context.authorities.trexImplementationAuthority.address]);
  const compliance = await ethers.getContractAt('ModularCompliance', complianceProxy.address);

  const complianceBeta = await ethers.deployContract('ModularCompliance');
  await complianceBeta.init();

  return {
    ...context,
    suite: {
      ...context.suite,
      compliance,
      complianceBeta,
    },
  };
} */

/* export async function deploySuiteWithModuleComplianceBoundToWallet() {
  const context = await loadFixture(deployFullSuiteFixture);

  const compliance = await ethers.deployContract('ModularCompliance');
  await compliance.init();

  const complianceModuleA = await ethers.deployContract('CountryAllowModule');
  await compliance.addModule(complianceModuleA.address);
  const complianceModuleB = await ethers.deployContract('CountryAllowModule');
  await compliance.addModule(complianceModuleB.address);

  await compliance.bindToken(context.accounts.charlieWallet.address);

  return {
    ...context,
    suite: {
      ...context.suite,
      compliance,
      complianceModuleA,
      complianceModuleB,
    },
  };
} */
