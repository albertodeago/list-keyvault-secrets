The script exports all the secret inside a KV (and replaces the `-` with `_` in the key name).

## Usage

Install the dependencies
```bash
npm install
```

Login with Azure
```bash
az login
```

Then run the script
```bash
node main.mjs <kv_name>
# e.g. node main.mjs juniorcloud-secrets
```