// Include required dependencies
import { DefaultAzureCredential } from '@azure/identity';  
// import { KeyClient } from '@azure/keyvault-keys';  
import { SecretClient } from "@azure/keyvault-secrets";

// get 'keyvault' from cli args
const kvName = process.argv[2];

if (!kvName) {
  console.error("Please provide the keyvault name as an argument. Example: node main.mjs my-keyvault");
  process.exit(1);
}
const kvUrl = `https://${kvName}.vault.azure.net`;

// Authenticate to Azure
const credential = new DefaultAzureCredential(); 

// Create client to get keys (not used because we only need secrets)
// const keyClient = new KeyClient(
//   kvUrl,
//   credential
// );

// Create client to get secrets
const secretClient = new SecretClient(kvUrl, credential);


// Get latest version of (not soft-deleted) keys 
// for await (const keyProperties of keyClient.listPropertiesOfKeys()) {
//     console.log("KEY: ", keyProperties.version);
// }

let secrets = {};
for await (const secretProperties of secretClient.listPropertiesOfSecrets()) {
  const secretValut = await secretClient.getSecret(secretProperties.name);
  const secretName = secretProperties.name.replaceAll("-", "_").toUpperCase();
  secrets[secretName] = secretValut.value;
}

// print secrets as a valid json
console.log(JSON.stringify(secrets, null, 2));