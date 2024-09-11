import { BigNumber, Contract, Signer } from 'ethers';
import { ethers } from 'hardhat';
import OnchainID from '@onchain-id/solidity';
/* import { loadFixture } from '@nomicfoundation/hardhat-network-helpers'; */

export async function deployIdentityProxy(implementationAuthority: Contract['address'], managementKey: string, signer: Signer) {
  const identity = await new ethers.ContractFactory(OnchainID.contracts.IdentityProxy.abi, OnchainID.contracts.IdentityProxy.bytecode, signer).deploy(
    implementationAuthority,
    managementKey,
  );

  return ethers.getContractAt('Identity', identity.address, signer);
}

export async function deployFullSuiteFixture() {
  const [deployer, tokenIssuer, tokenAgent, tokenAdmin, claimIssuer, aliceWallet, bobWallet, charlieWallet, davidWallet, anotherWallet] =
    await ethers.getSigners();
  const claimIssuerSigningKey = ethers.Wallet.createRandom();
  const aliceActionKey = ethers.Wallet.createRandom();

  // Deploy implementations
  // hacer deploy contrato de implemetacion uno a la vez
  // Ir hardcodeando el address de cada contratos con las address que vamos deployando

  console.log('Deployando ClaimTopicsRegistry implementation...');
  const claimTopicsRegistryImplementation = await ethers.deployContract('ClaimTopicsRegistry', deployer);
  console.log('Deployado trustedIssuersRegistry Implementation ...', claimTopicsRegistryImplementation.address);
  const trustedIssuersRegistryImplementation = await ethers.deployContract('TrustedIssuersRegistry', deployer);
  console.log('Deployado identityRegistryStorage Implementation ...', trustedIssuersRegistryImplementation.address);
  const identityRegistryStorageImplementation = await ethers.deployContract('IdentityRegistryStorage', deployer);
  console.log('Deployado identityRegistry Implementation ...', identityRegistryStorageImplementation.address);
  const identityRegistryImplementation = await ethers.deployContract('IdentityRegistry', deployer);
  console.log('Deployado modularCompliance Implementation ...', identityRegistryImplementation.address);
  const modularComplianceImplementation = await ethers.deployContract('ModularCompliance', deployer);
  console.log('Deployado token Implementation ...', modularComplianceImplementation.address);
  const tokenImplementation = await ethers.deployContract('Token', deployer);
  console.log('Deployado identity Implementation ...');
  const identityImplementation = await new ethers.ContractFactory(
    OnchainID.contracts.Identity.abi,
    OnchainID.contracts.Identity.bytecode,
    deployer,
  ).deploy(deployer.address, true);

  console.log('Deployando Implementation Authority ...');
  const identityImplementationAuthority = await new ethers.ContractFactory(
    OnchainID.contracts.ImplementationAuthority.abi,
    OnchainID.contracts.ImplementationAuthority.bytecode,
    deployer,
  ).deploy(identityImplementation.address);

  console.log('Deployando Factory ...');
  const identityFactory = await new ethers.ContractFactory(OnchainID.contracts.Factory.abi, OnchainID.contracts.Factory.bytecode, deployer).deploy(
    identityImplementationAuthority.address,
  );

  console.log('Deployando TREX Implementation Authority ...');
  const trexImplementationAuthority = await ethers.deployContract(
    'TREXImplementationAuthority',
    [true, ethers.constants.AddressZero, ethers.constants.AddressZero],
    deployer,
  );

  // Para ejecutar lo que esta a continuacion se necesita otro script que haga referencia a esta funcion. utilsTransaction.ts
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
  // Para ejecutar lo que esta a continuacion se necesita otro script que haga referencia a esta funcion. utilsTransaction.ts

  // Continuar deploy de implementaciones a la vez
  console.log('Deployando TREXFactory ...');
  const trexFactory = await ethers.deployContract('TREXFactory', [trexImplementationAuthority.address, identityFactory.address], deployer);
  // Realizar de forma manual addTokenFactory
  await identityFactory.connect(deployer).addTokenFactory(trexFactory.address);

  // Deploy de contratos proxys de a uno a la vez
  console.log('Deployando claimTopicsRegistry ...');
  const claimTopicsRegistry = await ethers
    .deployContract('ClaimTopicsRegistryProxy', [trexImplementationAuthority.address], deployer)
    .then(async (proxy) => ethers.getContractAt('ClaimTopicsRegistry', proxy.address));

  console.log('Deployando trustedIssuersRegistry ...');
  const trustedIssuersRegistry = await ethers
    .deployContract('TrustedIssuersRegistryProxy', [trexImplementationAuthority.address], deployer)
    .then(async (proxy) => ethers.getContractAt('TrustedIssuersRegistry', proxy.address));

  console.log('Deployando identityRegistryStorage ...');
  const identityRegistryStorage = await ethers
    .deployContract('IdentityRegistryStorageProxy', [trexImplementationAuthority.address], deployer)
    .then(async (proxy) => ethers.getContractAt('IdentityRegistryStorage', proxy.address));

  console.log('Deployando modularCompliance ...');
  const defaultCompliance = await ethers.deployContract('DefaultCompliance', deployer);

  console.log('Deployando identityRegistry ...');
  const identityRegistry = await ethers
    .deployContract(
      'IdentityRegistryProxy',
      [trexImplementationAuthority.address, trustedIssuersRegistry.address, claimTopicsRegistry.address, identityRegistryStorage.address],
      deployer,
    )
    .then(async (proxy) => ethers.getContractAt('IdentityRegistry', proxy.address));

  console.log('Deployando token ...');
  const tokenOID = await deployIdentityProxy(identityImplementationAuthority.address, deployer.address, deployer);
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

  console.log('Deployando agentManager ...');
  const agentManager = await ethers.deployContract('AgentManager', [token.address], tokenAgent);

  // Realizar de forma manual conecta oara que los registrados sean los mismos en ambos contraos de identidad
  await identityRegistryStorage.connect(deployer).bindIdentityRegistry(identityRegistry.address);

  // eslint-disable-next-line max-len
  // En el siguiente return cuando se comente codigo para desplegar contrato por contrato ir comentando el nombre de todos los que no se deployen para
  // que retorne unicamente el contrato que estamos desplegando en ese moemento
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
      /*       aliceIdentity,
      bobIdentity,
      charlieIdentity, */
    },
    suite: {
      /* claimIssuerContract, */
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
  };
}

// eslint-disable-next-line consistent-return
async function main() {
  try {
    // Primero despliega la suite principal
    const deployment = await deployFullSuiteFixture();

    // Logueamos las direcciones de los contratos desplegados ir cambiando de forma manual
    console.log('Direcciones de los contratos desplegados con exito:');
    console.log('agentManager Proxy address:', deployment.suite.agentManager.address);

    return {
      deployment,
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
}

export async function deploySuiteWithModuleComplianceBoundToWallet() {
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
