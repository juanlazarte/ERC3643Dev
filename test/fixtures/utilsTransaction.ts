/* eslint-disable max-len */
import { ethers } from 'hardhat';
/* import { Contract } from 'ethers'; */

async function main() {
  // Asegúrate de que este sea el contrato donde resides la función addAndUseTREXVersion
  const trexImplementationAuthorityAddress = '0x79035Fa8Ade0A6185bF19A42DD1253D96C24cC44'; // Dirección del contrato

  // ABI del contrato, incluye solo las funciones que vas a usar
  const trexImplementationAuthorityABI = [
    {
      inputs: [
        { internalType: 'bool', name: 'referenceStatus', type: 'bool' },
        { internalType: 'address', name: 'trexFactory', type: 'address' },
        { internalType: 'address', name: 'iaFactory', type: 'address' },
      ],
      stateMutability: 'nonpayable',
      type: 'constructor',
    },
    {
      anonymous: false,
      inputs: [{ indexed: true, internalType: 'address', name: 'iaFactory', type: 'address' }],
      name: 'IAFactorySet',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        { indexed: true, internalType: 'address', name: '_token', type: 'address' },
        { indexed: true, internalType: 'address', name: '_newImplementationAuthority', type: 'address' },
      ],
      name: 'ImplementationAuthorityChanged',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        { indexed: false, internalType: 'bool', name: 'referenceStatus', type: 'bool' },
        { indexed: false, internalType: 'address', name: 'trexFactory', type: 'address' },
      ],
      name: 'ImplementationAuthoritySet',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        { indexed: true, internalType: 'address', name: 'previousOwner', type: 'address' },
        { indexed: true, internalType: 'address', name: 'newOwner', type: 'address' },
      ],
      name: 'OwnershipTransferred',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [{ indexed: true, internalType: 'address', name: 'trexFactory', type: 'address' }],
      name: 'TREXFactorySet',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          components: [
            { internalType: 'uint8', name: 'major', type: 'uint8' },
            { internalType: 'uint8', name: 'minor', type: 'uint8' },
            { internalType: 'uint8', name: 'patch', type: 'uint8' },
          ],
          indexed: true,
          internalType: 'struct ITREXImplementationAuthority.Version',
          name: 'version',
          type: 'tuple',
        },
        {
          components: [
            { internalType: 'address', name: 'tokenImplementation', type: 'address' },
            { internalType: 'address', name: 'ctrImplementation', type: 'address' },
            { internalType: 'address', name: 'irImplementation', type: 'address' },
            { internalType: 'address', name: 'irsImplementation', type: 'address' },
            { internalType: 'address', name: 'tirImplementation', type: 'address' },
            { internalType: 'address', name: 'mcImplementation', type: 'address' },
          ],
          indexed: true,
          internalType: 'struct ITREXImplementationAuthority.TREXContracts',
          name: 'trex',
          type: 'tuple',
        },
      ],
      name: 'TREXVersionAdded',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          components: [
            { internalType: 'uint8', name: 'major', type: 'uint8' },
            { internalType: 'uint8', name: 'minor', type: 'uint8' },
            { internalType: 'uint8', name: 'patch', type: 'uint8' },
          ],
          indexed: true,
          internalType: 'struct ITREXImplementationAuthority.Version',
          name: 'version',
          type: 'tuple',
        },
        {
          components: [
            { internalType: 'address', name: 'tokenImplementation', type: 'address' },
            { internalType: 'address', name: 'ctrImplementation', type: 'address' },
            { internalType: 'address', name: 'irImplementation', type: 'address' },
            { internalType: 'address', name: 'irsImplementation', type: 'address' },
            { internalType: 'address', name: 'tirImplementation', type: 'address' },
            { internalType: 'address', name: 'mcImplementation', type: 'address' },
          ],
          indexed: true,
          internalType: 'struct ITREXImplementationAuthority.TREXContracts',
          name: 'trex',
          type: 'tuple',
        },
      ],
      name: 'TREXVersionFetched',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          components: [
            { internalType: 'uint8', name: 'major', type: 'uint8' },
            { internalType: 'uint8', name: 'minor', type: 'uint8' },
            { internalType: 'uint8', name: 'patch', type: 'uint8' },
          ],
          indexed: true,
          internalType: 'struct ITREXImplementationAuthority.Version',
          name: 'version',
          type: 'tuple',
        },
      ],
      name: 'VersionUpdated',
      type: 'event',
    },
    {
      inputs: [
        {
          components: [
            { internalType: 'uint8', name: 'major', type: 'uint8' },
            { internalType: 'uint8', name: 'minor', type: 'uint8' },
            { internalType: 'uint8', name: 'patch', type: 'uint8' },
          ],
          internalType: 'struct ITREXImplementationAuthority.Version',
          name: '_version',
          type: 'tuple',
        },
        {
          components: [
            { internalType: 'address', name: 'tokenImplementation', type: 'address' },
            { internalType: 'address', name: 'ctrImplementation', type: 'address' },
            { internalType: 'address', name: 'irImplementation', type: 'address' },
            { internalType: 'address', name: 'irsImplementation', type: 'address' },
            { internalType: 'address', name: 'tirImplementation', type: 'address' },
            { internalType: 'address', name: 'mcImplementation', type: 'address' },
          ],
          internalType: 'struct ITREXImplementationAuthority.TREXContracts',
          name: '_trex',
          type: 'tuple',
        },
      ],
      name: 'addAndUseTREXVersion',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          components: [
            { internalType: 'uint8', name: 'major', type: 'uint8' },
            { internalType: 'uint8', name: 'minor', type: 'uint8' },
            { internalType: 'uint8', name: 'patch', type: 'uint8' },
          ],
          internalType: 'struct ITREXImplementationAuthority.Version',
          name: '_version',
          type: 'tuple',
        },
        {
          components: [
            { internalType: 'address', name: 'tokenImplementation', type: 'address' },
            { internalType: 'address', name: 'ctrImplementation', type: 'address' },
            { internalType: 'address', name: 'irImplementation', type: 'address' },
            { internalType: 'address', name: 'irsImplementation', type: 'address' },
            { internalType: 'address', name: 'tirImplementation', type: 'address' },
            { internalType: 'address', name: 'mcImplementation', type: 'address' },
          ],
          internalType: 'struct ITREXImplementationAuthority.TREXContracts',
          name: '_trex',
          type: 'tuple',
        },
      ],
      name: 'addTREXVersion',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'address', name: '_token', type: 'address' },
        { internalType: 'address', name: '_newImplementationAuthority', type: 'address' },
      ],
      name: 'changeImplementationAuthority',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          components: [
            { internalType: 'uint8', name: 'major', type: 'uint8' },
            { internalType: 'uint8', name: 'minor', type: 'uint8' },
            { internalType: 'uint8', name: 'patch', type: 'uint8' },
          ],
          internalType: 'struct ITREXImplementationAuthority.Version',
          name: '_version',
          type: 'tuple',
        },
      ],
      name: 'fetchVersion',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [],
      name: 'getCTRImplementation',
      outputs: [{ internalType: 'address', name: '', type: 'address' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          components: [
            { internalType: 'uint8', name: 'major', type: 'uint8' },
            { internalType: 'uint8', name: 'minor', type: 'uint8' },
            { internalType: 'uint8', name: 'patch', type: 'uint8' },
          ],
          internalType: 'struct ITREXImplementationAuthority.Version',
          name: '_version',
          type: 'tuple',
        },
      ],
      name: 'getContracts',
      outputs: [
        {
          components: [
            { internalType: 'address', name: 'tokenImplementation', type: 'address' },
            { internalType: 'address', name: 'ctrImplementation', type: 'address' },
            { internalType: 'address', name: 'irImplementation', type: 'address' },
            { internalType: 'address', name: 'irsImplementation', type: 'address' },
            { internalType: 'address', name: 'tirImplementation', type: 'address' },
            { internalType: 'address', name: 'mcImplementation', type: 'address' },
          ],
          internalType: 'struct ITREXImplementationAuthority.TREXContracts',
          name: '',
          type: 'tuple',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'getCurrentVersion',
      outputs: [
        {
          components: [
            { internalType: 'uint8', name: 'major', type: 'uint8' },
            { internalType: 'uint8', name: 'minor', type: 'uint8' },
            { internalType: 'uint8', name: 'patch', type: 'uint8' },
          ],
          internalType: 'struct ITREXImplementationAuthority.Version',
          name: '',
          type: 'tuple',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'getIRImplementation',
      outputs: [{ internalType: 'address', name: '', type: 'address' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'getIRSImplementation',
      outputs: [{ internalType: 'address', name: '', type: 'address' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'getMCImplementation',
      outputs: [{ internalType: 'address', name: '', type: 'address' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'getReferenceContract',
      outputs: [{ internalType: 'address', name: '', type: 'address' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'getTIRImplementation',
      outputs: [{ internalType: 'address', name: '', type: 'address' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'getTREXFactory',
      outputs: [{ internalType: 'address', name: '', type: 'address' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'getTokenImplementation',
      outputs: [{ internalType: 'address', name: '', type: 'address' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'isReferenceContract',
      outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
      stateMutability: 'view',
      type: 'function',
    },
    { inputs: [], name: 'owner', outputs: [{ internalType: 'address', name: '', type: 'address' }], stateMutability: 'view', type: 'function' },
    { inputs: [], name: 'renounceOwnership', outputs: [], stateMutability: 'nonpayable', type: 'function' },
    {
      inputs: [{ internalType: 'address', name: 'iaFactory', type: 'address' }],
      name: 'setIAFactory',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [{ internalType: 'address', name: 'trexFactory', type: 'address' }],
      name: 'setTREXFactory',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [{ internalType: 'address', name: 'newOwner', type: 'address' }],
      name: 'transferOwnership',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          components: [
            { internalType: 'uint8', name: 'major', type: 'uint8' },
            { internalType: 'uint8', name: 'minor', type: 'uint8' },
            { internalType: 'uint8', name: 'patch', type: 'uint8' },
          ],
          internalType: 'struct ITREXImplementationAuthority.Version',
          name: '_version',
          type: 'tuple',
        },
      ],
      name: 'useTREXVersion',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
  ];

  // Conecta al deployer
  const deployer = new ethers.Wallet('be4f5466fe225099ebdca96c9b14714fea3509f182561c16c76c3d46970ab6f1', ethers.provider);

  // Instancia del contrato
  const trexImplementationAuthority = new ethers.Contract(trexImplementationAuthorityAddress, trexImplementationAuthorityABI, deployer);

  // Definir la estructura de la versión
  const versionStruct = {
    major: 4,
    minor: 0,
    patch: 0,
  };

  // Definir la estructura de los contratos
  const contractsStruct = {
    tokenImplementation: '0x581E415F17CC63daF68766a95D9e1828440Bf99a', // Reemplaza con la dirección real
    ctrImplementation: '0xE84628337Da3394bbf2063d96CE869C7A5C2271e',
    irImplementation: '0xF633BD92Bd616fF8d70EA39420B1Eb5A791ef025',
    irsImplementation: '0x0595F02Ad3365519FE6C3CC54eE8e4385A8dffB5',
    tirImplementation: '0xeF83A2c82e6641Fe0cDd77baE9f472515398A6ae',
    mcImplementation: '0x509D66320F8DC05068eA49CA19591Da8aC7d2180',
  };

  const options = {
    gasPrice: ethers.utils.parseUnits('50', 'gwei'), // Convertir 50 gwei a wei
  };

  // Ejecutar la función addAndUseTREXVersion
  const tx = await trexImplementationAuthority.addAndUseTREXVersion(versionStruct, contractsStruct, options);

  // Esperar a que la transacción sea confirmada
  console.log('Transaction sent, waiting for confirmation...');
  const receipt = await tx.wait();

  console.log('Transaction confirmed, hash:', receipt.transactionHash);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

/* async function main() {
  // Obtener la dirección del contrato IdentityFactory y el contrato TREXFactory
  const identityFactoryAddress = '0x881b3309876334413EB7e70BDDcd4DD7a86f9483'; // Reemplaza con la dirección del contrato IdentityFactory
  const trexFactoryAddress = '0x35a764f1bF02Db7cB039604de76787186039BBAB'; // Reemplaza con la dirección del contrato TREXFactory

  // Obtener la cuenta que será usada para ejecutar la transacción
  const [deployer] = await ethers.getSigners();

  // Obtener la instancia del contrato IdentityFactory
  const IdentityFactory = await ethers.getContractFactory('IdentityFactory');
  const identityFactory: Contract = await IdentityFactory.attach(identityFactoryAddress);

  console.log(`Connected to IdentityFactory at ${identityFactory.address}`);

  // Ejecutar la función addTokenFactory
  console.log(`Adding TREXFactory at ${trexFactoryAddress}...`);
  const tx = await identityFactory.connect(deployer).addTokenFactory(trexFactoryAddress);

  // Esperar a que la transacción se confirme
  console.log(`Transaction hash: ${tx.hash}`);
  await tx.wait();
  console.log('Transaction confirmed.');

  console.log('TREXFactory added successfully.');
}

// Ejecutar el script
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
}); */
