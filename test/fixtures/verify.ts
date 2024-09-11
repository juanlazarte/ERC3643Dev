import { run } from 'hardhat';

async function main() {
  // Dirección del contrato y argumentos del constructor
  const contractAddress = '0x74ab0f8dbb1b0c00d6e06d07757aea5a312b9181'; // Reemplaza con la dirección de tu contrato
  // eslint-disable-next-line max-len
  const constructorArguments: unknown[] = ['0xA16c5DA8b55297099D0b2Ad36e8D92030fB4A681']; // Reemplaza con los argumentos del constructor si los hay

  console.log('Verifying contract at address:', contractAddress);

  try {
    // Verifica el contrato
    await run('verify:verify', {
      address: contractAddress,
      constructorArguments: constructorArguments,
    });

    console.log('Contract verified successfully!');
  } catch (error) {
    console.error('Error verifying contract:', error);
    process.exitCode = 1;
  }
}

main();
