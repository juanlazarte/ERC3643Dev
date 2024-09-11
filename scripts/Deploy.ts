// eslint-disable-next-line import/extensions
import { deployFullSuiteFixture } from '../test/fixtures/borradorInicial.js';

async function main() {
  // Ejecuta la función de despliegue
  const deployment = await deployFullSuiteFixture();

  // Imprime o guarda las direcciones de los contratos desplegados
  console.log('Direcciones de los contratos desplegados:');
  console.log('Deployer:', deployment.accounts.deployer.address);
  console.log('Token:', deployment.suite.token.address);
  console.log('Identity Registry:', deployment.suite.identityRegistry.address);
  console.log('Compliance:', deployment.suite.defaultCompliance.address);
  console.log('IdentityRegistryStorage:', deployment.suite.identityRegistryStorage.address);
  console.log('TrustedIssuerRegistry:', deployment.suite.trustedIssuersRegistry.address);
  console.log('claimTopicsRegistry:', deployment.suite.claimTopicsRegistry.address);
  console.log('claimIssuerContract:', deployment.suite.claimIssuerContract.address);

  // También puedes retornar las direcciones si quieres usarlas en otro lugar
  return deployment;
}

main()
  .then(() => {
    // Puedes manejar el resultado aquí si es necesario
    console.log('Deployment completado con éxito.');
  })
  .catch((error) => {
    console.error('Error en el despliegue:', error);
    process.exit(1);
  });
